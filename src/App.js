/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import { jsx, css } from '@emotion/react';

import GameObject from './components/GameObject/GameObject';


class Hero extends GameObject
{
  renderHook()
  {
    const styleRoot = css({
      color: `green`,
    });

    return (
      <div css={styleRoot}>
        Hero
      </div>
    );
  }
}

export default class App extends React.Component
{
  render()
  {
    const styleRoot = {
      marginLeft: `2.5%`,
      marginRight: `2.5%`,
      marginTop: `60px`,
      marginBottom: `60px`,

      '@media only screen and (min-width: 600px)': {
        marginLeft: `10%`,
        marginRight: `10%`,
      },

      '@media only screen and (min-width: 1200px)': {
        marginLeft: `22%`,
        marginRight: `22%`,
      },
    };

    return (
      <div css={styleRoot}>
        <Hero />
      </div>
    );
  }
}
