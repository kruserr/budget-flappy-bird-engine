import React from 'react';

import GameObject from '../GameObject/GameObject';


export interface IEvent
{
  objects: Array<JSX.Element>;
}

export default class Engine extends React.Component
{
  private objects: Array<JSX.Element>;

  constructor();
  constructor(props: IEvent)
  constructor(props?: any)
  {
    super(props);

    this.objects = props && props.objects || new Array<JSX.Element>();
  }

  addObject(item: GameObject)
  {
    this.objects.push((
      <span key={this.objects.length}>
        {item}
      </span>
    ));
  }

  render()
  {
    return (
      <>
        {this.objects}
      </>
    );
  }
}
