---
title: HackRPI Status Board Update 1
layout: post
permalink: projects/status_board_1.html
category: project
tag: hackrpi-status-board
date: 2015-01-17

prevpost: /projects/status_board_0.html
nextpost: /projects/status_board_2.html

hackathon:
hackathon_link:
repo: HackRPI-Status-Board
version: 1.0.1
team: 99% me
status: Active
description: Status Board built for HackRPI to track event commits, show event announcements, and provide a mentoring system.
---

#### Summary of Updates:

* Fixed future time-stamp bug
* Began adding indexes for Mongo Databases
* Re-styled the entire site
* Added custom login and registration pages

Now that the rush to get the status board finished for HackRPI 2014 is over, I finally had a chance to reexamine the project and really think about its components. I started with the glaring issues: future time-stamps and, of course, the scaling problem. [Issue #8](https://github.com/mpoegel/HackRPI-Status-Board/issues/8) addressed the problem that commit messages were appearing from the future. I believe the underlying issue is caused by the Github API which appears to not return what it is supposed to according to the [docs](https://developer.github.com/v3/git/commits/):

```json
"author": {
    "date": "2010-04-10T14:10:01-07:00",
    "name": "Scott Chacon",
    "email": "schacon@gmail.com"
  },
```

but I what I get is:

```json
"author": {
        "name": "Matt Poegel",
        "email": [REDACTED],
        "date": "2015-01-18T05:01:54Z"
      },
```

Notice how the expected date-time includes the timezone of the commit, but mine does not. After some digging about date-time formatting, I still have not figured out why. The workaround I implemented is if the date-time is ahead of the server time, then assign it the server time. That should work, but it's difficult to test so I have not done so yet... I'll get to it...

Alas the larger problem at hand is the scaling issue. The root of this problem is probably my rushed introduction to MongoDB. Now with more time, I have been able to read the docs some more, specifically on databases indexes, to address [Issue #6](https://github.com/mpoegel/HackRPI-Status-Board/issues/6). So it appears all I need to do is index the `CommitMessages` database by date-time and the most recent 10 commits should be loaded faster:

```javascript
CommitMessages._ensureIndex( {"date" : -1} );
```

The underscore in the function call `_ensureIndex()` indicates that it is an undocumented feature of Meteor. I'm doubtful that this will completely alleviate the problem however, as I have already noticed that the sorting takes an extra second to load at the small scale that I'm debugging. My other option is to maintain a deque of length 10 and bubble sort each incoming commit. I will be watching this part very carefully when I run large scale tests with 1000 or more commit messages. I hope to create a debugging feature to allow the input of many repos at the same time. I also have to find a large list of repos...

I also took a stab at some web design: it's a lengthy task that I did not have time for originally. I'm still working on it--not quite sure how I feel about it yet but I hope to get some feedback from the HackRPI team in the coming weeks.

In a first step at expanding the functionality of the application, I created custom login and registration pages (before I was using the default Meteor-provided ones). [Issue #10](https://github.com/mpoegel/HackRPI-Status-Board/issues/10) is an open issue to discuss the expansion of the account system. I have decided that I definitely want to have mentors register themselves and enter their own information and skills. While the participant accounts are still open to be discussed in the coming weeks, I made registrations forms for participants, mentors, and volunteers (because I thought why not? It could work).

The next part that I'm itching to work on is a profile and settings page for the accounts, starting with the admin and mentors. I'm taking a break for now, however, awaiting feedback on the direction that this project is going. I'm happy at the progress I have been able to make over Winter Break.
