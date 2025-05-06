export default class TextManager {
  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {}

  public drawGameOverScreen(): void {
    const titleY = this.canvas.height / 2;
    const centerText = this.canvas.width / 2;
    const spacing = this.getResponsiveFontSize(4);

    this.drawText('Game Over', centerText, titleY, 2);
    this.drawText(
      'Press space or touch to restart',
      centerText,
      titleY + spacing,
      1,
    );
  }

  public drawInitialScreen(): void {
    const titleY = this.canvas.height / 2;
    const centerText = this.canvas.width / 2;
    const spacing = this.getResponsiveFontSize(3);

    this.drawText('Press space or touch to play', centerText, titleY, 1.5);
    this.drawText(
      'Press space, click or scream to jump',
      centerText,
      titleY + spacing,
      1,
    );
  }

  public drawScore(score: number): void {
    const spacing = this.getResponsiveFontSize(4);

    this.drawText(
      `Score: ${score.toString().padStart(6, '0')}`,
      spacing,
      spacing,
      1,
      'left',
    );
  }

  public drawHighScore(highScore: number): void {
    const spacing = this.getResponsiveFontSize(4);

    this.drawText(
      `High score: ${highScore.toString().padStart(6, '0')}`,
      this.canvas.width - spacing,
      spacing,
      1,
      'right',
    );
  }

  private drawText(
    text: string,
    x: number,
    y: number,
    size: number = 3,
    align: CanvasTextAlign = 'center',
    color: string = '#ffffff',
  ): void {
    const fontSize = this.getResponsiveFontSize(size);

    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px "Press Start 2P"`;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
  }

  private getResponsiveFontSize(vmin: number): number {
    const maxDimension = Math.max(this.canvas.width, this.canvas.height);
    return Math.round((maxDimension * vmin) / 100);
  }
}
