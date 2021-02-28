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

  const engine = new Engine();
  
  engine.addObject(<Hero />);

  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);
  engine.addObject(<Enemy />);

  act(() => {
    engine.start();
  });
});
