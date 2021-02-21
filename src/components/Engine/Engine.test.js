import React from 'react';
import { render, screen } from '@testing-library/react';

import Engine from './Engine';
import GameObject from '../GameObject/GameObject';


class Hero extends GameObject
{
  renderHook()
  {
    const styleRoot = {
      color: `green`,
    };

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
    const styleRoot = {
      color: `red`,
    };

    return (
      <div css={styleRoot}>
        Enemy
      </div>
    );
  }
}

test('renders Engine', () => {
  render(<div id="root"/>);

  const engine = new Engine();

  const hero = new Hero();
  const enemy = new Enemy();
  
  engine.addObject(hero);

  engine.addObject(enemy);
  engine.addObject(enemy);
  engine.addObject(enemy);
  engine.addObject(enemy);
  engine.addObject(enemy);
  engine.addObject(enemy);

  engine.start();
});
