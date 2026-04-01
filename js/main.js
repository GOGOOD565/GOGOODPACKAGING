/* ============================================================
   GOGOODPACKAGING — Main JS v2
   Language switcher · Mobile nav · Form (mailto sales@) · Scroll reveal · FAQ
   ============================================================ */
(function () {
  'use strict';

  const WA_NUMBER  = '8618217529114';
  const INQUIRY_TO = 'sales@gogoodpackaging.com';

  // ── Language switcher ──────────────────────────────────────
  function detectLang() {
    const p = window.location.pathname;
    if (p.includes('/ar/') || p.includes('/ar\\')) return 'ar';
    if (p.includes('/es/') || p.includes('/es\\')) return 'es';
    return 'en';
  }
  function buildLangUrl(t) {
    // strip any existing /ar/ or /es/ prefix
    let path = window.location.pathname
      .replace(/\/(ar|es)\//i, '/')
      .replace(/\/(ar|es)\\/i, '/');
    if (!path || path === '/') path = '/index.html';
    if (t === 'en') return path;
    return '/' + t + (path.startsWith('/') ? path : '/' + path);
  }
  function initLang() {
    const lang = detectLang();
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.addEventListener('click', () => {
        localStorage.setItem('ggpLang', b.dataset.lang);
        window.location.href = buildLangUrl(b.dataset.lang);
      });
    });
    if (lang === 'ar') document.body.classList.add('rtl');
  }

  // ── WhatsApp links — update all to correct number ─────────
  function initWhatsApp() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      a.href = 'https://wa.me/' + WA_NUMBER;
    });
  }

  // ── Mobile nav ─────────────────────────────────────────────
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav    = document.querySelector('.nav-links');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // ── Smooth scroll ──────────────────────────────────────────
  function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  // ── Inquiry Form — send to sales@ ────────────────────────
  function initForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;
    const lang = detectLang();
    const msgs = {
      en: { t: 'Inquiry Sent!', b: 'Thank you! We will respond within 24 business hours. For urgent matters, please WhatsApp us directly.' },
      es: { t: '¡Consulta Enviada!', b: 'Gracias. Nuestro equipo responderá en menos de 24 horas hábiles.' },
      ar: { t: 'تم إرسال الاستفسار!', b: 'شكراً لك. سيرد فريقنا خلال 24 ساعة عمل.' }
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      const emailEl   = form.querySelector('[name="email"]');
      const productEl = form.querySelector('[name="product"]');
      let ok = true;
      [emailEl, productEl].forEach(f => {
        if (f && !f.value.trim()) {
          f.style.borderColor = '#FF4D6D'; ok = false;
        } else if (f) { f.style.borderColor = ''; }
      });
      if (!ok) return;

      // Build mailto string
      const name     = (form.querySelector('[name="name"]')?.value     || '').trim();
      const company  = (form.querySelector('[name="company"]')?.value  || '').trim();
      const email    = emailEl.value.trim();
      const country  = (form.querySelector('[name="country"]')?.value  || '').trim();
      const product  = productEl.value.trim();
      const quantity = (form.querySelector('[name="quantity"]')?.value  || '').trim();
      const size     = (form.querySelector('[name="size"]')?.value      || '').trim();
      const message  = (form.querySelector('[name="message"]')?.value  || '').trim();

      const subject  = encodeURIComponent(`[GoGoodPackaging Inquiry] ${product} — ${company || name}`);
      const body     = encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nCountry: ${country}\n\n` +
        `Product Interest: ${product}\nQuantity: ${quantity}\nSize: ${size}\n\nMessage:\n${message}`
      );
      const mailtoUrl = `mailto:${INQUIRY_TO}?subject=${subject}&body=${body}`;

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = '...';

      // Open email client
      window.location.href = mailtoUrl;

      setTimeout(() => {
        form.style.display = 'none';
        const s = document.getElementById('formSuccess');
        if (s) {
          const m = msgs[lang] || msgs.en;
          s.querySelector('h4').textContent = m.t;
          s.querySelector('p').textContent  = m.b;
          s.style.display = 'block';
        }
      }, 600);
    });

    form.querySelectorAll('input,select,textarea').forEach(el =>
      el.addEventListener('input', () => { el.style.borderColor = ''; })
    );
  }

  // ── Scroll reveal ──────────────────────────────────────────
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });

    const selectors = [
      '.prod-card', '.why-card', '.scene-card', '.factory-stat',
      '.logistics-card', '.cert-badge-lg', '.capability-card',
      '.tradeshow-card', '.factory-gallery-item', '.faq-item',
      '.client-stat-item', '.product-detail-card', '.sc-step',
      '.reveal'
    ].join(',');

    document.querySelectorAll(selectors).forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  // ── Header shadow on scroll ────────────────────────────────
  function initHeader() {
    const h = document.querySelector('.site-header');
    if (!h) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        h.style.boxShadow = '0 4px 32px rgba(0,0,0,0.12)';
        h.style.background = 'rgba(255,255,255,0.98)';
      } else {
        h.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
        h.style.background = 'rgba(255,255,255,0.96)';
      }
    }, { passive: true });
  }

  // ── FAQ accordion ──────────────────────────────────────────
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-q');
      const icon = item.querySelector('.faq-icon');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          const ic = i.querySelector('.faq-icon');
          if (ic) ic.textContent = '+';
        });
        // Toggle clicked
        if (!isOpen) {
          item.classList.add('open');
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  // ── Product filter (products page) ────────────────────────
  function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-detail-card[data-category]');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Counter animation ──────────────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target;
          const target = parseInt(el.dataset.target || el.textContent, 10);
          const suffix = el.dataset.suffix || '';
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = start.toLocaleString() + suffix;
          }, 16);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initWhatsApp();
    initMobileNav();
    initScroll();
    initForm();
    initReveal();
    initHeader();
    initFAQ();
    initProductFilter();
    initCounters();
  });
}());
