---
title: HackRPI Status Board Update 3
layout: project_post
permalink: projects/status_board_3.html
category: project
tag: hackrpi-status-board

prevpost: /projects/status_board_2.html
nextpost:

hackathon:
hackathon_link:
repo: HackRPI-Status-Board
version: 1.1.0
team: 99% me
status: Active
description: Status Board built for HackRPI to track event commits, show event announcements, and provide a mentoring system.
---

#### Summary of Updates

* Issues Closed:
	- [#17](https://github.com/mpoegel/HackRPI-Status-Board/issues/17): Mentor requests are no longer deleted when completed
	- [#19](https://github.com/mpoegel/HackRPI-Status-Board/issues/19): Create web hooks on repositories
	- [#25](https://github.com/mpoegel/HackRPI-Status-Board/issues/25): Register Application for the GitHub API
	- [#31](https://github.com/mpoegel/HackRPI-Status-Board/issues/31): Unable to add multiple repositories with the same name
* Added Mentor Profiles.
* Removed the `Mentors` collection. Mentors are now contained in the `Users` collection.
* Reorganized project structure in accordance with the MDG Standards and removed depreciated code.
* Moved announcements control to the Admin's user panel.
* Setup GitHub OAuth process to grab users' personal access tokens to create web hooks with.
* Created an API. Created and secured an endpoint at `api/CommitMessages` to receive post requests from GitHub.
* Rewrote collection privileges.

[**Pull Request #27**](https://github.com/mpoegel/HackRPI-Status-Board/pull/27)

This was a quite a simple fix: I introduced a `completed` flag to the documents in the `MentorQueue` collection that is set to `true` when the request is assigned to a mentor.

[**Pull Request #30**](https://github.com/mpoegel/HackRPI-Status-Board/pull/30)

This was a pretty cool update that stemmed from [issue #18](https://github.com/mpoegel/HackRPI-Status-Board/issues/18), "Improve Reliability of the Mentor Request System." I never pinned down the exact cause of the instability of the mentor system, but for some reason, during the latter half of the HackRPI 2014, mentor requests stopped being automatically assigned to mentors. In effort to alleviate this issue, I decided to greatly simplify the entire Mentoring System.

First I removed the need for a separate `Mentors` collection. This also goes with [issue #10](https://github.com/mpoegel/HackRPI-Status-Board/issues/10) to expand the accounts system. Now Mentors only exists as a User with `roles = ['mentor']`. Furthermore, I greatly simplified the algorithm to assign mentor requests. I reduced the need for 5 different Mentor flags to determine if a mentor should be assigned a mentee down to 2 flags: `active` and `available`: the former is if the Mentor is ready to mentor and the latter is if the Mentor does not currently have an assignment. To help even more, all of the help tags are divided into three categories--languages, frameworks, and APIs--are set in the `settings.json` of the Status Board. Hackers can only select one tag and then the first available Mentor with that tag is assigned to help them.

I also finished the Mentor user profiles. Here Mentors can edit their skills, view their current assignment (and either waive it or mark it complete), and see their mentoring history.

<div style="text-align:center; padding:10px;">
<a class="fancyBox" rel="hackrpi-status-board" href="/img/projects/hackrpi_status_board/mentor_profile.png">
<img src="/img/projects/hackrpi_status_board/mentor_profile.png"
		alt="Mentor Profile Dashboard"
		style="width:600px;"
		title="The new mentor profile dashboard" />
</a>
</div>

I know, the UI needs a bit (OK, a lot) of touching up, the underlying functionality works.

[**Pull Request #32**](https://github.com/mpoegel/HackRPI-Status-Board/pull/32)

This one isn't all that interesting, but it is important. I finally got around to cleaning things up. I was pretty sloppy and rushed in the original development of the Status Board, and that combined with a lack of any experience with Meteor.js lead to a complete haphazard mess of code that somewhat worked. Now with more time on my hands (relatively speaking), I have been able to read documentation in greater detail and do things correctly and more efficiently. That said, I still have much to learn, but the Great Status Board Experiment is improving. I did what I could to restructure the codebase to better comply with the structure laid out in the [Meteor Documentation](https://docs.meteor.com). Completely unrelated, I also moved the announcements controls to the Admin's user panel. Since [issue #16](https://github.com/mpoegel/HackRPI-Status-Board/issues/16) wants to make the announcement history visible, I removed the duration field and made the start time just default to the current time. I also added a Date-Time Picker Meteor Package for cross-browser compatibility.

[**Pull Request #36**](https://github.com/mpoegel/HackRPI-Status-Board/pull/36)

And now for the grand finale. Using what is by far my favorite Meteor Package to date, [Restivus](https://github.com/kahmali/meteor-restivus), _REST APIs for the Best of Us_, I created an API for the Status Board. It turns out, this was significantly easier than I thought. I created an endpoint at `api/CommitMessages` to receive requests to interact with the `CommitMessages` collection. Currently, the only endpoint I have setup is `POST` to `api/CommitMessages`, but will definitely expand this in the future.

Following the GitHub OAuth process was a bit tricky a times, especially as I test from `localhost:3000`. Shout out [ngrok](https://ngrok.com/) for being awesome at forwarding the localhost. To summarize, the process works as follows:

1. The Server constructs a redirect to GitHub using the Status Board's `clientId` and a random string `state` to protect against requests being made by a third party.
```javascript
return 'https://github.com/login/oauth/authorize?'
    + 'client_id=' + Meteor.settings.github_clientId
		+ '&redirect_uri=' + Meteor.settings.root_url + '/user'
		+ '&scope=admin:repo_hook,admin:org_hook'
		+ '&state=' + state;
},
```
2. GitHub will then redirect back to Status Board with a `code` and the same `state` variable encoded in the URL. The Status Board checks to make sure that the `state`s match and then uses the `code` to send a `POST` request to GitHub to ask for an access token in the name of the user.
3. Once the access token is received, the server can then use the token to create a web hook on a repository with another `POST` request.
```javascript
data: {
	'name': 'web',
	'active': true,
	'events': ['push'],
	'config': {
		'url': Meteor.settings.root_url + '/api/CommitMessages',
		'content_type': 'json',
		'secret': Meteor.settings.secret_key
	}
}
```
4. `POST` requests from GitHub are then received at `api/CommitMessages`. When the web hooks are created, the Status Board also sends GitHub a `secret_key` which GitHub uses to hash the payload of its `POST` requests. We verify that an incoming request came from GitHub by hashing the payload with the same `secret_key` and comparing hashes. If they match, we know the request came from GitHub, and we can allow access to the `CommitMessages` collection.
```javascript
var signPayload = function(payload) {
	return 'sha1=' + crypto.createHmac('sha1', Meteor.settings.secret_key)
		.update(payload)
		.digest('hex')
};
```

The last thing I did, which is unrelated to the API, is update the collection privileges because I noticed that they were essentially useless and left open many security holes. Of particular importance are the `CommitMessages` and `RepositoryList` collections because they have most interaction with the user. Thus, I have to make sure that the user can only do **exactly** what I want the user to be able to do, nothing more and nothing less. This is when I discovered the incredible usefulness of [Underscore.js](https://http://underscorejs.org/). Underscore.js allows for much cleaner code by providing a great number of utility functions for the built-in JavaScript Arrays and Objects:
```javascript
// a user can only modify the repo doc that s/he is attached to
if (user_doc.profile.repositoryId === doc._id) {
	// if the user if modifying the userIds/collab field, they may only edit
	// his/her own entry
	if (_.contains(fieldNames, 'contributors')) {
		if (_.isEqual(modifier, removeUser) || _.isEqual(modifier, addUser))
			return true;
		else
			return false;
	}
	// user can edit the other fields freely
	else if (_.some(doc.contributors, function(x) { return _.isEqual(x, userSet); })
			&& _.intersection(fieldNames, ['webhook', 'name', 'full_name', 'url'])
				.length !== 0)
		return true;
}
else
	return false;
```
Hopefully there aren't any obvious bugs in the code above. Rewriting the permissions should allow me to me move more functions to the client side, improving performance and security!

Continuing on, I aim to create a web hook for Twilio to receive `POST` requests when a Mentor replies "Done" after completing an assignment. That should allow me finally close [issue #18](https://github.com/mpoegel/HackRPI-Status-Board/issues/18). We'll see how many other issues I can address in the [End of Semester Sprint Milestone](https://github.com/mpoegel/HackRPI-Status-Board/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22End+of+Semester+Sprint%22).
