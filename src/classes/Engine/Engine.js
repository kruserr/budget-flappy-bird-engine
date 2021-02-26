import React from 'react';
import ReactDOM from 'react-dom';


export default class Engine
{
  objects = [];

  addObject(item)
  {
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
  }
}
