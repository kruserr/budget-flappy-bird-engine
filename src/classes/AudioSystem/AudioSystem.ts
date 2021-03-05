export default class AudioSystem
{  
  private sound: HTMLAudioElement;
  private filename: string;
  
  constructor (filename: string) 
  {
    this.setFilename(filename);
  }

  setFilename(filename: string) 
  { 
    this.filename = filename;
    this.sound = new Audio(this.filename);
  }

  play() 
  {
    this.sound.play();
  }

  stop() 
  {
    this.sound.pause();
  }
}
