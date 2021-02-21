import React from 'react';
import { render, screen } from '@testing-library/react';

import Engine from './Engine';
import GameObject from '../../components/GameObject/GameObject';
import EventList from '../EventList/EventList';
import Action from '../Action/Action';


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

test('Engine - Inherit GameObject', () => {
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

test('Engine - GameObject lambda injection', () => {
  render(<div id="root"/>);

  const engine = new Engine();
  const eventList = new EventList();

  const hero = new GameObject({
    actions: [
      new Action({
        event: eventList.getEvent('true'),
        lambda: (self) => {
          let data = self.state;
          data['text'] = 'text';
        }
      })
    ],
    lambda: (self) => {
      const styleRoot = {
        color: `green`,
      };

      return (
        <div style={styleRoot}>
          {self.state.text}
        </div>
      );
    }
  });
  engine.addObject(hero);

  engine.start();
});
