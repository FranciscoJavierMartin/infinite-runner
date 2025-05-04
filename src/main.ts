import Player from '@/entities/Player';
import ObstacleManager from '@/managers/ObstableManager';
import '@/style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private obstacleManager: ObstacleManager;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(50, this.canvas.height - 50, 50, 50, '#f231a5');
    this.obstacleManager = new ObstacleManager(this.canvas, this.ctx);
  }

  public render(): void {
    this.ctx.fillStyle = '#0a0c21';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Elements
    this.player.draw(this.ctx);
    this.obstacleManager.draw();

    // Updates
    this.player.update(this.canvas);
    this.obstacleManager.update();
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
