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
    render(<div id="root"/>);
    Engine.start();
  });

  Engine.fixedUpdate(() => {});

  Engine.stop();

  Engine.fixedUpdate(() => {});
});

test('Engine - Minimal init', () => {
  function Hero()
  {
    return (
      <>
        <h1 style={{'color': 'green'}}>Hero</h1>
      </>
    );
  }
  Engine.addObject(<Hero />);
  
  act(() => {
    render(<div id="root"/>);
    Engine.start();
  });
});
