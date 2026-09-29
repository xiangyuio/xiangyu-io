(function () {
  'use strict';

  var KEY = 'xy-theme';

  var toggle = document.querySelector('.theme-toggle');
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function syncThemeColor() {
    if (themeColorMeta) {
      themeColorMeta.content = getComputedStyle(document.documentElement)
        .getPropertyValue('--bg').trim();
    }
  }

  function syncToggle() {
    if (toggle) {
      toggle.setAttribute(
        'aria-pressed',
        String(document.documentElement.getAttribute('data-theme') === 'dark')
      );
    }
  }

  function setTheme(next, persist) {
    document.documentElement.setAttribute('data-theme', next);
    syncThemeColor();
    syncToggle();
    if (persist === false) return;
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
  }

  syncToggle();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () {
      var stored = null;
      try { stored = localStorage.getItem(KEY); } catch (e) {}
      if (!stored) setTheme(mq.matches ? 'dark' : 'light', false);
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var revealed = document.querySelectorAll('.reveal');
  var links = document.querySelectorAll('.nav a[href^="#"]');
  var sections = [];
  for (var i = 0; i < links.length; i++) {
    var target = document.querySelector(links[i].getAttribute('href'));
    if (target) sections.push({ link: links[i], el: target });
  }

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    for (var j = 0; j < revealed.length; j++) revealObserver.observe(revealed[j]);

    if (sections.length) {
      var spyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            sections.forEach(function (s) {
              s.link.classList.toggle('is-active', s.el === entry.target);
            });
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      sections.forEach(function (s) { spyObserver.observe(s.el); });
    }
  } else {
    for (var k = 0; k < revealed.length; k++) revealed[k].classList.add('is-visible');
  }

  var copyBtn = document.querySelector('.copy-btn');
  var mailLink = document.querySelector('.mail-link');
  if (copyBtn && mailLink) {
    var original = copyBtn.textContent;
    var timer;
    copyBtn.addEventListener('click', function () {
      var mail = mailLink.textContent.trim();
      var done = function () {
        copyBtn.textContent = '已复制';
        copyBtn.classList.add('is-done');
        clearTimeout(timer);
        timer = setTimeout(function () {
          copyBtn.textContent = original;
          copyBtn.classList.remove('is-done');
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var area = document.createElement('textarea');
        area.value = mail;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {}
        document.body.removeChild(area);
      }
    });
  }
})();
