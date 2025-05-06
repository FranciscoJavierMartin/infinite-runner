import { GROUND_HEIGHT, PLAYER_SPRITE_SIZE } from '@/constants';
import Sprite from '@/entities/Sprite';
import playerSprite from '/player.png';

export default class Player extends Sprite {
  private dy: number = 0;
  private grounded: boolean = true;

  constructor(x: number, y: number) {
    super(x, y, PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE, {
      imageSrc: playerSprite,
      spriteWidth: PLAYER_SPRITE_SIZE,
      spriteHeight: PLAYER_SPRITE_SIZE,
      frameSpacing: 192,
      frameCount: 16,
    });

    this.setupControls();
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

    super.updateAnimation();
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

    window.addEventListener('touchstart', () => {
      this.jump();
    });
  }
}
