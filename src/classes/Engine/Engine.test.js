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

test('Engine - etc', () => {
  window.HTMLMediaElement.prototype.load = () => { };
  window.HTMLMediaElement.prototype.play = () => { };
  window.HTMLMediaElement.prototype.pause = () => { };
  window.HTMLMediaElement.prototype.addTextTrack = () => { };

  Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() }
  });

  act(() => {
    render(<div id="root"/>);
    Engine.start();
  });

  Engine.getTime().setTimeScale(1);

  Engine.cancelFixedUpdate();

  Engine.addAudio('1');
  Engine.removeAudio('1');
  
  Engine.addAudio('2');
  Engine.playAudio('2');
  Engine.stopAudio('2');

  Engine.getTime().setTimeScale(0);

  Engine.addAudio('3');
  Engine.playAudio('3');
  Engine.stopAudio('3');

  const pos = Engine.getPos();
  expect(pos).not.toBeNull();

  const physics = Engine.getPhysics();
  expect(physics).not.toBeNull();

  const ctx = Engine.getContext();
  expect(ctx).not.toBeNull();

  const debugText = 'debugText1';
  Engine.debugWrite('debugText1');

  expect(document.getElementById(Engine.getDebugId()).innerHTML).toBe(debugText);

  Engine.restart();
});
