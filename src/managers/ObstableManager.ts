import {
  INITIAL_GAME_SPEED,
  SPAWN_MAX_TIME,
  SPAWN_MIN_TIME,
} from '@/constants';
import Obstacle from '@/entities/Obstacle';
import Player from '@/entities/Player';

export default class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private nextSpawnTime: number = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {}

  public draw(): void {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(this.ctx);
    });
  }

  public update(deltatime: number, gameSpeed: number): void {
    this.nextSpawnTime -= deltatime;

    if (this.nextSpawnTime <= 0) {
      this.createObstacle();
      const speedFactor = INITIAL_GAME_SPEED / gameSpeed;

      this.nextSpawnTime =
        Math.floor(
          Math.random() * (SPAWN_MAX_TIME - SPAWN_MIN_TIME) + SPAWN_MIN_TIME,
        ) * speedFactor;
    }

    this.nextSpawnTime -= deltatime;

    this.obstacles.forEach((obstacle) => {
      obstacle.x -= gameSpeed;
    });

    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.x + obstacle.width > 0,
    );
  }

  public checkCollision(player: Player): boolean {
    return this.obstacles.some(
      (obstacle) =>
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y,
    );
  }

  public reset(): void {
    this.obstacles = [];
    this.nextSpawnTime = 0;
  }

  private createObstacle() {
    const y = Math.random() < 0.5 ? 70 : 140;
    const obstacle = new Obstacle(
      this.canvas.width,
      this.canvas.height - y,
      30,
      70,
      '#fff000',
    );
    this.obstacles.push(obstacle);
  }
}
