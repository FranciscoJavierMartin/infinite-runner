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

    if (this.y + this.height < canvas.height) {
      this.dy += 1;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.height;
    }
  }

  public jump(): void {
    if (this.grounded) {
      this.dy = -20;
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
