import { GROUND_COLOR, GROUND_TILE_SIZE } from '@/constants';
import srcGround from '/ground.png';

export default class Ground {
  private sprite: HTMLImageElement;

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {
    this.sprite = new Image();
    this.sprite.src = srcGround;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const tilesX = Math.ceil(this.width / GROUND_TILE_SIZE);

    ctx.fillStyle = GROUND_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    for (let i = 0; i < 2; i++) {
      const offsetX = this.x + i * this.width;

      ctx.fillStyle = GROUND_COLOR;
      ctx.fillRect(offsetX, this.y, this.width, this.height);

      for (let j = 0; j < tilesX; j++) {
        ctx.drawImage(
          this.sprite,
          this.x + j * GROUND_TILE_SIZE,
          this.y,
          GROUND_TILE_SIZE,
          GROUND_TILE_SIZE,
        );
      }
    }
  }

  public update(gameSpeed: number): void {
    this.x -= gameSpeed;

    if (this.x <= -this.width) {
      this.x = 0;
    }
  }
}
