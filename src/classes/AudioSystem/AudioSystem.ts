export default class AudioSystem
{  
  private sounds = new Array<HTMLAudioElement>();
  private filename: string;
  private channels: number;
  private index = 0;
  
  constructor (filename: string, channels = 4) 
  {
    this.channels = channels;
    this.setFilename(filename);
  }

  incrementIndex()
  {
    this.index = (this.index + 1) % this.channels;
  }

  setFilename(filename: string) 
  { 
    this.filename = filename;
    for (let i = 0; i < this.channels; i++)
    {
      this.sounds.push(new Audio(this.filename));
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
