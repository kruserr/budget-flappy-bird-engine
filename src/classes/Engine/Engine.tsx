import React from 'react';
import ReactDOM from 'react-dom';

import { Data } from '../Data/Data';


export default class Engine
{
  objects = new Array<JSX.Element>();
  background: JSX.Element;
  hud: JSX.Element;
  shouldRender: boolean;

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

  requestAnimationFrame(lambda: () => void)
  {
    if (this.shouldRender)
    {
      requestAnimationFrame(lambda);
    }
  }

  stop()
  {
    this.shouldRender = false;
  }
  
  start()
  {
    this.shouldRender = true;

    ReactDOM.render(
      <React.StrictMode>
        <div style={{zIndex: -(-1 >>>0), position: 'fixed', width: '100%', height: '100%'}}>
          {this.background}
        </div>
        <Data>
          {this.objects.map((item, i) => <span key={i}>{item}</span>)}
        </Data>
        <div style={{zIndex: -1 >>>0, position: 'fixed', width: '100%', height: '100%'}}>
          {this.hud}
        </div>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}
