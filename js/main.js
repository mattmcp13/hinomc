/* ============================================================
   HINOMC — main.js
   Scroll animations, mobile nav, event badges, active nav
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Auto-update event badges (UPCOMING / PAST) ---
  function updateEventBadges() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    document.querySelectorAll('.event-card[data-event-date]').forEach(function (card) {
      var dateStr = card.getAttribute('data-event-date');
      var parts = dateStr.split('-');
      var eventDate = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10)
      );

      var badge = card.querySelector('.badge-status');
      if (!badge) return;

      if (eventDate < today) {
        badge.textContent = 'PAST';
        badge.classList.add('past');
      } else {
        badge.textContent = 'UPCOMING';
        badge.classList.remove('past');
      }
    });
  }

  updateEventBadges();

  // --- Header scroll effect ---
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Scroll-triggered reveal animations ---
  var animatedEls = document.querySelectorAll('[data-animate]');

  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  if (sections.length > 0 && navAnchors.length > 0) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + id) {
              a.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-30% 0px -65% 0px'
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
