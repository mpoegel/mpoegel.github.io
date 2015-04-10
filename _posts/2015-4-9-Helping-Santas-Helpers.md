---
title: Helping Santa's Helpers
layout: project_post
permalink: projects/helping-santas-helpers.html
category: project
tag: kaggle

prevpost:
nextpost:

hackathon:
hackathon_link:
repo: Helping-Santas-Helpers
version: 1.0.1
team:
status: Occupying Idle Brain Cycles
description: Design and implement an algorithm to assign toys to elves in the most efficient manner possible
---

**[Competition Homepage](https://www.kaggle.com/c/helping-santas-helpers)**

**Description.** "In this job scheduling problem, you will assign which elves work on which toys, at what time, and for how long. The goal is to complete all of the toys as early as possible, scaled by the natural log of the number of elves that work. Thus the objective S is _S = t[f] * log(1 + n[e])_, where t[f] is the last minute the final toy is complete, from reference date Jan 1, 2014 at 12:00 AM and n[e] is the number of unique elves that were needed to build the toys."

**What I've learned**

* Makefiles, and they are absolutely wonderful
* I really missed object-orientated programming

While this challenge is quite different from the original appeal that drew me to Kaggle in the first place, I was nevertheless attracted to the fascinating puzzle that was posed. I didn't think it would be too hard, and I thought it would be a good opportunity to refresh my C++. While the dataset is a daunting 10 million toys long, I thought that C++ would mitigate the slowness of my beginner's algorithm. This was horribly naïve.

I created three smaller datasets of sizes 10, 100, and 10,000. My initial greedy algorithm couldn't even finish to the 10,000 toy test case. From what I can tell, I don't have any obvious functional errors. It's quite a simple algorithm that takes no obvious steps towards optimizations: I figured that I would first get a baseline and work from there. Apparently, C++ couldn't pick up the slack for me. Regardless, here are the performance results from what could be completed before my patience ran out:

Averages of 3 runs using 900 elves

| # Toys	| Time		 |
|---------|----------|
| 10 			|	0m0.077s |
| 100 		| 0m0.310s |
| 1,000		| 0m2.188s |
| 5,000		|	0m9.279s |
| 10,000	|	FAIL		 |

The 10,000-toy test case starts to slow down immensely around the 5000 toy mark. I'm interested to see how much I can improve from these benchmarks.
