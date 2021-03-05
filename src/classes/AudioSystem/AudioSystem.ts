export default class AudioSystem
{  
  private sound: HTMLAudioElement;
  private filename: string;
  
  constructor (filename: string) 
  {
    this.filename = filename;
    this.sound = new Audio(this.filename);
  }

  setFilename(filename: string) 
  { 
    this.filename = filename; 
  }

  getFilename() 
  { 
    return this.filename; 
  }

  getSound()
  {
    return this.sound;
  }

  play() 
  {
    this.getSound().play();
  }

  stop() 
  {
    this.getSound().pause();
  }
}
