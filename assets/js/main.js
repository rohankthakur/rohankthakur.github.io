// Main JavaScript file for the Jekyll portfolio
// No external dependencies - all self-contained

(function() {
  'use strict';

  // DOM ready function
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Mobile navigation toggle
  function initMobileNav() {
    const toggle = document.getElementById('navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (toggle && menu) {
      // Close mobile menu when clicking on links
      const navLinks = menu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          toggle.checked = false;
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && toggle.checked) {
          toggle.checked = false;
        }
      });
    }
  }

  // Lightbox functionality for galleries
  function initLightbox() {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open lightbox function
    window.openLightbox = function(imageSrc, caption) {
      lightbox.style.display = 'block';
      lightboxImg.src = imageSrc;
      lightboxCaption.innerHTML = caption || '';
      document.body.style.overflow = 'hidden';
    };

    // Close lightbox function
    window.closeLightbox = function() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    // Close lightbox when clicking close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', window.closeLightbox);
    }

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        window.closeLightbox();
      }
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'block') {
        window.closeLightbox();
      }
    });
  }

  // Smooth scrolling for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Lazy loading for images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Initialize gallery auto-loading from image directories
  function initAutoGallery() {
    const galleryContainers = document.querySelectorAll('[data-gallery-path]');

    galleryContainers.forEach(container => {
      const path = container.dataset.galleryPath;
      const images = container.dataset.images;

      if (images) {
        try {
          const imageList = JSON.parse(images);
          let galleryHTML = '<div class="image-gallery">';

          imageList.forEach((image, index) => {
            const imageSrc = `${path}/${image}`;
            const imageAlt = image.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

            galleryHTML += `
              <div class="gallery-item">
                <img src="${imageSrc}" 
                     alt="${imageAlt}" 
                     loading="lazy"
                     onclick="openLightbox('${imageSrc}', '${imageAlt}')">
              </div>
            `;
          });

          galleryHTML += '</div>';
          container.innerHTML = galleryHTML;
        } catch (e) {
          console.error('Error parsing gallery images:', e);
        }
      }
    });
  }

  // Add loading states to forms
  function initFormStates() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', () => {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.textContent = 'Loading...';
          submitBtn.disabled = true;
        }
      });
    });
  }

  // Initialize scroll-to-top functionality
  function initScrollToTop() {
    let scrollButton = document.getElementById('scroll-to-top');

    if (!scrollButton) {
      scrollButton = document.createElement('button');
      scrollButton.id = 'scroll-to-top';
      scrollButton.innerHTML = '↑';
      scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(scrollButton);
    }

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Add active states to navigation
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath === href || currentPath.startsWith(href + '/'))) {
        link.classList.add('active');
      }
    });
  }

  // Initialize search functionality (if search box exists)
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
      let searchData = [];

      // Load search data (posts, pages, etc.)
      fetch('/search.json')
        .then(response => response.json())
        .then(data => {
          searchData = data;
        })
        .catch(error => {
          console.warn('Search data not available:', error);
        });

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
          return;
        }

        const results = searchData.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
        ).slice(0, 5);

        if (results.length > 0) {
          searchResults.innerHTML = results.map(item => `
            <div class="search-result">
              <h4><a href="${item.url}">${item.title}</a></h4>
              <p>${item.excerpt}</p>
            </div>
          `).join('');
          searchResults.style.display = 'block';
        } else {
          searchResults.innerHTML = '<p>No results found</p>';
          searchResults.style.display = 'block';
        }
      });

      // Hide search results when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
          searchResults.style.display = 'none';
        }
      });
    }
  }

  // Initialize everything when DOM is ready
  ready(() => {
    initMobileNav();
    initLightbox();
    initSmoothScroll();
    initLazyLoading();
    initAutoGallery();
    initFormStates();
    initScrollToTop();
    initActiveNav();
    initSearch();
  });

  // Utility functions for external use
  window.portfolioUtils = {
    openLightbox: window.openLightbox,
    closeLightbox: window.closeLightbox
  };

})();


