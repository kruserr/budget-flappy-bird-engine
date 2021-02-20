/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import { jsx, css } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import Engine from './Engine';
import GameObject from '../GameObject/GameObject';


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

class Enemy extends GameObject
{
  renderHook()
  {
    const styleRoot = css({
      color: `red`,
    });

    return (
      <div css={styleRoot}>
        Enemy
      </div>
    );
  }
}

test('renders Engine', () => {
  let engine = new Engine();
  
  engine.addObject(<Hero />);

  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);

  render(engine.render());
});
