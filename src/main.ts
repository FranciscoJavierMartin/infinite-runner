import Player from '@/entities/Player';
import Ground from '@/entities/Ground';
import Background from '@/entities/Background';
import ObstacleManager from '@/managers/ObstableManager';
import TextManager from '@/managers/TextManager';
import ScoreManager from '@/managers/ScoreManager';
import AudioManager from '@/managers/AudioManager';
import {
  GROUND_HEIGHT,
  INITIAL_GAME_SPEED,
  PLAYER_SPRITE_SIZE,
} from '@/constants';
import '@/style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private ground: Ground;
  private background: Background;
  private obstacleManager: ObstacleManager;
  private textManagaer: TextManager;
  private scoreManager: ScoreManager;
  private audioManager: AudioManager;
  private lastTimestamp: number = 0;
  private gameSpeed: number = INITIAL_GAME_SPEED;
  private isGameOver: boolean = false;
  private isPlaying: boolean = false;

  constructor() {
    this.initializeGame();
    this.setupCanvas();
    this.setupControls();
  }

  private initializeGame(): void {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.background = new Background(this.canvas);
    this.ground = new Ground(
      0,
      this.canvas.height - GROUND_HEIGHT,
      this.canvas.width,
      GROUND_HEIGHT,
    );
    this.player = new Player(
      50,
      this.canvas.height - GROUND_HEIGHT - PLAYER_SPRITE_SIZE,
    );
    this.obstacleManager = new ObstacleManager(this.canvas, this.ctx);
    this.textManagaer = new TextManager(this.canvas, this.ctx);
    this.scoreManager = new ScoreManager();
    this.audioManager = new AudioManager();

    this.setupControls();
  }

  public render(timestamp: number): void {
    const deltatime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.ctx.fillStyle = '#0a0c21';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Elements
    this.background.draw(this.ctx);
    this.ground.draw(this.ctx);
    this.player.draw(this.ctx);
    this.obstacleManager.draw();

    this.textManagaer.drawScore(this.scoreManager.score);
    this.textManagaer.drawHighScore(this.scoreManager.highScore);

    if (!this.isPlaying) {
      this.textManagaer.drawInitialScreen();
    }

    // Updates
    if (this.isPlaying && !this.isGameOver) {
      this.updatePlayer();
      this.ground.update(this.gameSpeed);
      this.background.update(this.gameSpeed);
      this.obstacleManager.update(deltatime, this.gameSpeed);
      this.scoreManager.update(deltatime);
      this.gameSpeed += 0.3 * (deltatime / 1000);

      if (this.obstacleManager.checkCollision(this.player)) {
        this.isGameOver = true;
      }
    }

    if (this.isGameOver) {
      this.textManagaer.drawGameOverScreen();
      this.scoreManager.updateHighScore();
    }
  }

  private setupControls(): void {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.handleGameAction();
      }
    });

    window.addEventListener('touchstart', () => {
      this.handleGameAction();
    });
  }

  private handleGameAction(): void {
    this.initializeAudio();

    if (!this.isPlaying && !this.isGameOver) {
      this.isPlaying = true;
    } else if (this.isGameOver) {
      this.resetGame();
    }
  }

  private resetGame(): void {
    this.isGameOver = false;
    this.isPlaying = true;
    this.gameSpeed = INITIAL_GAME_SPEED;
    this.obstacleManager.reset();
    this.player.reset(50, this.canvas.height - 50);
  }

  private async initializeAudio(): Promise<void> {
    try {
      await this.audioManager.initialize();
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  private updatePlayer(): void {
    if (this.audioManager.initialized) {
      const jumpHeight = this.audioManager.getJumpHeight();
      this.player.jump(jumpHeight);
    }

    this.player.update(this.canvas);
  }

  private setupCanvas(): void {
    let resizeTimeout: NodeJS.Timeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.initializeGame();
      }, 100);
    });
  }
}

window.onload = () => {
  const game = new Game();

  function gameLoop(timestamp: number) {
    game.render(timestamp);
    requestAnimationFrame(gameLoop);
  }

  gameLoop(0);
};
