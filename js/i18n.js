/* ============================================================
 * Clash Royal · Fairy Tail Edition — i18n
 * Shared translation dictionary for index.html / game.html / guidance.html
 * Default language: English. Secondary: Simplified Chinese.
 * Preference persisted in localStorage key "cr_lang" (same key the
 * original game used, so returning players keep their choice).
 * ============================================================ */
(function () {
  'use strict';

  const I18N = {
    /* ---------------- ENGLISH (default) ---------------- */
    en: {
      _name: 'English',
      /* ---- poster / landing ---- */
      kicker: 'FAIRY TAIL EDITION',
      title: 'CLASH ROYAL',
      tagline: 'Water & Ice lead an 8-card Fairy Tail deck · Real-time battle vs AI',
      play: 'START',
      teamYou: 'YOUR TEAM',
      teamRival: 'RIVAL TEAM',
      cardsBtn: 'CARDS',
      howBtn: 'GUIDANCE',
      langBtn: '中文',
      meta: '⏱ 3-minute matches · 💧 Elixir system · 🌉 Two lanes & bridges · Zero dependencies, play in your browser',
      poolTitle: '🃏 Fairy Tail Deck · 8 Cards',
      poolSub: 'Cycle a 4-card hand — every card shows its cost, role and signature magic',
      howTitle: '🎮 Quick Start',
      howSub: 'Tap a card → tap your half to deploy. Destroy the enemy King Tower to win!',
      featTitle: '✨ Features',
      featSub: 'Vanilla JavaScript + Canvas · Fairy Tail cast · No frameworks, no install',
      ctaP: 'Free · No install · Play instantly',
      madeWith: 'Made with Canvas and ❤️',
      guidanceHome: 'HOME',
      battleNow: 'BATTLE NOW',
      backHome: '← HOME',
      /* ---- game screen ---- */
      gameTitle: 'Clash Royal · Fairy Tail Arena',
      you: 'YOU',
      ai: 'AI',
      hint: 'Tap a card, then tap your half to deploy!',
      battleStart: 'Battle start!',
      newRound: 'New round!',
      noElixir: 'Not enough elixir!',
      ownHalf: 'Deploy on your half only!',
      elixirX2: '💧 Elixir ×2!',
      next: 'NEXT',
      tapStart: '⚔️ Tap the arena to start',
      victory: '🎉 VICTORY!',
      defeat: '💀 DEFEAT!',
      draw: '🤝 DRAW!',
      tapRestart: 'Tap the arena for another round',
      winMsg: '🎉 You win! Tap the arena for another round',
      loseMsg: '💀 The AI won! Tap the arena for another round',
      drawMsg: '🤝 Draw! Tap the arena for another round',
      loading: 'LOADING',
      tapSkip: 'SKIP',
      guidanceBtn: 'Guidance',
      closeBtn: 'CLOSE',
      pausedNote: 'Battle paused while you read',
      /* ---- navigation / end screens ---- */
      homeBtn: 'HOME',
      restart: 'RESTART',
      playAgain: 'PLAY AGAIN',
      backToGame: 'BACK TO GAME',
      /* ---- battlefield themes ---- */
      themeTitle: '⚔️ Battlefield Theme',
      changeBf: 'BATTLEFIELD',
      themeSummer: 'Summer',
      themeAutumn: 'Autumn',
      themeWinter: 'Winter',
      themeSpring: 'Spring',
      dSummer: 'Lush grass, butterflies, warm sunshine',
      dAutumn: 'Golden woods and drifting leaves',
      dWinter: 'Snowfall, frost and a frozen river',
      dSpring: 'Fresh blossoms and falling petals',
      /* ---- feedback box ---- */
      feedbackBtn: 'FEEDBACK',
      fbTitle: 'Player Feedback',
      fbPlaceholder: 'Tell us what you think about the game…',
      fbSend: 'SEND',
      fbListTitle: 'Saved feedback',
      fbEmpty: 'No feedback yet — be the first to write one!',
      fbThanks: 'Thank you for your feedback! 💖',
      fbDelete: 'Delete',
      fbNote: 'Feedback is saved in this browser.',
      fbMLove: 'Love it', fbMGood: 'Good', fbMMeh: 'Okay', fbMSad: 'Needs work',
      fbJustNow: 'just now', fbMinAgo: '{n} min ago', fbHourAgo: '{n} h ago', fbDayAgo: '{n} d ago',
      /* ---- tooltips ---- */
      ttHp: 'HP',
      ttDmg: 'Damage',
      ttAtk: 'Attack speed',
      ttRng: 'Range',
      ttSpd: 'Move speed',
      melee: 'Melee',
      ranged: 'Ranged',
      field: 'Full field',
      fixed: 'Stationary',
      slow: 'Slow',
      med: 'Medium',
      fast: 'Fast',
      perHit: 's / hit',
      sp_giant: 'Only attacks towers & buildings — never fights troops',
      sp_skeletons: 'Deploys 3 flying cats at once',
      sp_archers: 'Deploys 2 celestial mages at once',
      sp_cannon: 'Defensive ward — decays and vanishes after 25 seconds',
      sp_fireball: 'Area damage — only 40% damage to towers',
      sp_minipekka: 'Extreme single-target burst damage',
      /* ---- loading tips (rotating tutorial) ---- */
      tips: [
        { ic: '🎴', t: 'Deploy the right mage at the right time.' },
        { ic: '🌉', t: 'Hold the bridges — troops cross only there.' },
        { ic: '💧', t: 'Save elixir; never let it overflow.' },
        { ic: '👑', t: 'Destroy the King Tower to win instantly.' },
        { ic: '🧊', t: 'Gray holds the line, Juvia snipes, Erza strikes.' }
      ],
      /* ---- quick steps (landing) ---- */
      steps: [
        { n: 'STEP 1', b: '💧 Save Elixir', p: 'Elixir regenerates 1 point every 2.8s up to 10; cards light up from grey to colour as it fills. The last minute doubles the rate!' },
        { n: 'STEP 2', b: '🃏 Play Cards', p: 'Your 4-card hand cycles as you play, with a preview of the next card. Troops deploy on your half only — Fire Dragon\'s Roar goes anywhere.' },
        { n: 'STEP 3', b: '⚔️ Battle', p: 'Units pick the nearest bridge, seek targets and attack by themselves — water bolts, rune orbs, sword slashes and damage numbers are all visible.' },
        { n: 'STEP 4', b: '👑 Win Crowns', p: 'Destroy the King Tower to win instantly; otherwise most crowns (then tower HP) wins.' }
      ],
      feats: [
        { ic: '🧠', p: 'A smart AI: defends against pushes, sinks Makarov at the back, pressures bridges and roars on swarms' },
        { ic: '🌉', p: 'Two lanes + river terrain: units pick the nearest bridge; losing a Princess Tower enrages the King Tower' },
        { ic: '🎆', p: 'Fully visual combat: water bolts, rune orbs, melee slashes, hit flashes, spawn bursts and explosion particles' },
        { ic: '📱', p: 'Responsive layout — playable on phones, tablets and desktops, tap to deploy' }
      ],
      /* ---- guidance page / modal ---- */
      gTitle: 'How to Play',
      gSub: 'Everything a new mage needs before the first duel',
      gS1h: '🎯 Objective',
      gS1p: [
        'Destroy the enemy King Tower to win instantly. If the 3-minute timer runs out, the side with more crowns 👑 wins; if crowns are tied, the side with more remaining tower HP wins.',
        'Every tower you destroy earns a crown. Beware: destroying a Princess Tower enrages the enemy King Tower — it shoots further and harder!'
      ],
      gS2h: '▶ Starting a Battle',
      gS2p: [
        'From the home poster press BATTLE. A short loading screen with rotating beginner tips plays, then the arena appears — tap the arena once to begin the match.',
        'When a match ends, tap the arena again to start a new round instantly.'
      ],
      gS3h: '🃏 Your Deck · 8 Cards',
      gS3p: [
        'Your deck is led by Gray Fullbuster and Juvia Lockser. You hold 4 cards at a time; playing one draws the next into your hand.',
        'Hover a card (desktop) to see its HP, damage, attack speed and range. Cards turn grey while you cannot afford them.'
      ],
      gS4h: '🧠 The Enemy AI',
      gS4p: [
        'Your opponent plays the same 8 cards. It drops defenders when you push, places Mirajane\'s ward in front of its King Tower, saves Makarov at the back for a big push, and casts Fire Dragon\'s Roar on grouped units. Don\'t clump your troops!'
      ],
      gS5h: '⚔️ How Combat Works',
      gS5l: [
        '💧 Elixir regenerates 1 point every 2.8s (max 10) and doubles in the last minute.',
        '🏔 Troops deploy on YOUR half only; spells can be cast anywhere.',
        '🌉 Ground units cross the river only at the two bridges — control them.',
        '🎯 Units find targets automatically: melee brawls up close, ranged shoots from afar, buildings hold position.',
        '🗿 Makarov only attacks towers and buildings; he ignores troops.',
        '✨ Mirajane\'s ward slowly decays and vanishes after 25 seconds.'
      ],
      gS6h: '🎮 Controls & Buttons',
      gS6l: [
        '👆 Tap a card to select it (it rises and glows), then tap your half of the arena to deploy. Tap the card again to cancel.',
        '🔵 While a card is selected, a blue highlight shows your deploy zone.',
        '🌐 The globe button switches English / 中文 at any time, on every screen.',
        '❓ The Guidance button opens these instructions during a battle — the battle pauses while you read.'
      ],
      gS7h: '👑 Winning & Losing',
      gS7l: [
        '✅ Win: destroy the enemy King Tower, or lead in crowns / tower HP when time runs out.',
        '❌ Lose: your King Tower falls, or you trail at the timeout.',
        '🤝 Draw: identical crowns and tower HP.'
      ],
      gS8h: '💡 Quick Tips',
      gS8l: [
        'Don\'t let elixir overflow — keep it close to the 10 cap.',
        'Defend first, then counter-push with the survivors.',
        'Spread the Happy swarm so one Fire Dragon\'s Roar can\'t catch them all.',
        'Erza deletes tanks — save her for Makarov.'
      ]
    },

    /* ---------------- 简体中文 ---------------- */
    zh: {
      _name: '中文',
      kicker: '妖精的尾巴版',
      title: 'CLASH ROYAL',
      tagline: '水与冰领衔的妖精的尾巴卡组 · 8 张卡牌 · 与 AI 实时对战',
      play: '开始游戏',
      teamYou: '你的队伍',
      teamRival: '敌方队伍',
      cardsBtn: '卡牌图鉴',
      howBtn: '游戏指南',
      langBtn: 'English',
      meta: '⏱ 3 分钟一局 · 💧 圣水机制 · 🌉 双路过桥 · 零依赖,浏览器即开即玩',
      poolTitle: '🃏 妖精的尾巴卡组 · 8 张',
      poolSub: '4 张手牌循环出牌,每张卡牌都标注了费用、定位与招牌魔法',
      howTitle: '🎮 快速上手',
      howSub: '点击卡牌 → 点击自己半场部署,摧毁敌方国王塔获胜!',
      featTitle: '✨ 特色',
      featSub: '纯原生 JavaScript + Canvas · 妖精的尾巴全员 · 无框架零依赖',
      ctaP: '免费 · 无需安装 · 打开即玩',
      madeWith: '用 Canvas 与 ❤️ 制作',
      guidanceHome: '主页',
      battleNow: '立即开战',
      backHome: '← 返回主页',
      /* ---- 对战页 ---- */
      gameTitle: '皇室战争 · 妖精的尾巴竞技场',
      you: '你',
      ai: 'AI',
      hint: '点击卡牌,再点击自己下半场部署!',
      battleStart: '战斗开始!',
      newRound: '新一轮开始!',
      noElixir: '圣水不足!',
      ownHalf: '只能部署在自己半场!',
      elixirX2: '💧 圣水×2!',
      next: '下一张',
      tapStart: '⚔️ 点击开始对战 AI',
      victory: '🎉 胜利!',
      defeat: '💀 战败!',
      draw: '🤝 平局!',
      tapRestart: '点击场地再来一局',
      winMsg: '🎉 你赢了!点击场地再来一局',
      loseMsg: '💀 AI 赢了!点击场地再来一局',
      drawMsg: '🤝 平局!点击场地再来一局',
      loading: '加载中',
      tapSkip: '跳过',
      guidanceBtn: '指南',
      closeBtn: '关闭',
      pausedNote: '阅读期间战斗暂停',
      /* ---- 导航 / 结算 ---- */
      homeBtn: '主页',
      restart: '重新开始',
      playAgain: '再来一局',
      backToGame: '返回游戏',
      /* ---- 战场主题 ---- */
      themeTitle: '⚔️ 战场主题',
      changeBf: '更换战场',
      themeSummer: '夏季',
      themeAutumn: '秋季',
      themeWinter: '冬季',
      themeSpring: '春季',
      dSummer: '青翠草地、蝴蝶与暖阳',
      dAutumn: '金色林地与纷飞落叶',
      dWinter: '细雪、寒霜与结冻的河面',
      dSpring: '鲜花初绽,落英缤纷',
      /* ---- 玩家反馈 ---- */
      feedbackBtn: '玩家反馈',
      fbTitle: '玩家反馈',
      fbPlaceholder: '说说你对游戏的看法…',
      fbSend: '发送',
      fbListTitle: '已保存的反馈',
      fbEmpty: '还没有反馈——来写下第一条吧!',
      fbThanks: '感谢你的反馈!💖',
      fbDelete: '删除',
      fbNote: '反馈保存在本浏览器中。',
      fbMLove: '超爱', fbMGood: '不错', fbMMeh: '一般', fbMSad: '待改进',
      fbJustNow: '刚刚', fbMinAgo: '{n} 分钟前', fbHourAgo: '{n} 小时前', fbDayAgo: '{n} 天前',
      /* ---- 悬浮提示 ---- */
      ttHp: '血量',
      ttDmg: '伤害',
      ttAtk: '攻击速度',
      ttRng: '射程',
      ttSpd: '移动速度',
      melee: '近战',
      ranged: '远程',
      field: '全场',
      fixed: '固定',
      slow: '慢速',
      med: '中速',
      fast: '快速',
      perHit: ' 秒/次',
      sp_giant: '只攻击建筑与塔,不会打小兵',
      sp_skeletons: '一次派出 3 只飞行小猫',
      sp_archers: '一次派出 2 名星灵魔导士',
      sp_cannon: '防守结界,持续掉血,25 秒后消失',
      sp_fireball: '范围伤害,对塔只造成 40% 伤害',
      sp_minipekka: '单体爆发伤害极高',
      /* ---- 加载页轮播提示 ---- */
      tips: [
        { ic: '🎴', t: '在正确的时机,派出正确的魔导士。' },
        { ic: '🌉', t: '守住桥头——部队只能从桥上过河。' },
        { ic: '💧', t: '攒好圣水,别让它溢出。' },
        { ic: '👑', t: '摧毁国王塔,立即获胜。' },
        { ic: '🧊', t: '格雷抗线,朱毕安狙杀,艾露莎爆发。' }
      ],
      /* ---- 快速上手 ---- */
      steps: [
        { n: '第 1 步', b: '💧 攒圣水', p: '圣水每 2.8 秒回 1 点,上限 10;卡牌会随圣水从黑白点亮为彩色,底部进度条一目了然。最后一分钟圣水双倍!' },
        { n: '第 2 步', b: '🃏 出牌', p: '4 张手牌循环,出一张补一张,还能预览下一张。部队只能部署在自己半场,火龙的咆哮全场可放。' },
        { n: '第 3 步', b: '⚔️ 对战', p: '单位自动寻路过桥、索敌、攻击;水流弹、符文弹、剑光全部可见,伤害数字实时飘出。' },
        { n: '第 4 步', b: '👑 夺冠', p: '3 分钟内摧毁国王塔直接获胜;超时比皇冠数、再比塔血。' }
      ],
      feats: [
        { ic: '🧠', p: '会防守也会进攻的 AI:检测威胁下场防守,马卡罗夫沉底、桥头压进,单位扎堆时火龙咆哮' },
        { ic: '🌉', p: '双路 + 河道地形:单位自动选择最近的桥过河,公主塔被毁后王塔激怒' },
        { ic: '🎆', p: '全可视化战斗:水流曳光、符文炮弹、近战刀光、受击闪白、登场爆闪与爆炸粒子' },
        { ic: '📱', p: '自适应布局,手机 / 平板 / 桌面都能玩,点击即部署' }
      ],
      /* ---- 指南页 ---- */
      gTitle: '游戏指南',
      gSub: '新手魔导士开战前需要知道的一切',
      gS1h: '🎯 游戏目标',
      gS1p: [
        '摧毁敌方国王塔立即获胜。若 3 分钟倒计时结束,皇冠数多的一方获胜;皇冠相同则比较剩余塔的总血量。',
        '每摧毁一座塔获得一顶皇冠。注意:公主塔被毁后,敌方国王塔会被激怒——射程更远、伤害更高!'
      ],
      gS2h: '▶ 开始对战',
      gS2p: [
        '在主页海报点击【开始对战】,经过一段轮播新手提示的加载页后进入战场——点击一次场地即可开战。',
        '一局结束后,再次点击场地即可立刻开始新一轮。'
      ],
      gS3h: '🃏 你的卡组 · 8 张',
      gS3p: [
        '卡组由格雷·佛尔巴斯特与朱毕安·罗克赛领衔。手牌 4 张循环,出一张补一张。',
        '(电脑端)悬浮卡牌可查看血量、伤害、攻速与射程;圣水不足时卡牌会变灰。'
      ],
      gS4h: '🧠 敌方 AI',
      gS4p: [
        '对手使用同样的 8 张卡牌:你推进时它会下场防守、在王塔前放下米拉杰的结界、把马卡罗夫沉底存进攻,还会对扎堆单位释放火龙的咆哮。别把部队挤成一团!'
      ],
      gS5h: '⚔️ 战斗机制',
      gS5l: [
        '💧 圣水每 2.8 秒回 1 点(上限 10),最后一分钟双倍回复。',
        '🏔 部队只能部署在自己半场;法术可全场释放。',
        '🌉 地面单位只能从两座桥过河——抢住桥头。',
        '🎯 单位自动索敌:近战贴身肉搏,远程后排输出,建筑原地驻守。',
        '🗿 马卡罗夫只攻击塔与建筑,不理会小兵。',
        '✨ 米拉杰的结界持续掉血,25 秒后消失。'
      ],
      gS6h: '🎮 操作与按钮',
      gS6l: [
        '👆 点击卡牌选中(升起并发光),再点击自己半场部署;再次点击卡牌取消选择。',
        '🔵 选中卡牌时,蓝色高亮会显示可部署区域。',
        '🌐 地球按钮可随时在任意页面切换 中文 / English。',
        '❓ 对战中的【指南】按钮随时打开本说明,阅读时战斗自动暂停。'
      ],
      gS7h: '👑 胜负判定',
      gS7l: [
        '✅ 获胜:摧毁敌方国王塔,或超时时皇冠 / 塔血领先。',
        '❌ 失败:己方国王塔被毁,或超时落后。',
        '🤝 平局:皇冠与塔血完全相同。'
      ],
      gS8h: '💡 小贴士',
      gS8l: [
        '别让圣水溢出——尽量保持在 10 附近。',
        '先防守,再用残兵反打。',
        '分散放置小猫,避免一发火龙的咆哮全收。',
        '艾露莎克制肉盾——留着她对付马卡罗夫。'
      ]
    }
  };

  let lang = localStorage.getItem('cr_lang');
  if (lang !== 'zh' && lang !== 'en') lang = 'en'; // English is the default

  function crT(key) {
    const d = I18N[lang];
    return (d && d[key] !== undefined) ? d[key] : (I18N.en[key] !== undefined ? I18N.en[key] : key);
  }
  function crLang() { return lang; }
  function crOther() { return lang === 'en' ? 'zh' : 'en'; }
  function crSetLang(l) {
    if (l !== 'en' && l !== 'zh') return;
    lang = l;
    try { localStorage.setItem('cr_lang', l); } catch (e) { /* private mode */ }
    crApply();
    window.dispatchEvent(new CustomEvent('crlang', { detail: { lang: l } }));
  }
  function crToggle() { crSetLang(crOther()); }
  /* Replace textContent of every [data-i18n] element, then notify the page. */
  function crApply(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (e) {
      e.textContent = crT(e.getAttribute('data-i18n'));
    });
    document.documentElement.lang = lang;
  }

  window.CRI18N = { dict: I18N, t: crT, lang: crLang, setLang: crSetLang, toggle: crToggle, apply: crApply };
})();
