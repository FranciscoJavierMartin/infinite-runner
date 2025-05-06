import { BACKGROUND_LAYERS } from '@/constants';

interface BackgroundLayer {
  image: HTMLImageElement;
  speed: number;
  x: number;
  width: number;
  height: number;
}

export default class Background {
  private backgrounds: BackgroundLayer[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.backgrounds = BACKGROUND_LAYERS.map((image) => ({
      image: Object.assign(new Image(), { src: image.src }),
      speed: image.speed,
      x: 0,
      width: this.canvas.width,
      height: this.canvas.height,
    }));
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.backgrounds.forEach((bg) => {
      const x = Math.floor(bg.x);
      ctx.drawImage(bg.image, x, 0, bg.width, bg.height);
      ctx.drawImage(bg.image, x + bg.width, 0, bg.width, bg.height);
    });
  }

  public update(gameSpeed: number): void {
    this.backgrounds.forEach((bg) => {
      bg.x -= gameSpeed * bg.speed;

      if (bg.x <= -bg.width) {
        bg.x = 0;
      }
    });
  }
}
