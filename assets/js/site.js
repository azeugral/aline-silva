/* Aline R. Silva · comportamento do site */
window.CONFIG = {
  whatsapp: '551930266446'
};

(function () {
  var doc = document.documentElement;
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var largo = matchMedia('(min-width: 901px)');

  /* abertura */
  document.querySelectorAll('[data-in]').forEach(function (el) { el.style.setProperty('--i', el.dataset.in); });
  function pronto() { doc.classList.add('pronto'); }
  requestAnimationFrame(function () { setTimeout(pronto, 60); });
  setTimeout(pronto, 400); /* garantia se o rAF atrasar */
  document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* WhatsApp com mensagem pronta */
  document.querySelectorAll('.js-zap').forEach(function (a) {
    a.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(a.dataset.msg || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* menu (celular) */
  var topo = document.querySelector('[data-topo]');
  var abrir = document.querySelector('.menu-abrir');
  var menu = document.getElementById('menu');
  function alternar(a) {
    abrir.setAttribute('aria-expanded', a);
    abrir.querySelector('span').textContent = a ? 'Fechar' : 'Menu';
    menu.classList.toggle('aberto', a);
    topo.classList.toggle('menu-aberto', a);
    document.body.style.overflow = a ? 'hidden' : '';
  }
  abrir.addEventListener('click', function () { alternar(abrir.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a') && abrir.getAttribute('aria-expanded') === 'true') alternar(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && abrir.getAttribute('aria-expanded') === 'true') { alternar(false); abrir.focus(); } });
  matchMedia('(min-width: 1081px)').addEventListener('change', function (m) { if (m.matches) alternar(false); });

  /* topo sólido, some ao descer (só no PC), botão fixo e paralaxe */
  var fixo = document.querySelector('.zap-fixo');
  var contato = document.getElementById('contato');
  var foto = document.querySelector('[data-paralaxe] img');
  var ultimo = 0, pendente = false;
  function aoRolar() {
    pendente = false;
    var y = scrollY;
    topo.classList.toggle('solido', y > 40);
    if (largo.matches && !topo.classList.contains('menu-aberto')) topo.classList.toggle('escondido', y > ultimo && y > innerHeight * .9);
    else topo.classList.remove('escondido');
    ultimo = y;
    if (fixo) {
      var c = contato.getBoundingClientRect().top;
      fixo.classList.toggle('vis', y > innerHeight * .8 && c > innerHeight * .6);
    }
    if (foto && !reduz && largo.matches && y < innerHeight * 1.2 && doc.classList.contains('pronto')) {
      foto.style.transform = 'translate3d(0,' + (y * .1).toFixed(1) + 'px,0)';
    }
  }
  addEventListener('scroll', function () { if (!pendente) { pendente = true; requestAnimationFrame(aoRolar); } }, { passive: true });
  aoRolar();
  /* a paralaxe só assume depois que a foto termina de entrar */
  setTimeout(function () { if (foto) foto.style.transition = 'none'; aoRolar(); }, 2400);

  /* revelar ao rolar */
  var io = 'IntersectionObserver' in window && !reduz ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' }) : null;
  var grupos = new Map();
  document.querySelectorAll('[data-rv]').forEach(function (el) {
    el.classList.add('rv');
    if (!io) { el.classList.add('vis'); return; }
    var pai = el.parentNode;
    var n = grupos.get(pai) || 0;
    grupos.set(pai, n + 1);
    el.style.transitionDelay = Math.min(n, 5) * 80 + 'ms';
    io.observe(el);
  });
  /* os nós das etapas entram depois da linha */
  document.querySelectorAll('[data-etapas] li').forEach(function (li, i) { li.style.transitionDelay = i * 160 + 'ms'; });

  /* contador */
  document.querySelectorAll('[data-conta]').forEach(function (el) {
    if (reduz) return;
    var fim = +el.dataset.conta, t0 = null;
    el.textContent = '0';
    setTimeout(function () {
      requestAnimationFrame(function passo(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(passo);
      });
    }, 900);
  });

  /* índice das áreas */
  var links = [].slice.call(document.querySelectorAll('.indice a'));
  var marca = document.querySelector('.indice-marca');
  var indice = document.querySelector('.indice');
  function marcar(id) {
    links.forEach(function (a) {
      var ativo = a.dataset.alvo === id;
      a.classList.toggle('ativo', ativo);
      if (ativo && marca) {
        if (largo.matches) {
          marca.style.width = '';
          marca.style.height = a.offsetHeight + 'px';
          marca.style.transform = 'translateY(' + a.offsetTop + 'px)';
        } else {
          marca.style.height = '';
          marca.style.width = a.offsetWidth + 'px';
          marca.style.transform = 'translateX(' + a.offsetLeft + 'px)';
          var alvo = a.offsetLeft - 24;
          if (indice.scrollTo) indice.scrollTo({ left: alvo, behavior: reduz ? 'auto' : 'smooth' });
        }
      }
    });
  }
  if (links.length && 'IntersectionObserver' in window) {
    var atual = 'familia';
    var ioA = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { atual = e.target.id; marcar(atual); } });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('[data-area]').forEach(function (s) { ioA.observe(s); });
    marcar(atual);
    largo.addEventListener('change', function () { marcar(atual); });
    addEventListener('resize', function () { marcar(atual); });
    if (document.fonts) document.fonts.ready.then(function () { marcar(atual); });
  }

  /* menu: seção ativa */
  var navLinks = [].slice.call(document.querySelectorAll('.menu > a[href^="#"]:not(.btn)'));
  if ('IntersectionObserver' in window) {
    var ioN = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['areas', 'escritorio', 'como-funciona', 'duvidas', 'contato'].forEach(function (id) { var s = document.getElementById(id); if (s) ioN.observe(s); });
  }

  /* dúvidas: abre e fecha com altura animada */
  document.querySelectorAll('[data-faq] details').forEach(function (d) {
    var s = d.querySelector('summary');
    var r = d.querySelector('.faq-r');
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.classList.contains('aberto')) {
        d.classList.remove('aberto');
        var fim = function (ev) { if (ev.target !== r) return; r.removeEventListener('transitionend', fim); if (!d.classList.contains('aberto')) d.open = false; };
        if (reduz) d.open = false;
        else { r.addEventListener('transitionend', fim); setTimeout(function () { if (!d.classList.contains('aberto')) d.open = false; }, 700); }
      } else {
        d.open = true;
        void r.offsetHeight; /* força o layout fechado antes de animar */
        d.classList.add('aberto');
      }
    });
  });
})();
