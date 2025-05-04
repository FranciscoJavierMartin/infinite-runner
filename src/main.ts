import Player from '@/entities/Player';
import Obstacle from '@/entities/Obstacle';
import '@/style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private obstacle: Obstacle;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(50, this.canvas.height - 50, 50, 50, '#f231a5');
    this.obstacle = new Obstacle(
      this.canvas.width,
      this.canvas.height - 70,
      30,
      70,
      '#fff000',
    );
  }

  public render(): void {
    this.ctx.fillStyle = '#0a0c21';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Elements
    this.player.draw(this.ctx);
    this.obstacle.draw(this.ctx);

    // Updates
    this.player.update(this.canvas);
    this.obstacle.update();
  }
}

window.onload = () => {
  const game = new Game();

  function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
};
