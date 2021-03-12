export interface IAudio
{
  play(): void;
  stop(): void;
}

export default class AudioSystem implements IAudio
{
  private sounds = new Array<HTMLAudioElement>();
  private channels: number;
  private index = 0;

  constructor(fileName: string, channels = 4) 
  {
    this.channels = channels;

    for (let i = 0; i < this.channels; i++)
    {
      this.sounds.push(new Audio(fileName));
    }
  }

  play() 
  {
    this.sounds[this.index].play();
    this.index = (this.index + 1) % this.channels;
  }

  stop()
  {
    for (const item of this.sounds)
    {
      item.pause();
      item.currentTime = 0;
    }
  }
}
