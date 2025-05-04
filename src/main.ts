import './style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public render(): void {
    this.ctx.fillStyle = '#0a0c21';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

window.onload = () => {
  const game = new Game();
  game.render();
};
