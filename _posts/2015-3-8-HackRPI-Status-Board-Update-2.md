---
title: HackRPI Status Board Update 2
layout: post
permalink: projects/status_board_2.html
category: project
tag: hackrpi-status-board

prevpost: /projects/status_board_1.html
nextpost: /projects/status_board_3.html

hackathon:
hackathon_link:
repo: HackRPI-Status-Board
version: 1.0.2
team: 99% me
status: Active
description: Status Board built for HackRPI to track event commits, show event announcements, and provide a mentoring system.
---

#### Summary of Updates:

* includes changes from design-rev-3
* framework for profiles of different types of users
* hacker user profiles
* server settings
* repositories now controlled through user accounts

[**Pull Request #23**](https://github.com/mpoegel/HackRPI-Status-Board/pull/23)

All lot of time was spent on design in this update--perhaps too much so. Halfway through implementing the profile system, I paused to do another complete redesign of the entire site. This time I consulted a more artsy friend, who was able to help shape the project with a more modern design. It took a few weekends, but I finally have a great design (at least I think it's pretty good and that's what matters).

The new design has the announcements permanently visible at the top of every page. This feature hasn't quite been fixed up yet, but it is planned to also show the complete announcement history. We'll see what actually comes out of it. I hope that we can produce something visually appealing.

I never really received much feedback from my peers about whether or not to implement a profile system, so I went ahead and did it anyway. I believe it's a great idea that can vastly improve the Status Board Experience (TM). So I began by adding hacker profiles. I've moved the process of adding a repository to the hacker profiles, so now a user must be logged in to a hacker account in order to add a repository. I have also added a framework to track teams, so multiple user accounts can be linked to the same repository. What I really would like to investigate is linking these hacker accounts to Github accounts and create web hooks on the repositories. This will significantly reduce the load on the server, remove the need for a private API key, and provide instant repository updates.

<div style="text-align:center; padding:10px;">
<a class="fancyBox" rel="hackrpi-status-board" href="/img/projects/hackrpi_status_board/hacker_dashboard.png">
<img src="/img/projects/hackrpi_status_board/hacker_dashboard.png"
		alt="Hacker Profile Dashboard"
		style="width:100%;"
		title="The new hacker profile dashboard" />
</a>
</div>

However, this will require significant work on the back-end. I believe I have to create an API to receive POST requests from Github and register the Status Board application on Github. There also exists a Meteor Github Accounts package that would probably also be a good idea to incorporate. That would allow hackers to sign in to the Status Board using their Github username and password.

The new motto of the Status Board is "Always Be Opening" (TM). Over a dozen issues have been opened since the last update, while none have been closed. They are mostly new feature requests or enhancements. Next I plan to work on the mentor system, continuing to work on the other parts of the user profiles. I also have a lot of cleaning up to do: I left around a lot of old code that is no longer used after the recent redesign; maybe I just have attachment issues.
