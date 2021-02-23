import React from 'react';
import ReactDOM from 'react-dom';


class EngineComponent extends React.Component
{
  state = {};

  constructor(props)
  {
    super(props);

    this.state.setState = this.setState.bind(this);
  }

  componentDidMount()
  {
    const render = () => {
      this.forceUpdate();
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
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
