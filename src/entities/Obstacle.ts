import { OBSTACLE_SPRITE_HEIGHT, OBSTACLE_SPRITE_WIDTH } from '@/constants';
import Sprite from '@/entities/Sprite';
import srcMonster from '/monster.png';

export default class Obstacle extends Sprite {
  constructor(x: number, y: number) {
    super(x, y, OBSTACLE_SPRITE_WIDTH, OBSTACLE_SPRITE_HEIGHT, {
      imageSrc: srcMonster,
      spriteWidth: OBSTACLE_SPRITE_WIDTH,
      spriteHeight: OBSTACLE_SPRITE_HEIGHT,
      frameCount: 4,
      animationSpeed: 6,
    });
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.updateAnimation();
    super.draw(ctx);
  }
}
