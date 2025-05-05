import { GROUND_COLOR } from '@/constants';

export default class Ground {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = GROUND_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
