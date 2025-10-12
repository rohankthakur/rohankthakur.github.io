---
layout: page
title: Art
permalink: /art/
pagination:
  enabled: true
  collection: posts
  filter:
    category: art
  per_page: 6
  permalink: /art/page/:num/
---

Art serves as a medium for personal expression and exploration of creative boundaries. My artistic practice encompasses both traditional sketching and painting, each offering unique opportunities to capture ideas, emotions, and observations from the world around me.

<div class="card-grid mt-5">
  <div class="card">
    <div class="card-image">
      <img src="/assets/images/art/sketches-preview.jpg" alt="Sketches" loading="lazy">
    </div>
    <div class="card-content">
      <h3 class="card-title">Sketches</h3>
      <p class="card-description">
        Studies in line, form, and composition using graphite, charcoal, and ink. From quick gesture drawings to detailed portraits and still life studies.
      </p>
      <a href="/art/sketches/" class="card-link">View Sketches →</a>
    </div>
  </div>

  <div class="card">
    <div class="card-image">
      <img src="/assets/images/art/paintings-preview.jpg" alt="Paintings" loading="lazy">
    </div>
    <div class="card-content">
      <h3 class="card-title">Paintings</h3>
      <p class="card-description">
        Color explorations through mostly watercolor. Landscapes, abstracts, and experimental works that push my creative boundaries.
      </p>
      <a href="/art/paintings/" class="card-link">View Paintings →</a>
    </div>
  </div>
</div>
<p></p>
## Artistic Philosophy

My approach to art centers on continuous learning and experimentation. Each piece serves as both a finished work and a step in the ongoing journey of artistic development. I believe in:

- **Process over perfection**: Embracing the learning journey inherent in each piece
- **Traditional techniques**: Building strong foundational skills through classical methods  
- **Personal expression**: Using art as a means of processing and sharing experiences
- **Observational practice**: Regular drawing from life to improve accuracy and understanding

## Recent Art Posts

<div class="posts-grid">
  {% assign art_posts = site.posts | where: "categories", "art" | limit: 4 %}
  {% for post in art_posts %}
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

{% if art_posts.size == 0 %}
<p class="text-center">Art posts will appear here soon. Check back for updates!</p>
{% endif %}
