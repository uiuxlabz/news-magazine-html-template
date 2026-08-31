/* ==========================================================================
   NEWSMAG — Main JavaScript
   Stories That Matter.
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     1. BURGER MENU TOGGLE
     ----------------------------------------------------------------------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click (mobile)
    var navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* -------------------------------------------------------------------------
     2. ACTIVE NAV HIGHLIGHTING
     ----------------------------------------------------------------------- */
  function initActiveNav() {
    var navLinks = document.querySelectorAll('.nav__link');
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      var linkPath = href.split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* -------------------------------------------------------------------------
     3. DYNAMIC YEAR — [data-year]
     ----------------------------------------------------------------------- */
  function initDynamicYear() {
    var yearElements = document.querySelectorAll('[data-year]');
    var currentYear = new Date().getFullYear();

    yearElements.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  /* -------------------------------------------------------------------------
     4. SCROLL REVEAL — IntersectionObserver
     ----------------------------------------------------------------------- */
  function initScrollReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
      // If reduced motion is preferred, show all elements immediately
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    if (!revealElements.length) return;

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -------------------------------------------------------------------------
     5. FORM VALIDATION — [data-form]
     ----------------------------------------------------------------------- */
  function initForms() {
    var forms = document.querySelectorAll('[data-form]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var isValid = true;
        var firstError = null;

        // Reset previous errors
        var errorGroups = form.querySelectorAll('.form-group.error');
        errorGroups.forEach(function (group) {
          group.classList.remove('error');
        });

        // Hide previous messages
        var formOk = form.querySelector('.form-ok');
        var formErr = form.querySelector('.form-err');
        if (formOk) formOk.classList.remove('visible');
        if (formErr) formErr.classList.remove('visible');

        // Validate required fields
        var requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
          var value = field.value.trim();
          var group = field.closest('.form-group');

          if (!value) {
            isValid = false;
            if (group) group.classList.add('error');
            if (!firstError) firstError = field;
          }

          // Email validation
          if (field.type === 'email' && value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              isValid = false;
              if (group) group.classList.add('error');
              if (!firstError) firstError = field;
            }
          }

          // Phone validation (optional field with value)
          if (field.type === 'tel' && value) {
            var phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(value)) {
              isValid = false;
              if (group) group.classList.add('error');
              if (!firstError) firstError = field;
            }
          }
        });

        // Validate select fields
        var selectFields = form.querySelectorAll('select[required]');
        selectFields.forEach(function (field) {
          if (!field.value) {
            isValid = false;
            var group = field.closest('.form-group');
            if (group) group.classList.add('error');
            if (!firstError) firstError = field;
          }
        });

        // Validate message length
        var messageField = form.querySelector('textarea[name="message"]');
        if (messageField && messageField.value.trim().length < 10) {
          isValid = false;
          var group = messageField.closest('.form-group');
          if (group) group.classList.add('error');
          if (!firstError) firstError = messageField;
        }

        if (isValid) {
          if (formOk) formOk.classList.add('visible');
          form.reset();

          // Scroll to success message
          if (formOk) {
            formOk.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          if (formErr) formErr.classList.add('visible');
          if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });

      // Real-time validation feedback
      var inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          var group = this.closest('.form-group');
          if (!group) return;

          if (this.hasAttribute('required') && !this.value.trim()) {
            group.classList.add('error');
          } else if (this.type === 'email' && this.value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
              group.classList.add('error');
            } else {
              group.classList.remove('error');
            }
          } else {
            group.classList.remove('error');
          }
        });

        input.addEventListener('input', function () {
          var group = this.closest('.form-group');
          if (group && group.classList.contains('error') && this.value.trim()) {
            group.classList.remove('error');
          }
        });
      });
    });
  }

  /* -------------------------------------------------------------------------
     6. NEWSLETTER FORM
     ----------------------------------------------------------------------- */
  function initNewsletter() {
    var forms = document.querySelectorAll('.newsletter__form');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.newsletter__input');
        if (!input) return;

        var value = input.value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value || !emailRegex.test(value)) {
          input.style.borderColor = '#DC2626';
          setTimeout(function () {
            input.style.borderColor = '';
          }, 2000);
          return;
        }

        // Simulate success
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';
        input.style.borderColor = '#10B981';
        setTimeout(function () {
          input.placeholder = 'Enter your email address';
          input.style.borderColor = '';
        }, 3000);
      });
    });
  }

  /* -------------------------------------------------------------------------
     7. SMOOTH SCROLL for anchor links
     ----------------------------------------------------------------------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     8. HEADER SCROLL BEHAVIOR — sticky shadow
     ----------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     9. CATEGORY FILTER
     ----------------------------------------------------------------------- */
  function initCategoryFilter() {
    var tabs = document.querySelectorAll('.filter-tab');
    var cards = document.querySelectorAll('.articles-grid .card, .category-articles .card');

    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Update active tab
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter') || 'all';

        cards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            card.style.opacity = '0';
            setTimeout(function () {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.3s ease';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* -------------------------------------------------------------------------
     10. BACK TO TOP BUTTON
     ----------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------------------------
     11. IMAGE LAZY LOADING FALLBACK
     ----------------------------------------------------------------------- */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) return; // Native support

    var images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    images.forEach(function (img) {
      observer.observe(img);
    });
  }

  /* -------------------------------------------------------------------------
     12. READING TIME CALCULATOR
     ----------------------------------------------------------------------- */
  function initReadingTime() {
    var readingTimeEl = document.querySelector('[data-reading-time]');
    var articleBody = document.querySelector('.article-body');
    if (!readingTimeEl || !articleBody) return;

    var text = articleBody.textContent || articleBody.innerText;
    var wordCount = text.split(/\s+/).length;
    var readingTime = Math.ceil(wordCount / 200); // Average 200 words per minute

    readingTimeEl.textContent = readingTime + ' min read';
  }

  /* -------------------------------------------------------------------------
     INITIALIZE
     ----------------------------------------------------------------------- */
  function init() {
    initBurger();
    initActiveNav();
    initDynamicYear();
    initScrollReveal();
    initForms();
    initNewsletter();
    initSmoothScroll();
    initHeaderScroll();
    initCategoryFilter();
    initBackToTop();
    initLazyLoad();
    initReadingTime();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
