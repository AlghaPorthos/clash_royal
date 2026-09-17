# ⚔️ Clash Royal(演示分支版本)

一个简化版的皇室战争(Clash Royale)风格游戏项目。

## 🎮 玩法设想

- 双人对战:你与对手各守一路,摧毁对方国王塔获胜
- 消耗圣水(⬆️ Elixir)在场上部署卡牌单位
- 单位自动前进、索敌、攻击,典型卡牌类型:
  - 🗡️ 近战单位(骑士、迷你皮卡)
  - 🏹 远程单位(弓箭手、火枪手)
  - 🧙 法术(火球、闪电)
  - 🏰 建筑(加农炮)

## 🛠️ 技术方案

| 项目 | 方案 |
|---|---|
| 实现 | HTML5 Canvas + 原生 JavaScript |
| 结构 | 单文件起步,后续按模块拆分 |
| 运行 | 浏览器直接打开,零依赖 |

## 🚀 运行

```bash
git clone https://github.com/AlghaPorthos/clash_royal.git
cd clash_royal
open index.html   # macOS;Windows 双击 index.html
```

## 📁 目录结构(计划)

```
clash_royal/
├── index.html   # 入口页面
├── game.js      # 游戏主逻辑
├── cards.js     # 卡牌与单位定义
└── README.md
```

## 🃏 卡池(固定 8 张)

| 卡牌 | 圣水 | 说明 |
|---|---|---|
| 💀 骷髅 | 2 | 三个小骷髅,海量输出 |
| 🗡️ 骑士 | 3 | 均衡近战 |
| 🏹 弓箭手 | 3 | 双人远程 |
| 🏰 加农炮 | 3 | 防守建筑,25 秒 |
| ⚔️ 迷你皮卡 | 4 | 高单体伤害 |
| 🔫 火枪手 | 4 | 长射程 |
| 🔥 火球 | 4 | 范围法术,可打塔 |
| 🗿 巨人 | 5 | 只打建筑 |

手牌 4 张循环制,圣水上限 10,最后 1 分钟双倍圣水,3 分钟一局。

## 🗺️ 开发路线

- [x] 场地渲染与圣水自动回复
- [x] 卡牌部署与单位基础 AI(移动/索敌/攻击)
- [x] 简单敌方 AI 出牌
- [x] 胜负判定与 UI
- [ ] 更多卡牌与平衡性调整

## 🤝 Contributing

1. Fork / clone the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes and open a pull request

## License

All rights reserved.

## Juvia Readme

Section added by @Juviamai via the **Juvia Readme** pull request.
