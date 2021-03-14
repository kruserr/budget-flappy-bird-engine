import React from 'react';
import ReactDOM from 'react-dom';

import ctx, { Data } from '../Data/Data';
import AudioSystem, {IAudio} from '../AudioSystem/AudioSystem';
import EventSystem from '../EventSystem/EventSystem';
import Time from '../Time/Time';
import Input from '../Input/Input';
import Physics from '../Physics/Physics';
import Pos, { IPos } from '../Pos/Pos';


class Engine
{
  hud: JSX.Element;
  background: JSX.Element;
  objects = new Array<JSX.Element>();

  audio = new Map<string, IAudio>();
  time = new Time();
  event = new EventSystem();

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

  getEvent()
  {
    return this.event;
  }

  getTime()
  {
    return this.time;
  }

  getPos(): void;
  getPos(obj: IPos): void;
  getPos(obj?: any)
  {
    return new Pos(obj);
  }

  getPhysics(jumpSpeed: number, gravity: number)
  {
    return new Physics(jumpSpeed, gravity);
  }

  getContext()
  {
    return ctx;
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
          <div style={{zIndex: -10000, position: 'fixed', width: '100%', height: '100%', top: '0'}}>
            {this.background}
          </div>
          {this.objects.map((item, i) => <span key={i} id={`slapId_${i}_0`}>{item}</span>)}
          <div style={{zIndex: 10000, position: 'fixed', width: '100%', height: '100%', top: '0'}}>
            {this.hud}
          </div>
        </Data>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}

export default Engine.getInstance();
Input();
