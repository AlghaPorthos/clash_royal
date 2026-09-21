/* ============================================================
 * Clash Royal · Fairy Tail Edition — Guidance content builder
 * Generates the "How to Play" sections from the shared i18n
 * dictionary + character data. Used by guidance.html (full page)
 * and by the in-game guidance modal in game.html, so the two
 * never drift apart.
 * ============================================================ */
(function () {
  'use strict';
  const T = function (k) { return window.CRI18N.t(k); };

  /* Elixir costs mirror game.html CARDS — one lookup so the
     guidance deck never shows wrong costs. */
  const COSTS = { knight: 3, archers: 3, giant: 5, minipekka: 4, musketeer: 4, skeletons: 2, cannon: 3, fireball: 4 };

  function deckGrid() {
    const FT = window.CRCHARS.FT, thumb = window.CRCHARS.ftThumb;
    const lang = window.CRI18N.lang();
    return '<div class="gdeck">' + window.CRCHARS.DECK_ORDER.map(function (k) {
      const d = FT[k];
      return '<div class="gcard">' +
        '<span class="gcost">💧' + COSTS[k] + '</span>' +
        '<img src="' + thumb(k, 72) + '" alt="' + d.name[lang] + '">' +
        '<b>' + d.name[lang] + '</b>' +
        '<i>' + d.spell[lang] + '</i>' +
        '<small>' + d.role[lang] + '</small>' +
        '</div>';
    }).join('') + '</div>';
  }

  function sec(titleKey, bodyHTML) {
    return '<section class="gsec"><h3>' + T(titleKey) + '</h3>' + bodyHTML + '</section>';
  }
  function paras(key) {
    return T(key).map(function (p) { return '<p>' + p + '</p>'; }).join('');
  }
  function list(key) {
    return '<ul>' + T(key).map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
  }

  function buildGuidanceHTML() {
    return [
      sec('gS1h', paras('gS1p')),
      sec('gS2h', paras('gS2p')),
      sec('gS3h', paras('gS3p') + deckGrid()),
      sec('gS4h', paras('gS4p')),
      sec('gS5h', list('gS5l')),
      sec('gS6h', list('gS6l')),
      sec('gS7h', list('gS7l')),
      sec('gS8h', list('gS8l'))
    ].join('');
  }

  window.CRGUID = { build: buildGuidanceHTML };
})();
