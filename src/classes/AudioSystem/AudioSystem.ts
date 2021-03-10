export interface IAudio
{
  play(): void;
  pause(): void;
  stop(): void;
  setFilename(fileName: string): void;
}

export default class AudioSystem implements IAudio
{
  private sounds = new Array<HTMLAudioElement>();
  private fileName: string;
  private channels: number;
  private index = 0;
  
  constructor(fileName: string, channels = 4) 
  {
    this.channels = channels;
    this.setFilename(fileName);
  }

  private incrementIndex()
  {
    this.index = (this.index + 1) % this.channels;
  }

  setFilename(fileName: string) 
  { 
    this.fileName = fileName;
    for (let i = 0; i < this.channels; i++)
    {
      this.sounds.push(new Audio(this.fileName));
    }
  }

  play() 
  {
    this.sounds[this.index].play();
    this.incrementIndex();
  }

  pause() 
  {
    this.sounds[this.index].pause();
    this.incrementIndex();
  }

  stop() 
  {
    this.sounds[this.index].pause();
    this.sounds[this.index].currentTime = 0;
    this.incrementIndex();
  }
}
