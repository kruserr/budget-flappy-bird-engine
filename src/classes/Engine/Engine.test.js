import React from 'react';
import { render, screen } from '@testing-library/react';

import Engine from './Engine';
import { act } from 'react-dom/test-utils';


function Hero()
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

function Enemy()
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

test('Engine - Inherit GameObject', () => {
  render(<div id="root"/>);

  Engine.addObject(<Hero />);

  Engine.addObject(<Enemy />);
  Engine.addObject(<Enemy />);
  Engine.addObject(<Enemy />);
  Engine.addObject(<Enemy />);
  Engine.addObject(<Enemy />);
  Engine.addObject(<Enemy />);

  Engine.setBackground(<Enemy />);
  Engine.setHud(<Enemy />);

  act(() => {
    Engine.start();
  });

  Engine.fixedUpdate(() => {});

  Engine.stop();

  Engine.fixedUpdate(() => {});
});
