import React from 'react';
import ReactDOM from 'react-dom';
import { JsxEmit } from 'typescript';


export default class Engine
{
  objects = new Array<JSX.Element>();
  background: JSX.Element;
  hud: JSX.Element;

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

  start()
  {
    ReactDOM.render(
      <React.StrictMode>
        <span style={{zIndex: 0, position: 'fixed'}}>
          {this.background}
        </span>
        {this.objects.map((item, i) => <span key={i}>{item}</span>)}
        <span style={{zIndex: -1 >>>0, position: 'fixed'}}>
          {this.hud}
        </span>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}
