import React from 'react';
import ReactDOM from 'react-dom';

import GameObject from '../GameObject/GameObject';


export interface IGameObjects
{
  objects: Array<GameObject>;
}

export default class Engine
{
  private objects: Array<GameObject>;

  constructor();
  constructor(props: IGameObjects)
  constructor(props?: any)
  {
    this.objects = props && props.objects || new Array<GameObject>();
  }

  addObject(item: GameObject)
  {
    this.objects.push(item);
  }

  start()
  {
    ReactDOM.render(
      <React.StrictMode>
        {this.renderObjects()}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  private renderObjects()
  {
    let items = new Array<JSX.Element>();

    for (const item of this.objects)
    {
      item.run();

      items.push(
        <span key={items.length}>
          {item.render()}
        </span>
      );
    }

    return items;
  }
}
