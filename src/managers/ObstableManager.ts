import Obstacle from '@/entities/Obstacle';

export default class ObstacleManager {
  private obstacles: Obstacle[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.createObstacle();
  }

  public draw(): void {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(this.ctx);
    });
  }

  public update(): void {
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
