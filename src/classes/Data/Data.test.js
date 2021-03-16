import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Engine from '../Engine/Engine';
import ctx, { Data } from './Data';


const handler = jest.fn();

function Player(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    Engine.getEvent().listen('isColliding', handler);

    context[props?.id] = {
      'tag': 'player'
    };
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{position: 'fixed', transform: 'translate3d(0px, 0px, 0px)'}}>
      {context?.text}
    </span>
  );
}

function Obstacle(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    context[props?.id] = {
      'tag': 'obstacle'
    };
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{position: 'fixed', transform: 'translate3d(0px, 0px, 0px)'}}>
      {context?.text}
    </span>
  );
}

function Score(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    context[props?.id] = {
      'tag': 'score'
    };
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{position: 'fixed', transform: 'translate3d(0px, 0px, 0px)'}}>
      {context?.text}
    </span>
  );
}

function TestGroup()
{
  return (
    <Data>
      <Player id={'Player'} />
      <Obstacle id={'Obstacle'} />
      <Score id={'Score'} />
    </Data>
  );
}

// https://stackoverflow.com/a/66271345
describe('test render', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  
    let count = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(() => cb(100*(++count)), 100));
  });
  
  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    jest.clearAllTimers();
  });

  test('Data - render', () => {
    Engine.addObject(<TestGroup />);

    act(() => {
      render(<div id="root"/>);
      Engine.start();
    });

    document.getElementById('Player').getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 1,
      height: 1
    }));

    document.getElementById('Obstacle').getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 1,
      height: 1
    }));

    act(() => {
      jest.advanceTimersByTime(200);
    });
  });
});
