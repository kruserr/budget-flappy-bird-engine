import React from 'react';
import ReactDOM from 'react-dom';

import { Data } from '../Data/Data';
import AudioSystem, {IAudio} from '../AudioSystem/AudioSystem';


class Engine
{
  hud: JSX.Element;
  background: JSX.Element;
  objects = new Array<JSX.Element>();

  audio = new Map<string, IAudio>();

  isRunning = false;

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
    if (this.isRunning)
    {
      requestAnimationFrame(lambda);
    }
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
    if (this.isRunning)
    {
      this.audio.get(fileName)?.play();
    }
  }

  stopAudio(fileName: string)
  {
    this.audio.get(fileName)?.stop();
  }

  stop()
  {
    this.isRunning = false;
  }
  
  start()
  {
    this.isRunning = true;

    ReactDOM.render(
      <React.StrictMode>
        <div style={{zIndex: -10000, position: 'fixed', width: '100%', height: '100%'}}>
          {this.background}
        </div>
        <Data>
          {this.objects.map((item, i) => <span key={i} id={`slapId_${i}_0`}>{item}</span>)}
        </Data>
        <div style={{zIndex: 10000, position: 'fixed', width: '100%', height: '100%'}}>
          {this.hud}
        </div>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}

export default Engine.getInstance();
