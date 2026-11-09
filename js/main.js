'use strict';

// Reemplaza estos valores solo cuando el colegio proporcione la información oficial.
const FORM_EMAIL = ''; // Ejemplo: 'secretaria@colegio.edu.bo'
const VIDEO_ID = '';   // Identificador del video de YouTube, sin la URL completa.
const mobileScreen = window.matchMedia('(max-width: 1020px)');

// Carga el encabezado o el pie compartido desde la carpeta partials.
async function loadPartial(placeholderId, url) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error(`No se pudo cargar ${url}:`, error);
    placeholder.textContent = 'No se pudo cargar esta sección. Comprueba que el sitio se ejecute desde un servidor web.';
  }
}

// Configura navegación, escudo móvil y reducción suave del encabezado.
function setupHeader() {
  const header = document.querySelector('header.main');
  const badge = document.querySelector('.badge');
  const menu = document.getElementById('menu');
  if (!header || !badge || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    badge.setAttribute('aria-expanded', 'false');
    if (mobileScreen.matches) badge.setAttribute('aria-label', 'Abrir menú de navegación');
  }
  function syncBadge() {
    closeMenu();
    if (mobileScreen.matches) {
      badge.setAttribute('role', 'button');
      badge.setAttribute('aria-label', 'Abrir menú de navegación');
      badge.setAttribute('aria-controls', 'menu');
      badge.setAttribute('aria-expanded', 'false');
    } else {
      for (const attr of ['role', 'aria-controls', 'aria-expanded']) badge.removeAttribute(attr);
      badge.setAttribute('aria-label', 'Colegio Don Bosco: inicio');
    }
  }
  function toggleMenu() {
    const open = menu.classList.toggle('open');
    badge.setAttribute('aria-expanded', String(open));
    badge.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }
  badge.addEventListener('click', event => {
    if (!mobileScreen.matches) return;
    event.preventDefault();
    toggleMenu();
  });
  badge.addEventListener('keydown', event => {
    if (mobileScreen.matches && event.key === ' ') { event.preventDefault(); toggleMenu(); }
  });
  mobileScreen.addEventListener('change', syncBadge);
  syncBadge();
  menu.querySelectorAll('.sub-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      button.parentElement.classList.toggle('open', expanded);
    });
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); badge.focus(); } });
  document.addEventListener('click', event => { if (mobileScreen.matches && !header.contains(event.target)) closeMenu(); });
  const current = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === current) a.setAttribute('aria-current', 'page');
  });
  // Dos umbrales evitan cambios repetidos cuando se desplaza cerca del límite.
  // El espacio reservado del encabezado conserva la posición del contenido.
  const SHRINK_AT = 120;
  const EXPAND_AT = 24;
  let compact = window.scrollY > SHRINK_AT;
  let scrollFrame = null;
  header.classList.toggle('header-scrolled', compact);
  function updateHeader() {
    const position = Math.max(0, window.scrollY);
    const next = compact ? position > EXPAND_AT : position > SHRINK_AT;
    if (next !== compact) {
      compact = next;
      header.classList.toggle('header-scrolled', compact);
    }
    scrollFrame = null;
  }
  window.addEventListener('scroll', () => {
    if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateHeader);
  }, {passive:true});
}

// Prepara el envío mediante FormSubmit cuando exista un correo configurado.
function setupForms() {
  document.querySelectorAll('form.formsubmit').forEach(form => {
    if (FORM_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(FORM_EMAIL)) {
      form.action = `https://formsubmit.co/${encodeURIComponent(FORM_EMAIL)}`;
    }
    form.addEventListener('submit', event => {
      if (!form.hasAttribute('action')) {
        event.preventDefault();
        form.querySelector('.form-status').textContent = 'El formulario aún no está habilitado. El colegio debe confirmar el correo de recepción.';
      }
    });
  });
}

// Carga el video institucional cuando se configure un identificador válido.
function setupVideo() {
  const video = document.getElementById('video');
  const play = document.getElementById('vin');
  const message = document.getElementById('vmsg');
  if (!video || !play || !message) return;
  play.addEventListener('click', () => {
    if (!/^[\w-]{11}$/.test(VIDEO_ID)) { message.style.display = 'grid'; return; }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;
    iframe.title = 'Video institucional del Colegio Don Bosco';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    video.replaceChildren(iframe);
  });
}

// Inicializa formularios, componentes compartidos y enlaces a secciones.
async function init() {
  setupForms();
  setupVideo();
  await Promise.all([loadPartial('header-placeholder', 'partials/header.html'), loadPartial('footer-placeholder', 'partials/footer.html')]);
  setupHeader();
  const year = document.getElementById('y');
  if (year) year.textContent = new Date().getFullYear();
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
}
init();

// Carrusel espiritual único y galería sincronizada con la actividad seleccionada.
function setupSpiritualSliders() {
  document.querySelectorAll('.spirit-slider').forEach(slider => {
    const track = slider.querySelector('.spirit-track');
    const slides = [...track.querySelectorAll('.spirit-slide')];
    const galleries = [...slider.querySelectorAll('.spirit-gallery-group')];
    const counter = slider.querySelector('.spirit-counter');
    const previous = slider.querySelector('[data-slide="prev"]');
    const next = slider.querySelector('[data-slide="next"]');
    let index = 0;

    // Cambia la galería activa; CSS hace una transición suave entre imágenes.
    function updateView() {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      galleries.forEach((gallery, i) => {
        const active = i === index;
        gallery.classList.toggle('is-active', active);
        gallery.setAttribute('aria-hidden', String(!active));
      });
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    }

    // Desplaza solo el carrusel de esta sección, sin mover la página entera.
    function goTo(value) {
      index = Math.max(0, Math.min(slides.length - 1, value));
      track.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      updateView();
    }
    previous.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));
    // El gesto táctil o el desplazamiento manual también actualiza la galería.
    track.addEventListener('scroll', () => {
      const x = track.scrollLeft;
      const nearest = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - slides[0].offsetLeft - x) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - x) ? i : best, 0);
      if (nearest !== index) { index = nearest; updateView(); }
    }, { passive: true });
    updateView();
  });
}
setupSpiritualSliders();

// Línea de avance de la trayectoria, basada en la posición visible de la sección.
function setupHistoryProgress() {
  const timeline = document.querySelector('.history-timeline');
  if (!timeline || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let queued = false;
  function update() {
    const box = timeline.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - box.top) / Math.max(box.height, 1)));
    timeline.style.setProperty('--history-progress', `${progress * 100}%`);
    queued = false;
  }
  function requestUpdate() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', requestUpdate, {passive:true});
  window.addEventListener('resize', requestUpdate);
  update();
}
setupHistoryProgress();
