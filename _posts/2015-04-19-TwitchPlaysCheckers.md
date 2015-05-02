---
title: Twitch Plays Checkers
layout: project_post
permalink: projects/twitch_plays_checkers.html
category: project
tag: twitchplayscheckers

prevpost:
nextpost:

hackathon: HackRU Spring 2015
hackathon_link: hack/HackRU_Spring2015.html
repo: Twitch-Plays-Checkers
version: 1.0.0
team: Andrew, Ariel
status: Shelved
description: The Twitch audience plays checkers against an AI
---

Twitch Plays Checkers, or Twitch _Loses_ Checkers, is an AI written in Python that challenges the audience on Twitch to a game of checkers. Originally Andrew and I wanted to challenge each other to write an AI and have our Raspberries Pis play each other, but we decided to pivot, and save that challenge for another day. I also wanted to write in C++ and Python, but I couldn't figure out the necessary libraries in a reasonable time period.

I was tasked with building the game rules and the checkers AI; Ariel, the interaction with Twitch; and Andrew, the drawing of the board. It turns out that I had almost forgotten how to play checkers and didn't realize that there were a lot of rules to consider when validating moves. After I thought I had the basic board mechanics in working order, I moved on to build the checkers AI that would play against Twitch. I thought about trying to implement a dominant strategy, but I didn't have enough time to do all of the reading. Thus, I was left with writing a [simple greedy algorithm](https://github.com/mpoegel/TwitchPlaysCheckers/blob/master/lib/ai.py) to find the best move given a board state. While I would have must preferred to write this algorithm in C++, I did learn a bit about "passing by value" in Python: since everything is passed by reference by default, I had to manually deep copy objects to pass them by value.

<div style="text-align:center; padding:10px;">
<img src="/img/projects/twitch_plays_checkers/board_example.png"
		alt="Board Example"
		style="width:400px;"
		title="Example of the checkers board during a test game." />
</div>

Andrew wrote the functions to draw the checkerboard and the pieces on the board using OpenCV. Instead of streaming video, Andrew decided to update a .png file with the new board state and stream the picture to Twitch. Ariel wrote the part to capture the Twitch chat, parse the valid commands, and make a move.

In the end, our three parts came together quite nicely. I had to work out a few bugs in the game dynamics, but we had a good working prototype for the demo. There was one unfixed bug however: pieces on the left edge of board could not move unless that move was a jump. I couldn't readily find the bug so I called it done and went to sleep. This wasn't a huge project, nor overly impressive, but it had been a while since my last hackathon project and it felt good to accomplish _something_.
