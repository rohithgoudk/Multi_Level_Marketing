/* Meridian landing page — minimal interactivity.
   (The spec's live clock and mobile menu need a touch of JS;
   everything else in this page is pure HTML/CSS.) */

   (function () {
    function updateLondonTime() {
      const time = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/London',
      }).format(new Date());
      document.querySelectorAll('#london-time, #london-time-mobile').forEach((el) => {
        el.textContent = time;
      });
    }
  
    function initMobileMenu() {
      const toggle = document.getElementById('menu-toggle');
      const menu = document.getElementById('mobile-menu');
      const backdrop = document.getElementById('menu-backdrop');
      if (!toggle || !menu) return;
  
      function open() {
        menu.classList.add('open');
        toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>';
        toggle.setAttribute('aria-label', 'Close menu');
      }
      function close() {
        menu.classList.remove('open');
        toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        toggle.setAttribute('aria-label', 'Open menu');
      }
  
      toggle.addEventListener('click', () => {
        menu.classList.contains('open') ? close() : open();
      });
      if (backdrop) backdrop.addEventListener('click', close);
      menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    }
  
    function initFaq() {
      document.querySelectorAll('.faq-item').forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;
  
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item.open').forEach((openItem) => {
            if (openItem !== item) {
              openItem.classList.remove('open');
              openItem.querySelector('.faq-answer').style.maxHeight = null;
            }
          });
          if (isOpen) {
            item.classList.remove('open');
            answer.style.maxHeight = null;
          } else {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      });
    }
  
    function initSmoothAnchors() {
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const id = link.getAttribute('href');
          if (id.length > 1) {
            const target = document.querySelector(id);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      updateLondonTime();
      setInterval(updateLondonTime, 1000);
      initMobileMenu();
      initFaq();
      initSmoothAnchors();
    });
  })();