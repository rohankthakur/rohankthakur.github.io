---
layout: page
title: Photography
permalink: /photography/
pagination:
  enabled: true
  collection: posts
  per_page: 6
  filter:
    category: photography
  permalink: /photography/page/:num/
---

Photography allows me to capture fleeting moments and hidden details that might otherwise go unnoticed. My work focuses on two primary areas that fascinate me: the dynamic world of birds and the intricate beauty found in macro subjects.

<div class="card-grid mt-5">
  <div class="card">
    <div class="card-image">
      <img src="/assets/images/photography/birds-preview.jpg" alt="Bird Photography" loading="lazy">
    </div>
    <div class="card-content">
      <h3 class="card-title">Bird Photography</h3>
      <p class="card-description">
        Capturing the grace, behavior, and natural beauty of avian life. From common garden visitors to rare species, each image tells a story of nature's diversity.
      </p>
      <a href="/photography/birds/" class="card-link">View Bird Gallery →</a>
    </div>
  </div>

  <div class="card">
    <div class="card-image">
      <img src="/assets/images/photography/macro-preview.jpg" alt="Macro & Close Up Photography" loading="lazy">
    </div>
    <div class="card-content">
      <h3 class="card-title">Macro & Close Up Photography</h3>
      <p class="card-description">
        Exploring the miniature worlds that exist all around us. Detailed studies of insects, flowers, textures, and patterns revealed through close-up photography.
      </p>
      <a href="/photography/macro/" class="card-link">View Macro & Close Up Gallery →</a>
    </div>
  </div>
</div>

<p></p>
## Recent Photography Posts

<div class="posts-grid">
  {% assign photo_posts = site.posts | where: "categories", "photography" | limit: 4 %}
  {% for post in photo_posts %}
    <article class="post-card">
      {% if post.featured_image %}
      <div class="post-card-image">
        <a href="{{ post.url | relative_url }}">
          <img src="{{ post.featured_image | relative_url }}" alt="{{ post.title }}" loading="lazy">
        </a>
      </div>
      {% endif %}

      <div class="post-card-content">
        <h3 class="post-card-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>

        <div class="post-card-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%B %d, %Y" }}
          </time>
        </div>

        <p class="post-card-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 20 }}
        </p>

        <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
      </div>
    </article>
  {% endfor %}
</div>

{% if photo_posts.size == 0 %}
<p class="text-center">Photography posts will appear here soon. Check back for updates!</p>
{% endif %}
