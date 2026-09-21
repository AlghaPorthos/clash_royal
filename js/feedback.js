/* ============================================================
 * Clash Royal · Fairy Tail Edition — player feedback box
 *
 * A small guestbook: players rate the game with a mood, write a
 * short comment, and every entry is saved (localStorage) and shown
 * inside the same box. Shared by all pages; injects its own modal
 * so no page markup is needed beyond a trigger button.
 * ============================================================ */
(function () {
  'use strict';
  const KEY = 'cr_feedback';
  const MOODS = [
    { id: 'love', ic: '😍', key: 'fbMLove' },
    { id: 'good', ic: '🙂', key: 'fbMGood' },
    { id: 'meh',  ic: '😐', key: 'fbMMeh'  },
    { id: 'sad',  ic: '🙁', key: 'fbMSad'  }
  ];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* private mode */ }
  }
  function moodIcon(id) {
    const m = MOODS.find(x => x.id === id);
    return m ? m.ic : '🙂';
  }
  function timeAgo(ts, T) {
    const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return T('fbJustNow');
    const m = Math.floor(s / 60);
    if (m < 60) return T('fbMinAgo').replace('{n}', m);
    const h = Math.floor(m / 60);
    if (h < 24) return T('fbHourAgo').replace('{n}', h);
    const d = Math.floor(h / 24);
    return T('fbDayAgo').replace('{n}', d);
  }

  /* ---------------- modal (injected once) ---------------- */
  let modal = null, picked = 'good';
  function ensureModal() {
    if (modal) return modal;
    const css = document.createElement('style');
    css.textContent = [
      '#crfbmodal{position:fixed;inset:0;z-index:80;display:none;align-items:center;justify-content:center;background:#05080fd9;backdrop-filter:blur(6px);padding:14px}',
      '#crfbmodal.open{display:flex}',
      '#crfbpanel{width:min(520px,96vw);max-height:86vh;display:flex;flex-direction:column;background:linear-gradient(165deg,#141f3a,#0a1220);border:1px solid #3d5a86;border-radius:18px;box-shadow:0 30px 80px #000d,0 0 40px #2a4a8a44;overflow:hidden}',
      '#crfbhead{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #27405f}',
      '#crfbhead h2{flex:1;margin:0;font-size:17px;color:#ffd700;letter-spacing:1px}',
      '#crfbclose{padding:7px 16px;font-size:12.5px;font-weight:bold;font-family:inherit;border-radius:16px;cursor:pointer;border:none;background:linear-gradient(135deg,#ffd700,#ff9838);color:#1a1200;box-shadow:0 6px 16px #ff983855}',
      '#crfbbody{overflow-y:auto;padding:16px 18px}',
      '.crfbmoods{display:flex;gap:10px;justify-content:center;margin-bottom:12px}',
      '.crfbmood{width:52px;height:52px;border-radius:50%;border:2px solid #2c4a78;background:#0d1729;cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;transition:transform .13s,border-color .13s,box-shadow .13s;filter:grayscale(.5) opacity(.75)}',
      '.crfbmood:hover{transform:translateY(-3px) scale(1.06);filter:none}',
      '.crfbmood.sel{border-color:#ffd700;box-shadow:0 0 16px #ffd70088;transform:scale(1.1);filter:none}',
      '.crfbmood i{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
      '.crfbta{width:100%;min-height:88px;resize:vertical;border-radius:12px;border:1.5px solid #2c4a78;background:#0d1729;color:#e8eef7;font-family:inherit;font-size:13.5px;line-height:1.6;padding:11px 13px;outline:none;transition:border-color .15s,box-shadow .15s}',
      '.crfbta:focus{border-color:#7fb2ff;box-shadow:0 0 12px #7fb2ff44}',
      '.crfbrow{display:flex;align-items:center;gap:10px;margin-top:10px}',
      '#crfbsend{margin-left:auto;padding:10px 24px;font-size:13.5px;font-weight:900;font-family:inherit;border-radius:26px;cursor:pointer;letter-spacing:1px;border:none;background:linear-gradient(135deg,#ffe07a,#ff9838 60%,#ff7a3d);color:#241300;box-shadow:0 8px 22px #ff983866;transition:transform .13s,box-shadow .13s,opacity .13s}',
      '#crfbsend:hover{transform:translateY(-2px);box-shadow:0 10px 28px #ff983899}',
      '#crfbsend:active{transform:translateY(1px) scale(.96)}',
      '#crfbsend:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}',
      '#crfbcount{font-size:11px;color:#7d92b8}',
      '.crfbnote{font-size:11px;color:#7d92b8;margin-top:8px;text-align:right}',
      '.crfbtoast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);z-index:90;padding:11px 22px;border-radius:26px;background:linear-gradient(135deg,#ffe07a,#ff9838);color:#241300;font-weight:900;font-size:13.5px;box-shadow:0 12px 34px #000a;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}',
      '.crfbtoast.show{opacity:1;transform:translateX(-50%) translateY(0)}',
      '.crfblist{margin-top:16px}',
      '.crfblisth{font-size:13px;font-weight:bold;color:#ffe9a0;margin-bottom:8px;display:flex;align-items:center;gap:6px}',
      '.crfbitem{position:relative;background:#0d1729;border:1px solid #24406a;border-radius:12px;padding:10px 34px 10px 12px;margin-bottom:8px;animation:crfbIn .3s ease}',
      '@keyframes crfbIn{from{transform:translateY(-6px);opacity:0}to{transform:none;opacity:1}}',
      '.crfbitem .top{display:flex;align-items:center;gap:7px;font-size:11px;color:#8ba0c6;margin-bottom:4px}',
      '.crfbitem .top .mi{font-size:16px}',
      '.crfbitem .txt{font-size:13px;color:#dbe7fa;line-height:1.55;word-break:break-word;white-space:pre-wrap}',
      '.crfbdel{position:absolute;top:7px;right:7px;width:22px;height:22px;border-radius:50%;border:1px solid #2c4a78;background:#0a1424;color:#7d92b8;font-size:12px;cursor:pointer;line-height:1;transition:all .13s}',
      '.crfbdel:hover{color:#ff9a8a;border-color:#ff9a8a}',
      '.crfbempty{text-align:center;color:#7d92b8;font-size:12.5px;padding:10px 0 4px}'
    ].join('\n');
    document.head.appendChild(css);

    modal = document.createElement('div');
    modal.id = 'crfbmodal';
    modal.innerHTML =
      '<div id="crfbpanel"><div id="crfbhead"><h2></h2><button id="crfbclose"></button></div>' +
      '<div id="crfbbody">' +
      '<div class="crfbmoods"></div>' +
      '<textarea class="crfbta" maxlength="300"></textarea>' +
      '<div class="crfbrow"><span id="crfbcount"></span><button id="crfbsend"></button></div>' +
      '<div class="crfbnote"></div>' +
      '<div class="crfblist"><div class="crfblisth"></div><div class="crfbitems"></div></div>' +
      '</div></div>';
    document.body.appendChild(modal);

    const ta = modal.querySelector('.crfbta');
    const send = modal.querySelector('#crfbsend');
    modal.querySelector('#crfbclose').onclick = closeModal;
    modal.addEventListener('pointerdown', e => { if (e.target === modal) closeModal(); });
    send.onclick = submit;
    ta.addEventListener('input', refresh);
    ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit(); });
    return modal;
  }

  function T(k) { return window.CRI18N ? CRI18N.t(k) : k; }
  function refresh() {
    const ta = modal.querySelector('.crfbta');
    const n = ta.value.trim().length;
    modal.querySelector('#crfbcount').textContent = n + '/300';
    modal.querySelector('#crfbsend').disabled = n === 0;
  }
  function renderMoods() {
    const box = modal.querySelector('.crfbmoods');
    box.innerHTML = '';
    MOODS.forEach(m => {
      const b = document.createElement('button');
      b.className = 'crfbmood' + (m.id === picked ? ' sel' : '');
      b.innerHTML = m.ic + '<i>' + T(m.key) + '</i>';
      b.title = T(m.key);
      b.onclick = () => { picked = m.id; renderMoods(); };
      box.appendChild(b);
    });
  }
  function renderList() {
    const list = load();
    const head = modal.querySelector('.crfblisth');
    const box = modal.querySelector('.crfbitems');
    head.textContent = '💬 ' + T('fbListTitle') + ' (' + list.length + ')';
    box.innerHTML = '';
    if (!list.length) {
      box.innerHTML = '<div class="crfbempty">' + T('fbEmpty') + '</div>';
      return;
    }
    list.forEach((it, idx) => {
      const el = document.createElement('div');
      el.className = 'crfbitem';
      el.innerHTML =
        '<div class="top"><span class="mi">' + moodIcon(it.mood) + '</span>' +
        '<span>' + timeAgo(it.ts, T) + '</span></div>' +
        '<div class="txt"></div>';
      el.querySelector('.txt').textContent = it.text;
      const del = document.createElement('button');
      del.className = 'crfbdel'; del.title = T('fbDelete'); del.textContent = '✕';
      del.onclick = () => {
        const l = load(); l.splice(idx, 1); save(l); renderList();
      };
      el.appendChild(del);
      box.appendChild(el);
    });
  }
  function refreshTexts() {
    if (!modal) return;
    modal.querySelector('#crfbhead h2').textContent = '💬 ' + T('fbTitle');
    modal.querySelector('#crfbclose').textContent = T('closeBtn');
    modal.querySelector('.crfbta').placeholder = T('fbPlaceholder');
    modal.querySelector('#crfbsend').textContent = T('fbSend');
    modal.querySelector('.crfbnote').textContent = T('fbNote');
    renderMoods(); renderList(); refresh();
  }
  function toast() {
    let t = document.querySelector('.crfbtoast');
    if (!t) { t = document.createElement('div'); t.className = 'crfbtoast'; document.body.appendChild(t); }
    t.textContent = T('fbThanks');
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function submit() {
    const ta = modal.querySelector('.crfbta');
    const text = ta.value.trim();
    if (!text) return;
    const list = load();
    list.unshift({ mood: picked, text: text.slice(0, 300), ts: Date.now() });
    save(list.slice(0, 100));
    ta.value = '';
    refresh(); renderList();
    toast();
  }
  function openModal() { ensureModal(); refreshTexts(); modal.classList.add('open'); }
  function closeModal() { if (modal) modal.classList.remove('open'); }

  window.addEventListener('crlang', refreshTexts);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  /* auto-wire any trigger buttons present on the page */
  function wire() {
    ['btnFeedback', 'fbBtn'].forEach(id => {
      const b = document.getElementById(id);
      if (b && !b._crfb) { b._crfb = true; b.addEventListener('click', openModal); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();

  window.CRFB = { openModal: openModal, closeModal: closeModal };
})();
