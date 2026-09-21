/* ============================================================
 * Clash Royal · Fairy Tail Edition — characters & artwork
 *
 * The 8 original card slots keep their mechanics and are mapped
 * onto Fairy Tail characters. Portraits are cropped from the
 * supplied guild poster (assets/p_*.png) so troops, cards and
 * menus show real anime art instead of placeholder figures.
 *
 *   knight    -> Gray Fullbuster   (balanced melee)
 *   archers   -> Lucy & Wendy      (2x ranged, variant art)
 *   giant     -> Makarov           (tank, buildings only)
 *   minipekka -> Erza Scarlet      (single-target burst)
 *   musketeer -> Juvia Lockser     (long range)
 *   skeletons -> Happy swarm       (3x cheap swarm)
 *   cannon    -> Mirajane          (defensive ward)
 *   fireball  -> Natsu             (area spell)
 * ============================================================ */
(function () {
  'use strict';

  /* ---------------- cast metadata ---------------- */
  const FT = {
    knight: {
      name: { en: 'Gray Fullbuster', zh: '格雷·佛尔巴斯特' },
      spell: { en: 'Ice-Make: Sword', zh: '冰之造型·冰剑' },
      role: { en: 'Balanced melee vanguard', zh: '均衡近战先锋' },
      img: 'assets/p_gray.png', c1: '#4a7dc0', c2: '#16223e', glow: '#8fd8ff', proj: '#cfe8ff'
    },
    archers: {
      name: { en: 'Lucy & Wendy', zh: '露西 & 温蒂' },
      spell: { en: 'Celestial Sky Duo', zh: '星灵与天空二人组' },
      role: { en: 'Deploys 2 ranged mages', zh: '双人远程输出' },
      img: 'assets/p_lucy.png', img2: 'assets/p_wendy.png',
      c1: '#f2dc8e', c2: '#2e3244', glow: '#ffe9a0', proj: '#fff2b8'
    },
    giant: {
      name: { en: 'Makarov', zh: '马卡罗夫' },
      spell: { en: 'Giant Magic: Titan', zh: '巨人魔法·泰坦' },
      role: { en: 'Tank — only hits buildings', zh: '肉盾,只打建筑' },
      img: 'assets/p_makarov.png', c1: '#e08a55', c2: '#4a2418', glow: '#ffb08a', proj: '#ffb08a'
    },
    minipekka: {
      name: { en: 'Erza Scarlet', zh: '艾露莎·舒卡勒托' },
      spell: { en: 'Requip: Sword Burst', zh: '换装·连击之剑' },
      role: { en: 'Extreme single-target burst', zh: '单体爆发刺客' },
      img: 'assets/p_erza.png', c1: '#e06055', c2: '#3f1c22', glow: '#ff9a9a', proj: '#ffb0a8'
    },
    musketeer: {
      name: { en: 'Juvia Lockser', zh: '朱毕安·罗克赛' },
      spell: { en: 'Water Slicer', zh: '水之斩击' },
      role: { en: 'Long-range water sniper', zh: '超远程水系输出' },
      img: 'assets/p_juvia.png', c1: '#6fb2f0', c2: '#16305e', glow: '#9fd8ff', proj: '#7fd0ff'
    },
    skeletons: {
      name: { en: 'Happy Swarm', zh: '哈比猫群' },
      spell: { en: 'Aye Sir! x3', zh: '上吧!×3' },
      role: { en: 'Deploys 3 flying cats', zh: '三只小猫人海' },
      img: 'assets/p_happy.png', c1: '#7ac0ea', c2: '#24486e', glow: '#b0e0ff', proj: '#b0e0ff'
    },
    cannon: {
      name: { en: 'Mirajane', zh: '米拉杰' },
      spell: { en: 'Satan Soul Ward', zh: '撒旦之魂·结界' },
      role: { en: 'Defensive ward · 25s', zh: '防守结界 · 25 秒' },
      img: 'assets/p_mirajane.png', c1: '#b9a6e8', c2: '#2c2444', glow: '#d8c8ff', proj: '#c8b0ff'
    },
    fireball: {
      name: { en: 'Natsu', zh: '纳兹' },
      spell: { en: "Fire Dragon's Roar", zh: '火龙的咆哮' },
      role: { en: 'Area damage spell', zh: '范围伤害法术' },
      img: 'assets/p_natsu.png', c1: '#ffb050', c2: '#5e2410', glow: '#ffd070', proj: '#ffb050'
    }
  };
  const DECK_ORDER = ['knight', 'archers', 'giant', 'minipekka', 'musketeer', 'skeletons', 'cannon', 'fireball'];

  /* If js/assets.js (embedded base64 images) is loaded, swap the portrait
     paths for data URIs; otherwise keep the assets/ file paths. */
  if (window.ASSETS) {
    Object.keys(FT).forEach(function (k) {
      if (ASSETS[FT[k].img]) FT[k].img = ASSETS[FT[k].img];
      if (FT[k].img2 && ASSETS[FT[k].img2]) FT[k].img2 = ASSETS[FT[k].img2];
    });
  }

  /* ---------------- portrait image loading ---------------- */
  const IMGS = {};
  let loaded = 0, toLoad = 0, onReadyCb = null;
  function preloadPortraits(cb) {
    onReadyCb = cb || null;
    const urls = new Set();
    Object.keys(FT).forEach(function (k) { urls.add(FT[k].img); if (FT[k].img2) urls.add(FT[k].img2); });
    toLoad = urls.size;
    if (!toLoad && onReadyCb) { onReadyCb(); return; }
    urls.forEach(function (u) {
      const im = new Image();
      im.onload = im.onerror = function () {
        loaded++;
        if (loaded >= toLoad && onReadyCb) onReadyCb();
      };
      im.src = u;
      IMGS[u] = im;
    });
  }
  function imgOf(key, v) {
    const d = FT[key];
    const u = (v && d.img2) ? d.img2 : d.img;
    return IMGS[u] || null;
  }
  function portraitsReady() { return loaded >= toLoad; }

  const TAU = Math.PI * 2;

  /* ============================================================
   * BATTLE UNIT TOKEN — circular anime portrait in a rarity-style
   * frame. side: 'p' blue / 'e' red. o: {v, scale, glow}
   * ============================================================ */
  function drawFTUnit(g, key, x, y, size, side, o) {
    o = o || {};
    const big = key === 'giant';
    const sc = (size / 40) * (big ? 1.3 : 1) * (o.scale || 1);
    const rc = side === 'p' ? '80,170,255' : '255,100,80';
    const R = 15 * sc; // token radius

    // ground aura
    const rg = g.createRadialGradient(x, y + 13 * sc, .5, x, y + 13 * sc, 19 * sc);
    rg.addColorStop(0, 'rgba(' + rc + ',.5)'); rg.addColorStop(1, 'rgba(' + rc + ',0)');
    g.fillStyle = rg;
    g.beginPath(); g.ellipse(x, y + 13 * sc, 18 * sc, 6 * sc, 0, 0, TAU); g.fill();

    // spawn glow halo
    if (o.glow) {
      const hg = g.createRadialGradient(x, y, 2, x, y, R * 1.9);
      hg.addColorStop(0, 'rgba(255,255,255,' + (.55 * o.glow) + ')');
      hg.addColorStop(.45, 'rgba(' + rc + ',' + (.4 * o.glow) + ')');
      hg.addColorStop(1, 'rgba(' + rc + ',0)');
      g.fillStyle = hg; g.beginPath(); g.arc(x, y, R * 1.9, 0, TAU); g.fill();
    }

    // outer frame ring
    g.save();
    g.beginPath(); g.arc(x, y, R + 2.6 * sc, 0, TAU);
    g.fillStyle = side === 'p' ? '#2e5f9e' : '#8a2c22';
    g.fill();
    g.lineWidth = Math.max(1.2, 1.6 * sc);
    g.strokeStyle = side === 'p' ? '#9fd0ff' : '#ffb0a0';
    g.stroke();

    // portrait clip
    g.beginPath(); g.arc(x, y, R, 0, TAU); g.clip();
    const im = imgOf(key, o.v);
    if (im && im.width) {
      g.drawImage(im, x - R, y - R, R * 2, R * 2);
    } else { // fallback tint while loading
      const d = FT[key];
      g.fillStyle = d.c2; g.fillRect(x - R, y - R, R * 2, R * 2);
    }
    // inner rim light
    const rim = g.createRadialGradient(x - R * .3, y - R * .4, R * .2, x, y, R);
    rim.addColorStop(0, 'rgba(255,255,255,.18)');
    rim.addColorStop(.8, 'rgba(0,0,0,0)');
    rim.addColorStop(1, 'rgba(0,10,30,.45)');
    g.fillStyle = rim; g.fillRect(x - R, y - R, R * 2, R * 2);
    g.restore();
  }

  /* ============================================================
   * CARD FACE URLS (portrait image straight from assets)
   * ============================================================ */
  function ftThumb(key, size, v) {
    const d = FT[key];
    return (v && d.img2) ? d.img2 : d.img;
  }

  /* ============================================================
   * Flame head for the Natsu spell projectile
   * ============================================================ */
  function flameHead(g, k) {
    g.save(); g.scale(k, k);
    const flame = function (r, col) {
      g.fillStyle = col; g.beginPath();
      g.moveTo(0, -r);
      g.quadraticCurveTo(r * .95, -r * .35, r * .72, r * .18);
      g.quadraticCurveTo(r * .95, r * .55, r * .4, r * .78);
      g.quadraticCurveTo(0, r * .95, -r * .4, r * .78);
      g.quadraticCurveTo(-r * .95, r * .55, -r * .72, r * .18);
      g.quadraticCurveTo(-r * .95, -r * .35, 0, -r);
      g.closePath(); g.fill();
    };
    flame(13, '#ff7a1e'); flame(9.6, '#ffb84a'); flame(6.4, '#ffe9a0');
    g.fillStyle = '#fff8e0';
    g.beginPath(); g.arc(0, 2, 3.2, 0, TAU); g.fill();
    g.restore();
  }

  /* ============================================================
   * Magic summoning circle used by deployment FX (drawn under the
   * spawning unit). p: 0..1 progress, c: rgb triple string.
   * ============================================================ */
  function drawMagicCircle(g, x, y, R, p, c, rot) {
    const a = Math.sin(Math.min(1, p) * Math.PI); // fade in & out
    g.save();
    g.translate(x, y); g.rotate(rot || 0);
    g.globalAlpha = .85 * a;
    g.strokeStyle = 'rgba(' + c + ',.9)'; g.lineWidth = 2;
    g.beginPath(); g.ellipse(0, 0, R, R * .38, 0, 0, TAU); g.stroke();
    g.globalAlpha = .5 * a;
    g.beginPath(); g.ellipse(0, 0, R * .66, R * .25, 0, 0, TAU); g.stroke();
    // rune ticks
    g.globalAlpha = .95 * a; g.fillStyle = 'rgba(' + c + ',.95)';
    for (let i = 0; i < 8; i++) {
      const ang = i / 8 * TAU;
      const rx = Math.cos(ang) * R, ry = Math.sin(ang) * R * .38;
      g.save(); g.translate(rx, ry); g.rotate(ang);
      g.fillRect(-1.4, -3.4, 2.8, 6.8);
      g.restore();
    }
    g.restore(); g.globalAlpha = 1;
  }

  window.CRCHARS = {
    FT: FT,
    DECK_ORDER: DECK_ORDER,
    preloadPortraits: preloadPortraits,
    portraitsReady: portraitsReady,
    imgOf: imgOf,
    drawFTUnit: drawFTUnit,
    drawMagicCircle: drawMagicCircle,
    ftThumb: ftThumb,
    flameHead: flameHead
  };
})();
