# 微信小程序推币机（Cocos 2D）

## 功能
- 表情包主题推币机玩法（点击投币、推动前排、自动下滑）。
- 分数、硬币数量、Fever 条显示。
- 所有基础图片由脚本自动生成（Pillow）。

## 目录
- `assets/scripts/GameManager.ts`：核心玩法逻辑。
- `assets/scripts/EmojiCoin.ts`：随机表情硬币贴图。
- `tools/generate_assets.py`：生成全部 UI 与表情资源。

## 使用说明
1. 运行 `python3 tools/generate_assets.py` 生成资源。
2. 在 Cocos Creator 3.x 中导入项目。
3. 新建 2D 场景并按下列节点绑定：
   - `Canvas/GameRoot` 挂 `GameManager`
   - `board` 指向容器节点（放硬币）
   - `spawnPoint` 放在上方投币位置
   - `emojiCoinPrefab` 预制体挂 `EmojiCoin` + `Sprite`
   - `scoreLabel`、`coinLabel`、`feverBar` 对应 UI
4. 绑定两个按钮事件：
   - 投币按钮 -> `GameManager.onTapDrop`
   - 推动按钮 -> `GameManager.onTapPush`

## 微信小程序发布提示
- Cocos Creator 构建目标选择“微信小游戏”。
- 项目设置中开启资源压缩与图集自动合并。
- 表情资源建议后续做成自动图集以减少 DrawCall。
