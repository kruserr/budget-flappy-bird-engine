import React from 'react';
import ReactDOM from 'react-dom';

import GameObject from '../../components/GameObject/GameObject';


export default class Engine
{
  objects = [];

  constructor(props)
  {
    // this.objects = props && props.objects;
  }

  addObject(item)
  {
    // this.objects.push(item.render(item));
    this.objects.push(item);
  }

  start()
  {
    ReactDOM.render(
      <React.StrictMode>
        {this.objects}
      </React.StrictMode>,
      document.getElementById('root')
    );

    for (const item of this.objects)
    {
      console.log(item);

      // for (const action of item.props.actions)
      // {
      //   action.run(item);
      // }

      // console.log(item.type.run());
      // item.run();
      // item.props.actions.run();
      // item._self.run();
    }
  }
}
