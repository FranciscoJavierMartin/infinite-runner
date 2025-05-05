export default class ScoreManager {
  private _score: number = 0;
  private _highScore: number = 0;

  constructor() {
    this.loadHighScore();
  }

  public get score(): number {
    return this._score;
  }

  public get highScore(): number {
    return this._highScore;
  }

  public reset(): void {
    this._score = 0;
  }

  public loadHighScore(): void {
    this._highScore = Number(localStorage.getItem('highScore')) || 0;
  }

  public update(deltatime: number): void {
    this._score += Math.floor(deltatime / (1000 / 60));
  }

  public updateHighScore(): void {
    if (this._score > this._highScore) {
      this._highScore = this.score;
      localStorage.setItem('highScore', this._highScore.toString());
    }
  }
}
