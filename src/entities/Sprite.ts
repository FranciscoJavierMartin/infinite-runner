import { DEBUG_MODE } from '@/constants';

interface SpriteOptions {
  imageSrc?: string;
  spriteWidth?: number;
  spriteHeight?: number;
  startX?: number;
  startY?: number;
  frameSpacing?: number;
  frameCount?: number;
  animationSpeed?: number;
}

export default class Sprite {
  private sprite: HTMLImageElement;
  private currentFrame: number = 0;
  private frameTimer: number = 0;
  private spriteWidth: number;
  private spriteHeight: number;
  private startX: number;
  private startY: number;
  private frameSpacing: number;
  private frameCount: number;
  private animationSpeed: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    {
      imageSrc = '',
      spriteWidth = width,
      spriteHeight = height,
      startX = 0,
      startY = 0,
      frameSpacing,
      frameCount = 1,
      animationSpeed = 3,
    }: SpriteOptions = {},
  ) {
    this.sprite = new Image();
    this.sprite.src = imageSrc;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.startX = startX;
    this.startY = startY;
    this.frameSpacing = frameSpacing || spriteWidth;
    this.frameCount = frameCount;
    this.animationSpeed = animationSpeed;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (DEBUG_MODE) {
      ctx.fillStyle = 'red';
      ctx.fillRect(
        this.x + 15 / 2,
        this.y + 15 / 2,
        this.spriteWidth - 15,
        this.spriteHeight - 15,
      );
    }

    ctx.drawImage(
      this.sprite,
      this.startX + this.currentFrame * this.frameSpacing,
      this.startY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  public updateAnimation(): void {
    this.frameTimer++;

    if (this.frameTimer >= this.animationSpeed) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
  }
}
