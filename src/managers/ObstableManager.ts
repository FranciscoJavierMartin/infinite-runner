import Obstacle from '@/entities/Obstacle';

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

  public update(deltatime: number): void {
    this.nextSpawnTime -= deltatime;

    if (this.nextSpawnTime <= 0) {
      this.createObstacle();
      this.nextSpawnTime = 1000;
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.update();
    });
  }

  private createObstacle() {
    const obstacle = new Obstacle(
      this.canvas.width,
      this.canvas.height - 70,
      30,
      70,
      '#fff000',
    );
    this.obstacles.push(obstacle);
  }
}
