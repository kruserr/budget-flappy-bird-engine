import { request } from 'http';
import React from 'react';
import ReactDOM from 'react-dom';
import { parseConfigFileTextToJson } from 'typescript';


class EngineComponent extends React.Component
{
  state = {};

  componentDidMount()
  {
    setInterval(() => this.forceUpdate(), 16);
    // requestAnimationFrame(() => this.forceUpdate());
    
    // const update = () => {
    //   let data = this.state;
    //   data.text = 'text2';
    //   this.setState(data);
    // };
    // setInterval(() => update(), 1000);
  }

  render()
  {
    const childrenWithProps = React.Children.map(
      this.props.children, child => {
        if (React.isValidElement(child))
        {
          return React.cloneElement(child, { data: this.state });
        }

        return child;
      }
    );

    return childrenWithProps;
  }
}

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
        <EngineComponent>
          {this.objects}
        </EngineComponent>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}
