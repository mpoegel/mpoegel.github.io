---
title: Projects
layout: page
---

This is my projects page.

This is a more detailed description of my projects than what can be found on my [github](http://github.com/mpoegel). I've highlighted my favorite projects, most of which have started at hackathons, and described the process, how they work, and what I learned. My goal is to keep the pages updated as I work on each project.


<h3>Data Science</h3>

  <h4>Kaggle</h4>
  My rambling adventures on the riveting <a href="https://www.kaggle.com">Kaggle</a> Competitions in which I partake.
  <ul class="posts">
  {% for post in site.tags.kaggle %}
    <div class="post_info">
      <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <span>({{ post.date | date_to_long_string }})</span>
      </li>
      </div>
    {% endfor %}
  </ul>
  
  <h4>Miscellaneous</h4>
  <ul class="posts">
    <div class="post_info"><li>
      <a href="/assets/mcm_2016.pdf">Mathematical Contest in Modeling 2016</a> - A three-person team thrown together at the last minute somehow managed to put this together in a weekend
      <span>(01 February 2016)</span>
    </li></div>
    <div class="post_info"><li>
      <a href="https://github.com/mpoegel/upgraded-octo-meme">RPI Datathon 2016</a> - A three-person team to create global models of government effectiveness's sensitivity to the gender ratio of parliament over a weekend -- and tied fourth place <span>(01 May 2016)</span>
    </li></div>
    <div class="post_info"><li>
      <a href="/assets/matp_4820_final_report.pdf">Computational Optimization Final Project</a> - A three-person team to model rainfall from radar data <span>(13 May 2016)</span>
    </li></div>
  </ul>

<h3>Web</h3>

  <h4>HackRPI Status Board</h4>
  Status Board built for HackRPI to track event commits, show event announcements, and provide a mentoring system.
  <ul class="posts">
  {% for post in site.tags.hackrpi-status-board %}
    <div class="post_info">
      <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <span>({{ post.date | date_to_long_string }})</span>
      </li>
      </div>
    {% endfor %}
  </ul>
  
  <h4>Tabz</h4>
  Google Chrome extension to help manage tabs when you have a lot open.
  <ul class="posts">
  {% for post in site.tags.tabz %}
    <div class="post_info">
      <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <span>({{ post.date | date_to_long_string }})</span>
      </li>
      </div>
    {% endfor %}
  </ul>

<h3>Other</h3>

  <h4>Twitch Plays Checkers</h4>
  The Twitch audience plays checkers against an AI.
  <ul class="posts">
  {% for post in site.tags.twitchplayscheckers %}
    <div class="post_info">
      <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <span>({{ post.date | date_to_long_string }})</span>
      </li>
      </div>
    {% endfor %}
  </ul>
