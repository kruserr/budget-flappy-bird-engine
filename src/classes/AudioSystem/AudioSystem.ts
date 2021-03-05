import React from 'react';

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





















// type AudioProps = {
//     SoundUrl: string,
//     isPlaying: boolean
// }

// const AudioClips = [
//   {sound: Abba}
// ]

// //export default class AudioSystem extends React.Component {

//   playSound = (src: string) => {
//     const sound = new Howl({
//       src
//     })

//     sound.play();
//   }

//   renderBtnAndSound = () => {
//     return AudioClips.map((sounObj) => {
//       return(
//         <>
//           <button onClick={() => this.playSound(Abba)}></button>
//         </>
//       );
//     });
//   }
//   handleSongLoading: (() => void) | undefined;
//   handleSongPlaying: (() => void) | undefined;
//   handleSongFinishedPlaying: (() => void) | undefined;

//   // PrefixUrl: string;

//   // constructor(props: AudioProps) {
//   //   super(props);

//   //   this.PrefixUrl = "/sounds/";

//   //   this.state = {
//   //     SoundUrl: this.PrefixUrl,
//   //     isPlaying: false
//   //   }
//   // }

//   // playSoundHandler = (msg: string) => {
//   //   const [play, { stop }] = useSound(
//   //     this.state.SoundUrl!,
//   //     { volume: 0.5 }
//   //   );

//   //   if (msg.includes("mp3")) {
//   //     this.setState({ SoundUrl:  this.PrefixUrl + msg, isPlaying: true });
//   //     play();
//   //   } else {
//   //     stop();
//   //   }
//   // }

//   render() {
//     return (
//       <Sound
//         url={Abba}
//         playStatus={Sound.status.PLAYING}
//         onLoading={this.handleSongLoading}
//         onPlaying={this.handleSongPlaying}
//         onFinishedPlaying={this.handleSongFinishedPlaying}
//       />
//      );
//     }
//    }
// }

// import React from 'react';
// import useSound from 'use-sound'; // React hook that lets you play sound effects

// export default function AudioSystem() {
//   const soundUrl = '/sounds/dancing_queen.mp3';

//   const [play, { stop }] = useSound(soundUrl);

//   return (
//     <div>
//       <div className="text-center">
//         <button className="btn btn-secondary" onClick={() => play}>
//           Play
//         </button>
//         <button className="btn btn-secondary" onClick={() => stop}>
//           Stop
//         </button>
//       </div>
//     </div>
//   );
// }

// class AudioSystem extends Component {
//   soundUrlPrefix = "/sounds/";
//   isPlaying = false;

//   handleSound(sound?: string, isPlaying?: boolean) {
//     const soundUrl = this.soundUrlPrefix + sound;
//     const [play, { stop }] = useSound(soundUrl);
    
//     if (!isPlaying) {
//       play;
//     }

//     if (this.isPlaying) {
//       stop;
//     }
//   }
 
//   render() {
//     return (
//       <div>
//         <div className="text-center">
//           <button className="btn btn-secondary" onClick={() => this.handleSound("dancing_queen.mp3", true)}>
//             Play
//           </button>
//           <button className="btn btn-secondary" onClick={() => this.handleSound("dancing_queen.mp3", false)}>
//             Stop
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default AudioSystem;

/*export default function Audio() {
  const soundUrl = '/sounds/guitar-loop.mp3';

  const [play, { stop }] = useSound(soundUrl);

  void down() { document.addEventListener("mousedown", () => {play}); }
  const up = document.addEventListener("mouseup", () => {stop});

  return (
    <button id="play_btn">
      Hey
    </button>
  );
}*/