import { _decorator, Component, Node, Prefab, instantiate, Vec3, tween, UITransform, Label, ProgressBar, randomRangeInt, Color, Sprite, SpriteFrame, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node) board: Node | null = null;
  @property(Node) spawnPoint: Node | null = null;
  @property(Prefab) emojiCoinPrefab: Prefab | null = null;
  @property(Label) scoreLabel: Label | null = null;
  @property(Label) coinLabel: Label | null = null;
  @property(ProgressBar) feverBar: ProgressBar | null = null;

  private score = 0;
  private coins = 50;
  private fever = 0;
  private pushing = false;

  onLoad() {
    this.updateHud();
  }

  start() {
    this.schedule(() => this.autoSlide(), 1.2);
  }

  onTapDrop() {
    if (this.pushing || this.coins <= 0 || !this.emojiCoinPrefab || !this.board || !this.spawnPoint) return;

    this.coins -= 1;
    this.fever = Math.min(1, this.fever + 0.06);
    this.updateHud();

    const coin = instantiate(this.emojiCoinPrefab);
    coin.setParent(this.board);
    coin.setPosition(this.spawnPoint.position.clone().add3f(randomRangeInt(-140, 140), 0, 0));

    const targetY = randomRangeInt(-200, 120);
    tween(coin)
      .to(0.42, { position: new Vec3(coin.position.x + randomRangeInt(-20, 20), targetY, 0) })
      .call(() => {
        this.resolveCoin(coin);
      })
      .start();
  }

  onTapPush() {
    if (this.pushing || !this.board) return;
    this.pushing = true;

    const pushForce = 80 + Math.floor(this.fever * 120);
    const children = [...this.board.children];

    children.forEach((n, idx) => {
      const shift = randomRangeInt(-24, 24);
      tween(n)
        .delay(idx * 0.008)
        .to(0.16, { position: new Vec3(n.position.x + shift, n.position.y - pushForce, 0) })
        .call(() => this.resolveCoin(n))
        .start();
    });

    tween(this)
      .delay(0.22)
      .call(() => {
        this.fever = Math.max(0, this.fever - 0.18);
        this.pushing = false;
        this.updateHud();
      })
      .start();
  }

  private autoSlide() {
    if (!this.board) return;
    this.board.children.forEach((n) => {
      tween(n).to(0.8, { position: new Vec3(n.position.x + randomRangeInt(-8, 8), n.position.y - 22, 0) }).start();
    });
  }

  private resolveCoin(coin: Node) {
    const y = coin.position.y;
    if (y < -360) {
      const reward = randomRangeInt(1, 5);
      this.score += reward * 10;
      this.coins += randomRangeInt(0, 2);
      this.updateHud();
      coin.destroy();
    }
  }

  private updateHud() {
    if (this.scoreLabel) this.scoreLabel.string = `分数 ${this.score}`;
    if (this.coinLabel) this.coinLabel.string = `硬币 ${this.coins}`;
    if (this.feverBar) this.feverBar.progress = this.fever;
  }
}
