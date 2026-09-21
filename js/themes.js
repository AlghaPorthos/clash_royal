/* ============================================================
 * Clash Royal · Fairy Tail Edition — seasonal battlefield themes
 *
 * Shared by index.html (selector on the start screen) and
 * game.html (live terrain + ambient particles). Gameplay is
 * untouched: a theme only changes the environment rendering.
 *
 *   summer (default) / autumn / winter / spring
 * ============================================================ */
(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const W = 480, H = 800, RIVER_Y = H / 2, RIVER_H = 44, LX = [W * 0.22, W * 0.78];

  /* ---------------- palettes ---------------- */
  const PAL = {
    summer: {
      icon: '☀️', name: 'themeSummer', desc: 'dSummer',
      grass: ['#5c8f4f', '#578749', '#578747', '#639250'],
      checkerD: 'rgba(20,40,20,.05)', checkerL: 'rgba(255,255,240,.035)',
      path: 'rgba(206,180,138,', pathEdge: 'rgba(160,132,92,',
      tuftD: 'rgba(30,60,26,.3)', tuftL: 'rgba(150,200,120,.28)',
      flora: [{ t: 'flower', cols: ['#ffffff', '#ffd9e8', '#ffe9a0', '#d8f0ff'], n: 26 }],
      blotch: null,
      stone: '#8d97a3', stoneHi: '#aab6c2', stoneCap: null,
      bushD: '#2e5230', bushL: '#41703f', bushAlt: null,
      river: ['#2c5a8a', '#3f7cc0'], bank: '#3a6b3d', pebble: '#2a4f2c',
      floes: null,
      wash: 'rgba(255,244,200,.035)',
      vignette: ['rgba(6,10,20,0)', 'rgba(6,10,20,.36)'],
      ambient: 'summer', pfx: ['rgba(255,214,140,', 'rgba(160,200,255,']
    },
    autumn: {
      icon: '🍂', name: 'themeAutumn', desc: 'dAutumn',
      grass: ['#8a7a40', '#837540', '#7c6f3a', '#8d7c42'],
      checkerD: 'rgba(50,32,10,.06)', checkerL: 'rgba(255,240,200,.04)',
      path: 'rgba(196,150,104,', pathEdge: 'rgba(150,108,70,',
      tuftD: 'rgba(70,48,16,.34)', tuftL: 'rgba(216,178,110,.3)',
      flora: [{ t: 'leaf', cols: ['#c07830', '#a85820', '#c9983a'], n: 34 }],
      blotch: { cols: ['rgba(176,104,36,.16)', 'rgba(140,80,28,.13)'], n: 26 },
      stone: '#7d7264', stoneHi: '#9a8d7a', stoneCap: null,
      bushD: '#6d4a20', bushL: '#a06a2a', bushAlt: '#c07830',
      river: ['#33608c', '#4a7aa8'], bank: '#6b5a2e', pebble: '#54431f',
      floes: null,
      wash: 'rgba(255,180,100,.05)',
      vignette: ['rgba(20,12,6,0)', 'rgba(20,12,8,.38)'],
      ambient: 'autumn', pfx: ['rgba(255,180,110,', 'rgba(255,214,140,']
    },
    winter: {
      icon: '❄️', name: 'themeWinter', desc: 'dWinter',
      grass: ['#b9c9d4', '#c2d1da', '#bccbd6', '#cbd8e0'],
      checkerD: 'rgba(120,150,175,.06)', checkerL: 'rgba(255,255,255,.06)',
      path: 'rgba(226,236,244,', pathEdge: 'rgba(150,180,205,',
      tuftD: 'rgba(90,120,150,.18)', tuftL: 'rgba(255,255,255,.4)',
      flora: [{ t: 'spark', cols: ['#ffffff', '#dff0ff'], n: 22 }],
      blotch: { cols: ['rgba(255,255,255,.5)', 'rgba(238,246,252,.4)'], n: 42 },
      stone: '#8b98a6', stoneHi: '#c6d2dd', stoneCap: '#eef5fa',
      bushD: '#27453a', bushL: '#31584a', bushAlt: null,
      river: ['#8fb8d0', '#b0d2e2'], bank: '#d5e2ea', pebble: '#c2d2dd',
      floes: ['#f0f6fa', '#ffffff'],
      wash: 'rgba(170,205,255,.05)',
      vignette: ['rgba(10,18,34,0)', 'rgba(10,18,34,.4)'],
      ambient: 'winter', pfx: ['rgba(220,238,255,', 'rgba(190,220,255,']
    },
    spring: {
      icon: '🌸', name: 'themeSpring', desc: 'dSpring',
      grass: ['#5f9e4e', '#5f9c4c', '#5b9649', '#6cab58'],
      checkerD: 'rgba(20,50,20,.045)', checkerL: 'rgba(255,255,240,.05)',
      path: 'rgba(214,196,158,', pathEdge: 'rgba(168,146,104,',
      tuftD: 'rgba(28,62,24,.28)', tuftL: 'rgba(168,214,130,.34)',
      flora: [{ t: 'flower', cols: ['#ffc2d8', '#ffd8e8', '#ffffff', '#fff0f5', '#ffe2ee'], n: 42 }],
      blotch: { cols: ['rgba(255,200,220,.12)'], n: 16 },
      stone: '#8d97a3', stoneHi: '#aab6c2', stoneCap: null,
      bushD: '#2f5c34', bushL: '#4a8f4a', bushAlt: '#e8a0b8',
      river: ['#3570a8', '#4a8ec8'], bank: '#4a7a48', pebble: '#35603a',
      floes: null,
      wash: 'rgba(255,235,245,.045)',
      vignette: ['rgba(8,14,24,0)', 'rgba(8,14,24,.34)'],
      ambient: 'spring', pfx: ['rgba(255,200,220,', 'rgba(255,240,180,']
    }
  };
  const LIST = ['summer', 'autumn', 'winter', 'spring'];

  /* ---------------- persistence ---------------- */
  let current = localStorage.getItem('cr_theme');
  if (PAL[current] === undefined) current = 'summer';
  function get() { return current; }
  function set(k) {
    if (PAL[k] === undefined) return;
    current = k;
    try { localStorage.setItem('cr_theme', k); } catch (e) { /* private mode */ }
    window.dispatchEvent(new CustomEvent('crtheme', { detail: { theme: k } }));
    refreshSelected();
  }

  /* ---------------- helpers ---------------- */
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function rr(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r); g.closePath();
  }

  /* ============================================================
   * TERRAIN — draws the full 480x800 environment into a context
   * that will be scaled by s. Static: pre-rendered once per theme.
   * ============================================================ */
  function drawTerrain(g, key, s) {
    const P = PAL[key] || PAL.summer;
    g.save(); g.scale(s, s);
    // base grass
    const grad = g.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, P.grass[0]); grad.addColorStop(.5, P.grass[1]);
    grad.addColorStop(.52, P.grass[2]); grad.addColorStop(1, P.grass[3]);
    g.fillStyle = grad; g.fillRect(0, 0, W, H);
    // mow checker
    for (let r = 0; r < 16; r++) for (let c = 0; c < 10; c++) {
      if ((r + c) % 2) continue;
      g.fillStyle = r < 8 ? P.checkerD : P.checkerL;
      g.fillRect(c * W / 10, r * H / 16, W / 10, H / 16);
    }
    // seasonal ground blotches (snow patches / fallen-leaf tone)
    if (P.blotch) {
      for (let i = 0; i < P.blotch.n; i++) {
        const x = rnd(0, W), y = rnd(20, H - 20);
        if (Math.abs(y - RIVER_Y) < 40) continue;
        g.fillStyle = P.blotch.cols[Math.floor(Math.random() * P.blotch.cols.length)];
        g.beginPath(); g.ellipse(x, y, rnd(9, 24), rnd(5, 13), rnd(0, 3), 0, TAU); g.fill();
      }
    }
    // dirt lanes
    g.lineCap = 'round';
    const lane = (x1, y1, x2, y2, x3, y3, w, a) => {
      g.strokeStyle = P.path + a + ')'; g.lineWidth = w;
      g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo(x2, y2, x3, y3); g.stroke();
      g.strokeStyle = P.pathEdge + (a * .5) + ')'; g.lineWidth = w * .55;
      g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo(x2, y2, x3, y3); g.stroke();
    };
    lane(LX[0], RIVER_Y - 30, LX[0] - 10, 100, LX[0], 148, 36, .5);
    lane(LX[1], RIVER_Y - 30, LX[1] + 10, 100, LX[1], 148, 36, .5);
    lane(LX[0], RIVER_Y + 30, LX[0] - 10, 690, LX[0], H - 148, 36, .55);
    lane(LX[1], RIVER_Y + 30, LX[1] + 10, 690, LX[1], H - 148, 36, .55);
    lane(LX[0], 152, W / 2, 120, W / 2, 92, 30, .4);
    lane(LX[1], 152, W / 2, 120, W / 2, 92, 30, .4);
    lane(LX[0], H - 152, W / 2, H - 118, W / 2, H - 88, 30, .45);
    lane(LX[1], H - 152, W / 2, H - 118, W / 2, H - 88, 30, .45);
    // fortress plazas (stone castles stay constant across seasons)
    plaza(g, 'e', P); plaza(g, 'p', P);
    // grass tufts
    for (let i = 0; i < 240; i++) {
      const x = rnd(0, W), y = rnd(0, H);
      if (Math.abs(y - RIVER_Y) < 34) continue;
      g.strokeStyle = Math.random() < .5 ? P.tuftD : P.tuftL;
      g.lineWidth = 1.4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + rnd(-2, 2), y - rnd(3, 7)); g.stroke();
    }
    // flora
    P.flora.forEach(fl => {
      for (let i = 0; i < fl.n; i++) {
        const x = rnd(14, W - 14), y = rnd(30, H - 30);
        if (Math.abs(y - RIVER_Y) < 44) continue;
        if (fl.t === 'flower') {
          const c = fl.cols[Math.floor(Math.random() * fl.cols.length)];
          for (let p = 0; p < 5; p++) {
            const a = p / 5 * TAU;
            g.fillStyle = c; g.beginPath();
            g.arc(x + Math.cos(a) * 2.6, y + Math.sin(a) * 2.6, 1.7, 0, TAU); g.fill();
          }
          g.fillStyle = '#f0b030'; g.beginPath(); g.arc(x, y, 1.3, 0, TAU); g.fill();
        } else if (fl.t === 'leaf') {
          const c = fl.cols[Math.floor(Math.random() * fl.cols.length)];
          g.save(); g.translate(x, y); g.rotate(rnd(0, TAU));
          g.fillStyle = c; g.beginPath(); g.ellipse(0, 0, 4.2, 2.1, 0, 0, TAU); g.fill();
          g.strokeStyle = 'rgba(90,50,10,.5)'; g.lineWidth = .8;
          g.beginPath(); g.moveTo(-4, 0); g.lineTo(4, 0); g.stroke();
          g.restore();
        } else { // ice sparkle
          g.fillStyle = fl.cols[Math.floor(Math.random() * fl.cols.length)];
          g.save(); g.translate(x, y);
          g.beginPath();
          for (let i2 = 0; i2 < 8; i2++) {
            const a = i2 * Math.PI / 4, rad = (i2 % 2 === 0) ? 3 : 1.1;
            g[i2 ? 'lineTo' : 'moveTo'](Math.cos(a) * rad, Math.sin(a) * rad);
          }
          g.closePath(); g.fill(); g.restore();
        }
      }
    });
    // stones (+snow caps in winter)
    for (let i = 0; i < 10; i++) {
      const x = rnd(20, W - 20), y = Math.random() < .5 ? rnd(60, 140) : rnd(H - 140, H - 60);
      if (Math.abs(x - W / 2) < 50 && y < H / 2) continue;
      g.fillStyle = P.stone; g.beginPath(); g.ellipse(x, y, rnd(6, 11), rnd(4, 7), rnd(0, 3), 0, TAU); g.fill();
      g.fillStyle = P.stoneHi; g.beginPath(); g.ellipse(x - 2, y - 2, 3.4, 2.2, rnd(0, 3), 0, TAU); g.fill();
      if (P.stoneCap) { g.fillStyle = P.stoneCap; g.beginPath(); g.ellipse(x, y - 3, 5, 2.4, 0, 0, TAU); g.fill(); }
    }
    // bushes (+ blossom alt colour in spring)
    bush(g, 26, H - 36, P, false); bush(g, W - 26, H - 40, P, false);
    bush(g, 30, 44, P, true); bush(g, W - 30, 48, P, true);
    // river
    const rg = g.createLinearGradient(0, RIVER_Y - RIVER_H / 2, 0, RIVER_Y + RIVER_H / 2);
    rg.addColorStop(0, P.river[0]); rg.addColorStop(.5, P.river[1]); rg.addColorStop(1, P.river[0]);
    g.fillStyle = rg; g.fillRect(0, RIVER_Y - RIVER_H / 2, W, RIVER_H);
    g.fillStyle = P.bank; g.fillRect(0, RIVER_Y - RIVER_H / 2 - 4, W, 5); g.fillRect(0, RIVER_Y + RIVER_H / 2 - 1, W, 5);
    g.fillStyle = P.pebble;
    for (let x = 4; x < W; x += 26) {
      g.beginPath(); g.arc(x + rnd(-4, 4), RIVER_Y - RIVER_H / 2 - 1, rnd(2, 3.4), 0, TAU); g.fill();
      g.beginPath(); g.arc(x + 13 + rnd(-4, 4), RIVER_Y + RIVER_H / 2 + 2, rnd(2, 3.2), 0, TAU); g.fill();
    }
    // winter ice floes
    if (P.floes) {
      for (let i = 0; i < 7; i++) {
        const x = rnd(20, W - 20), y = RIVER_Y + rnd(-14, 14);
        if (Math.abs(x - LX[0]) < 40 || Math.abs(x - LX[1]) < 40) continue;
        g.fillStyle = P.floes[i % 2];
        g.beginPath(); g.ellipse(x, y, rnd(8, 16), rnd(3, 5), 0, 0, TAU); g.fill();
      }
    }
    // seasonal colour wash
    g.fillStyle = P.wash; g.fillRect(0, 0, W, H);
    g.restore();
  }
  function bush(g, x, y, P, alt) {
    g.fillStyle = alt && P.bushAlt ? P.bushAlt : P.bushD;
    g.beginPath(); g.arc(x - 9, y + 3, 9, 0, TAU); g.arc(x + 8, y + 4, 8, 0, TAU); g.arc(x, y - 4, 10, 0, TAU); g.fill();
    g.fillStyle = alt && P.bushAlt ? 'rgba(255,255,255,.25)' : P.bushL;
    g.beginPath(); g.arc(x - 4, y - 6, 6, 0, TAU); g.arc(x + 6, y - 3, 5, 0, TAU); g.fill();
    if (current === 'winter') { // snow caps on bushes
      g.fillStyle = 'rgba(255,255,255,.55)';
      g.beginPath(); g.ellipse(x, y - 8, 9, 3.4, 0, 0, TAU); g.fill();
    }
  }
  function plaza(g, side, P) {
    const y0 = side === 'e' ? 14 : H - 118, h = 104;
    const main = side === 'e' ? '#565c6d' : '#b4bec9', dark = side === 'e' ? '#41465a' : '#8f9cad';
    g.fillStyle = main; rr(g, 34, y0, W - 68, h, 10); g.fill();
    g.fillStyle = dark; rr(g, 34, y0 + (side === 'e' ? h - 16 : 0), W - 68, 16, 8); g.fill();
    const ey = side === 'e' ? y0 - 7 : y0 + h - 9;
    for (let x = 44; x < W - 50; x += 26) {
      if (side === 'e') {
        g.fillStyle = '#3c4152';
        g.beginPath(); g.moveTo(x, ey + 8); g.lineTo(x + 9, ey - 6); g.lineTo(x + 18, ey + 8); g.closePath(); g.fill();
      } else {
        g.fillStyle = '#a7b2bf'; g.fillRect(x, ey, 15, 9);
      }
    }
    g.fillStyle = side === 'e' ? '#8a3030' : '#3d6db5';
    g.fillRect(W / 2 - 16, y0 + 18, 32, h - 36);
    g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(W / 2 - 16, y0 + 18, 32, 4);
    g.strokeStyle = 'rgba(255,235,150,.5)'; g.lineWidth = 1.5;
    g.strokeRect(W / 2 - 16, y0 + 18, 32, h - 36);
  }

  /* wooden bridges — drawn per frame above the animated water */
  function drawBridges(g) {
    LX.forEach(bx => {
      g.fillStyle = '#a5793d'; g.fillRect(bx - 26, RIVER_Y - RIVER_H / 2, 52, RIVER_H);
      g.fillStyle = '#8a6430';
      for (let i = 0; i < 4; i++) g.fillRect(bx - 26, RIVER_Y - RIVER_H / 2 + i * (RIVER_H / 4) + 2, 52, 3);
      g.fillStyle = '#c69a58'; g.fillRect(bx - 26, RIVER_Y - RIVER_H / 2, 52, 4);
      g.fillStyle = '#7a5a2c'; g.fillRect(bx - 27, RIVER_Y - RIVER_H / 2, 3, RIVER_H); g.fillRect(bx + 24, RIVER_Y - RIVER_H / 2, 3, RIVER_H);
    });
  }

  /* ============================================================
   * PREVIEW — landscape card thumbnail centred on the river
   * ============================================================ */
  const previewCache = {};
  function renderPreview(canvasEl, key) {
    if (!canvasEl) return;
    const w = canvasEl.width || 168, h = canvasEl.height || 112;
    let src = previewCache[key];
    if (!src) {
      src = document.createElement('canvas'); src.width = 480; src.height = 800;
      drawTerrain(src.getContext('2d'), key, 1);
      // bridges + sample towers so the preview reads as a battlefield
      const pg = src.getContext('2d');
      drawBridges(pg);
      previewCache[key] = src;
    }
    const g = canvasEl.getContext('2d');
    g.clearRect(0, 0, w, h);
    // crop the band around the river: y 400±150 → scale to card
    const bandH = 300, sx = 0, sy = RIVER_Y - bandH / 2;
    g.drawImage(src, sx, sy, W, bandH, 0, 0, w, h);
  }

  /* ============================================================
   * AMBIENT PARTICLES — drifting leaves / petals / snow /
   * butterflies + light motes, drawn above the battlefield
   * ============================================================ */
  function makeAmbient(key) {
    const kind = (PAL[key] || PAL.summer).ambient;
    const list = [];
    const seed = (n, fn) => { for (let i = 0; i < n; i++) list.push(fn(i)); };
    if (kind === 'autumn') {
      seed(12, () => ({ t: 'leaf', x: rnd(0, W), y: rnd(0, H), vy: rnd(16, 34), ph: rnd(0, 7), amp: rnd(10, 26), rot: rnd(0, TAU), rs: rnd(-2, 2), c: ['#d08a30', '#b8621f', '#c9a83a', '#8a5a20'][Math.floor(rnd(0, 4))], s: rnd(.8, 1.3) }));
      seed(5, () => ({ t: 'mote', x: rnd(0, W), y: rnd(0, H), vy: -rnd(6, 14), ph: rnd(0, 7), r: rnd(1, 2), c: '255,214,140' }));
    } else if (kind === 'winter') {
      seed(16, () => ({ t: 'snow', x: rnd(0, W), y: rnd(0, H), vy: rnd(18, 42), ph: rnd(0, 7), amp: rnd(8, 20), r: rnd(1, 2.6), a: rnd(.5, .95) }));
      seed(4, () => ({ t: 'glint', x: rnd(0, W), y: rnd(0, H), ph: rnd(0, 7), r: rnd(1.4, 2.6) }));
    } else if (kind === 'spring') {
      seed(11, () => ({ t: 'petal', x: rnd(0, W), y: rnd(0, H), vy: rnd(12, 26), ph: rnd(0, 7), amp: rnd(14, 30), rot: rnd(0, TAU), rs: rnd(-1.6, 1.6), c: ['#ffc2d8', '#ffd8e8', '#fff0f5'][Math.floor(rnd(0, 3))], s: rnd(.8, 1.2) }));
      seed(2, () => ({ t: 'bfly', ax: rnd(40, W - 40), ay: rnd(80, H - 120), ph: rnd(0, 7), sp: rnd(.5, .9), c: ['#ffffff', '#ffd9e8'][Math.floor(rnd(0, 2))] }));
      seed(6, () => ({ t: 'mote', x: rnd(0, W), y: rnd(0, H), vy: -rnd(6, 14), ph: rnd(0, 7), r: rnd(1, 2), c: '255,235,190' }));
    } else { // summer
      seed(3, () => ({ t: 'bfly', ax: rnd(40, W - 40), ay: rnd(80, H - 120), ph: rnd(0, 7), sp: rnd(.5, .9), c: ['#ffd9e8', '#c2e8ff', '#fff2b0'][Math.floor(rnd(0, 3))] }));
      seed(8, () => ({ t: 'mote', x: rnd(0, W), y: rnd(0, H), vy: -rnd(6, 16), ph: rnd(0, 7), r: rnd(1, 2.2), c: '255,230,170' }));
      seed(2, () => ({ t: 'leaf', x: rnd(0, W), y: rnd(0, H), vy: rnd(10, 20), ph: rnd(0, 7), amp: rnd(8, 18), rot: rnd(0, TAU), rs: rnd(-1, 1), c: '#7fae5a', s: .8 }));
    }
    return {
      step(dt, now, g) {
        list.forEach(p => {
          if (p.t === 'bfly') {
            p.x = p.ax + Math.sin(now * p.sp + p.ph) * 46 + Math.sin(now * p.sp * 2.3 + p.ph) * 12;
            p.y = p.ay + Math.cos(now * p.sp * .8 + p.ph) * 30;
          } else {
            p.y += p.vy * dt;
            p.x += Math.sin(now + p.ph) * (p.amp || 8) * dt;
            if (p.y > H + 12) { p.y = -12; p.x = rnd(0, W); }
            if (p.y < -12) { p.y = H + 12; p.x = rnd(0, W); }
            if (p.rot !== undefined) p.rot += p.rs * dt;
          }
        });
        // draw
        list.forEach(p => {
          if (p.t === 'leaf' || p.t === 'petal') {
            g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.scale(p.s, p.s);
            g.fillStyle = p.c; g.globalAlpha = .88;
            g.beginPath(); g.ellipse(0, 0, 4.2, p.t === 'petal' ? 2.4 : 2, 0, 0, TAU); g.fill();
            g.strokeStyle = 'rgba(90,50,10,.35)'; g.lineWidth = .7;
            g.beginPath(); g.moveTo(-4, 0); g.lineTo(4, 0); g.stroke();
            g.restore(); g.globalAlpha = 1;
          } else if (p.t === 'snow') {
            g.fillStyle = 'rgba(255,255,255,' + p.a + ')';
            g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill();
          } else if (p.t === 'glint') {
            const tw = .5 + .5 * Math.sin(now * 2.4 + p.ph);
            g.fillStyle = 'rgba(255,255,255,' + (.85 * tw) + ')';
            g.save(); g.translate(p.x, p.y);
            g.beginPath();
            for (let i = 0; i < 8; i++) {
              const a = i * Math.PI / 4, rad = (i % 2 === 0) ? p.r * 2.4 : p.r;
              g[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rad, Math.sin(a) * rad);
            }
            g.closePath(); g.fill(); g.restore();
          } else if (p.t === 'bfly') {
            const flap = Math.abs(Math.sin(now * 9 + p.ph));
            g.save(); g.translate(p.x, p.y);
            g.fillStyle = p.c; g.globalAlpha = .92;
            g.beginPath(); g.ellipse(-3.2 * (.3 + .7 * flap), -1, 3.4, 2.6, -.5, 0, TAU); g.fill();
            g.beginPath(); g.ellipse(3.2 * (.3 + .7 * flap), -1, 3.4, 2.6, .5, 0, TAU); g.fill();
            g.beginPath(); g.ellipse(-2.6 * (.3 + .7 * flap), 2, 2.4, 1.8, .4, 0, TAU); g.fill();
            g.beginPath(); g.ellipse(2.6 * (.3 + .7 * flap), 2, 2.4, 1.8, -.4, 0, TAU); g.fill();
            g.strokeStyle = '#3a3a4a'; g.lineWidth = 1;
            g.beginPath(); g.moveTo(0, -3); g.lineTo(0, 3.6); g.stroke();
            g.restore(); g.globalAlpha = 1;
          } else { // mote
            const tw = .5 + .5 * Math.sin(now * 1.8 + p.ph);
            g.fillStyle = 'rgba(' + p.c + ',' + (.5 * tw) + ')';
            g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill();
          }
        });
      }
    };
  }

  /* ============================================================
   * THEME SELECTOR MODAL — injected once, shared by all pages
   * ============================================================ */
  let modal = null;
  function ensureModal() {
    if (modal) return modal;
    const css = document.createElement('style');
    css.textContent = [
      '#crthememodal{position:fixed;inset:0;z-index:70;display:none;align-items:center;justify-content:center;background:#05080fd9;backdrop-filter:blur(6px);padding:14px}',
      '#crthememodal.open{display:flex}',
      '#crthemepanel{width:min(620px,96vw);max-height:90vh;overflow:auto;background:linear-gradient(165deg,#141f3a,#0a1220);border:1px solid #3d5a86;border-radius:18px;box-shadow:0 30px 80px #000d,0 0 40px #2a4a8a44;padding:18px}',
      '#crthemehead{display:flex;align-items:center;gap:10px;margin-bottom:14px}',
      '#crthemehead h2{flex:1;margin:0;font-size:18px;color:#ffd700;letter-spacing:1px}',
      '#crthemeclose{padding:7px 16px;font-size:12.5px;font-weight:bold;font-family:inherit;border-radius:16px;cursor:pointer;border:none;background:linear-gradient(135deg,#ffd700,#ff9838);color:#1a1200;box-shadow:0 6px 16px #ff983855}',
      '#crthemegrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}',
      '.crtheme{position:relative;border:2px solid #2c4a78;border-radius:14px;overflow:hidden;cursor:pointer;background:#0d1729;transition:transform .15s,border-color .15s,box-shadow .15s}',
      '.crtheme:hover{transform:translateY(-4px);border-color:#7fb2ff}',
      '.crtheme canvas{width:100%;height:118px;display:block;object-fit:cover}',
      '.crtheme .nm{display:flex;align-items:center;gap:7px;padding:9px 12px 2px;font-weight:bold;font-size:14px;color:#eaf2ff}',
      '.crtheme .nm .ic{font-size:16px}',
      '.crtheme .ds{padding:0 12px 11px;font-size:11.5px;color:#8ba0c6}',
      '.crtheme .badge{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:50%;display:none;align-items:center;justify-content:center;background:linear-gradient(135deg,#ffd700,#ff9838);color:#241300;font-weight:900;box-shadow:0 3px 10px #000a}',
      '.crtheme.sel{border-color:#ffd700;box-shadow:0 0 22px #ffd70088,0 10px 26px #000a;transform:translateY(-2px)}',
      '.crtheme.sel .badge{display:flex;animation:crpop .35s ease}',
      '@keyframes crpop{0%{transform:scale(.3)}70%{transform:scale(1.25)}100%{transform:scale(1)}}',
      '.crtheme.sel::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent 60%,rgba(255,215,0,.12))}'
    ].join('\n');
    document.head.appendChild(css);

    modal = document.createElement('div');
    modal.id = 'crthememodal';
    modal.innerHTML =
      '<div id="crthemepanel"><div id="crthemehead"><h2></h2><button id="crthemeclose"></button></div>' +
      '<div id="crthemegrid"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('pointerdown', e => { if (e.target === modal) closeModal(); });
    modal.querySelector('#crthemeclose').onclick = closeModal;
    buildGrid();
    return modal;
  }
  function buildGrid() {
    const grid = modal.querySelector('#crthemegrid');
    grid.innerHTML = '';
    LIST.forEach(key => {
      const P = PAL[key];
      const el = document.createElement('div');
      el.className = 'crtheme' + (key === current ? ' sel' : '');
      el.setAttribute('data-theme', key);
      el.innerHTML =
        '<canvas width="220" height="118"></canvas>' +
        '<div class="nm"><span class="ic">' + P.icon + '</span><span class="tx"></span></div>' +
        '<div class="ds"></div><div class="badge">✓</div>';
      el.onclick = () => set(key);
      grid.appendChild(el);
      renderPreview(el.querySelector('canvas'), key);
    });
    refreshTexts(); refreshSelected();
  }
  function refreshTexts() {
    if (!modal) return;
    modal.querySelector('#crthemehead h2').textContent = CRI18N.t('themeTitle');
    modal.querySelector('#crthemeclose').textContent = CRI18N.t('closeBtn');
    modal.querySelectorAll('.crtheme').forEach(el => {
      const P = PAL[el.getAttribute('data-theme')];
      el.querySelector('.nm .tx').textContent = CRI18N.t(P.name);
      el.querySelector('.ds').textContent = CRI18N.t(P.desc);
    });
  }
  function refreshSelected() {
    if (!modal) return;
    modal.querySelectorAll('.crtheme').forEach(el =>
      el.classList.toggle('sel', el.getAttribute('data-theme') === current));
  }
  function openModal() { ensureModal(); refreshTexts(); modal.classList.add('open'); window.dispatchEvent(new CustomEvent('crthemeui', { detail: { open: true } })); }
  function closeModal() { if (modal) modal.classList.remove('open'); window.dispatchEvent(new CustomEvent('crthemeui', { detail: { open: false } })); }
  function isModalOpen() { return !!(modal && modal.classList.contains('open')); }
  window.addEventListener('crlang', refreshTexts);

  window.CRTHEMES = {
    LIST: LIST, PAL: PAL,
    get: get, set: set,
    drawTerrain: drawTerrain,
    drawBridges: drawBridges,
    renderPreview: renderPreview,
    makeAmbient: makeAmbient,
    openModal: openModal, closeModal: closeModal, isModalOpen: isModalOpen
  };
})();
