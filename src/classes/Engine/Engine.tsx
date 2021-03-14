import React from 'react';
import ReactDOM from 'react-dom';

import { Data } from '../Data/Data';
import AudioSystem, {IAudio} from '../AudioSystem/AudioSystem';
import Time from '../Time/Time';
import '../Input/Input';


class Engine
{
  root = document.getElementById('root');
  hud: JSX.Element;
  background: JSX.Element;
  objects = new Array<JSX.Element>();

  audio = new Map<string, IAudio>();
  time = new Time();

  private static instance = new Engine();

  private constructor() { }

  public static getInstance(): Engine
  {
    return Engine.instance;
  }

  addObject(object: JSX.Element)
  {
    this.objects.push(object);
  }

  setBackground(background: JSX.Element)
  {
    this.background = background;
  }

  setHud(hud: JSX.Element)
  {
    this.hud = hud;
  }

  fixedUpdate(lambda: () => void)
  {
    return requestAnimationFrame(lambda);
  }

  cancelFixedUpdate(id: number)
  {
    cancelAnimationFrame(id);
  }

  addAudio(fileName: string)
  {
    this.audio.set(fileName, new AudioSystem(fileName));
  }

  removeAudio(fileName: string): boolean
  {
    return this.audio.delete(fileName);
  }

  playAudio(fileName: string)
  {
    if (this.time.getTimeScale() !== 0)
    {
      this.audio.get(fileName)?.play();
    }
  }

  stopAudio(fileName: string)
  {
    this.audio.get(fileName)?.stop();
  }

  getTime()
  {
    return this.time;
  }

  stop()
  {
    this.time.stop();
  }

  restart()
  {
    window.location.reload();
  }
  
  start()
  {
    ReactDOM.render(
      <React.StrictMode>
        <style>{`
          *
          {
            box-sizing: border-box;
          }

          html
          {
            -ms-touch-action: manipulation;
            touch-action: manipulation;
          }
          
          body
          {
            margin: 0px;
            max-height: 100vh;
            max-width: 100vw;
            overflow: hidden;

            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
        <Data>
          <div style={{zIndex: -10000, position: 'fixed', width: '100%', height: '100%'}}>
            {this.background}
          </div>
          {this.objects.map((item, i) => <span key={i} id={`slapId_${i}_0`}>{item}</span>)}
          <div style={{zIndex: 10000, position: 'fixed', width: '100%', height: '100%'}}>
            {this.hud}
          </div>
        </Data>
      </React.StrictMode>,
      this.root
    );
  }
}

export default Engine.getInstance();
