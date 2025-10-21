---
layout: page
title: Заметки
permalink: /notes/
---

<section class="section">
  {% for post in site.posts %}
  <div class="post-item">
    <h3 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.lead %}
    <div class="post-lead">{{ post.lead | markdownify }}</div>
    {% endif %}
    
    {% if post.cover %}
    <div class="post-image">
      <img src="{{ post.cover.image | relative_url }}" 
           alt="{{ post.cover.alt | default: post.title }}" 
           loading="lazy">
    </div>
    {% endif %}
    
    <div class="post-tags">
      {% assign now_sec = site.time | date: '%s' %}
      {% assign post_sec = post.date | date: '%s' %}
      {% assign diff_sec = now_sec | minus: post_sec %}
      {% assign diff_days = diff_sec | divided_by: 86400 %}
      
      {% if diff_days == 0 %}
        <time datetime="{{ post.date | date_to_xmlschema }}">сегодня</time>
      {% elsif diff_days < 30 %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ diff_days }} дн</time>
      {% elsif diff_days < 365 %}
        {% assign diff_months = diff_days | divided_by: 30 %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ diff_months }} мес</time>
      {% else %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%Y' }}</time>
      {% endif %}
      
      {% for tag in post.tags %}
        <a href="{{ tag }}" class="tag">{{ tag }}</a>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</section>
