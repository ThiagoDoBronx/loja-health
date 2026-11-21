// Liga botões, som do vídeo, marca, contato e Pixel da Meta a partir do config.js
(function(){
  const C = window.LOJA || {};
  document.querySelectorAll('.marca').forEach(e => { if (C.marca) e.textContent = C.marca; });
  if (C.marca) document.title = document.title.replace('SUA MARCA', C.marca);
  document.querySelectorAll('.contato').forEach(e => { if (C.contato) e.textContent = 'Contato: ' + C.contato; });
  const m = document.querySelector('main[data-produto]');
  if (C.pixel) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.pixel); fbq('track', 'PageView');
    if (m) fbq('track', 'ViewContent', {content_ids:[m.dataset.produto], content_name:m.dataset.nome, value:+m.dataset.valor, currency:'BRL'});
  }
  if (m) {
    const link = (C.checkout || {})[m.dataset.produto];
    document.querySelectorAll('.comprar').forEach(b => {
      if (link) b.href = link;
      b.addEventListener('click', ev => {
        if (window.fbq) fbq('track', 'InitiateCheckout', {content_ids:[m.dataset.produto], value:+m.dataset.valor, currency:'BRL'});
        if (!link) { ev.preventDefault(); b.textContent = 'Checkout em configuração'; }
      });
    });
    const v = m.querySelector('.video video'), s = m.querySelector('.som');
    if (v && s) s.onclick = () => { v.muted = !v.muted; v.play(); s.textContent = v.muted ? '🔇 Ativar som' : '🔊 Som ligado'; };
  }
})();
