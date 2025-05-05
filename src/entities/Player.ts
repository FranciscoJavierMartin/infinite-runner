import { GROUND_HEIGHT } from '@/constants';

export default class Player {
  private dy: number = 0;
  private grounded: boolean = true;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    this.setupControls();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public update(canvas: HTMLCanvasElement): void {
    this.y += this.dy;
    const groundY = canvas.height - GROUND_HEIGHT;

    if (this.y + this.height < groundY) {
      this.dy += 1;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = groundY - this.height;
    }
  }

  public jump(jumpHeight: number = -20): void {
    if (jumpHeight < -15) {
      if (this.grounded) {
        this.dy = jumpHeight;
      }
    }
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.dy = 0;
    this.grounded = true;
  }

  private setupControls(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.jump();
      }
    });
  }
}
