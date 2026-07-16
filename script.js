// For the Love of Baking — small enhancements: nav toggle, scroll reveal, form AJAX.

// Always open at the top on plain loads — browsers otherwise restore the last
// scroll position (Safari glides there thanks to CSS smooth scrolling).
// Manual restoration also suppresses native anchor scrolling in some browsers,
// so #contact-style links are scrolled by hand here too.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function applyScrollTarget(smooth) {
  var el = location.hash && document.querySelector(location.hash);
  if (el) {
    el.scrollIntoView(smooth ? {} : { behavior: 'instant' });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}
applyScrollTarget(false);
window.addEventListener('hashchange', function () { applyScrollTarget(true); });
window.addEventListener('pageshow', function (e) {
  if (e.persisted) applyScrollTarget(false);
});

// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
var toggle = document.querySelector('.nav-toggle');
var menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Gentle fade-up on scroll (skipped under reduced motion — CSS never hides content there)
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { observer.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('visible'); });
}

// Contact form: AJAX submit to Formspree with inline success message.
// If fetch is unavailable or fails, the form falls back to a normal POST.
var form = document.querySelector('.contact-form');
if (form && window.fetch) {
  var ajaxFailed = false;
  form.addEventListener('submit', function (e) {
    if (ajaxFailed) return; // let the normal POST proceed
    e.preventDefault();
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Sending…';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        form.reset();
        status.textContent = 'Thank you! Your message is on its way. We’ll be in touch soon.';
        status.className = 'form-status success';
        button.disabled = false;
      } else {
        return response.json().then(function (data) {
          throw new Error((data.errors && data.errors[0] && data.errors[0].message) || 'Submission failed');
        });
      }
    }).catch(function () {
      status.textContent = '';
      button.disabled = false;
      ajaxFailed = true;
      form.submit(); // graceful fallback to a normal POST
    });
  });
}
