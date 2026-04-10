/* ============================================================
   HINOMC — main.js
   Mobile nav, event date badges
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
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

  // --- Shrink header on scroll ---
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
})();
