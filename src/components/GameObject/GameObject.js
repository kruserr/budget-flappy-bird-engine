/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import { jsx } from '@emotion/react';

import BoxCollider from '../../classes/BoxCollider/BoxCollider';


export default class GameObject extends React.Component
{
  health = 0;
  actions = [];
  boxCollider = new BoxCollider();

  constructor(props)
  {
    super(props);

    if (this.props.health)
    {
      this.health = this.props.health;
    }

    if (this.props.actions)
    {
      this.actions = this.props.actions;
    }

    if (this.props.boxCollider)
    {
      this.boxCollider = this.props.boxCollider;
    }
  }

  run()
  {
    for (const item of this.actions)
    {
      item.run(this);
    }
  }

  renderHook()
  {
    const styleRoot = {
      background: `#333333`,
      color: `#FFFFFF`,
      textAlign: `center`,
      borderRadius: `10px`,
      paddingTop: `10px`,
      paddingBottom: `10px`,
    };

    return (
      <div css={styleRoot}>
        GameObject
      </div>
    );
  }

  render()
  {
    this.run();
    
    return (
      <div css={this.props.css}>
        {this.renderHook()}
      </div>
    );
  }
}
