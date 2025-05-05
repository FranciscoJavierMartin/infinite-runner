interface AudioContextWindow extends Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

declare const window: AudioContextWindow;

export default class AudioManager {
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private data: Uint8Array;
  private _initialized: boolean = false;

  constructor() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error('AudioContext is not supported in this browser.');
    }

    this.audioCtx = new AudioContextClass();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.8;
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
  }

  public get initialized(): boolean {
    return this._initialized;
  }

  public async initialize(): Promise<void> {
    try {
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const source = this.audioCtx.createMediaStreamSource(stream);
      source.connect(this.analyser);
      this._initialized = true;
    } catch (error) {
      console.log('Microphone setup failed', error);
    }
  }

  public getJumpHeight(): number {
    let jumpHeight: number;

    if (this.initialized) {
      this.analyser.getByteFrequencyData(this.data);

      const volume =
        Math.min(
          1,
          this.data.reduce((acc, value) => acc + value, 0) /
            (this.data.length * 128),
        ) * 5;
      const baseJumpHeight = -15;
      const volumeMultiplier = 10;

      jumpHeight =
        volume < 0.2 ? 0 : baseJumpHeight - volume * volumeMultiplier;
    } else {
      jumpHeight = 0;
    }

    return jumpHeight;
  }
}
