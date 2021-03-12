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
  private isPlaying = true;
  
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
    if (this.isPlaying)
    {
      this.sounds[this.index].play();
      this.incrementIndex();
    }
  }

  pause() 
  {
    if (this.isPlaying)
    {
      this.sounds[this.index].pause();
      this.incrementIndex();
      this.isPlaying = false;
    }
  }

  stop() 
  {
    if (this.isPlaying)
    {
      this.sounds[this.index].pause();
      this.sounds[this.index].currentTime = 0;
      this.incrementIndex();
      this.isPlaying = false;
    }
  }
}

// export interface IAudio
// {
//   play(fileName: string): void;
//   pause(fileName: string): void;
//   stop(fileName: string): void;
//   setFilename(fileName: string): void;
// }

// export default class AudioSystem implements IAudio
// {
//   private sounds = Object.create(HTMLAudioElement); 
//   // private sounds = new Array<HTMLAudioElement>();
//   private fileName: string;
//   private channels: number;
//   private index = 0;
//   private isPlaying = true;
  
//   constructor(fileName: string, channels = 4) 
//   {
//     this.channels = channels;
//     this.setFilename(fileName);
//   }

//   private incrementIndex()
//   {
//     this.index = (this.index + 1) % this.channels;
//   }

//   setFilename(fileName: string) 
//   { 
//     // this.sounds.fileName = new Audio(this.sounds.fileName);
//     //this.fileName = fileName;
//     for (let i = 0; i < this.channels; i++)
//     {
//       this.sounds[fileName] = new Audio(fileName);
//     }
//   }

//   play(fileName: string) 
//   {
//     if (this.isPlaying)
//     {
//       if (fileName in this.sounds)
//       {
//         this.sounds[fileName].play(); // Index skal handlast á ein ella annan hátt
//         // this.incrementIndex();
//       }
//     }
//   }

//   pause(fileName: string)  
//   {
//     if (this.isPlaying)
//     {
//       if (fileName in this.sounds)
//       {
//         this.sounds[fileName].pause(); // Index skal handlast á ein ella annan hátt
//         // this.incrementIndex();
//         this.isPlaying = false;
//       }
//     }
//   }

//   stop(fileName: string)  
//   {
//     if (this.isPlaying)
//     {
//       if (fileName in this.sounds)
//       {
//         this.sounds[fileName].pause(); // Index skal handlast á ein ella annan hátt
//         // this.sounds[this.index].currentTime = 0;
//         // this.incrementIndex();
//         this.isPlaying = false;
//       }
//     }
//   }
// }