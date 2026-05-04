import { _decorator, Component, Sprite, SpriteFrame, resources, randomRangeInt } from 'cc';
const { ccclass } = _decorator;

@ccclass('EmojiCoin')
export class EmojiCoin extends Component {
  start() {
    const id = randomRangeInt(1, 6);
    resources.load(`images/emoji_${id}/spriteFrame`, SpriteFrame, (err, sf) => {
      if (err) return;
      const sp = this.getComponent(Sprite);
      if (!sp) return;
      sp.spriteFrame = sf;
    });
  }
}
