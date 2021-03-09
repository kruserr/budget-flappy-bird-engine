import React from 'react';
import { render, screen } from '@testing-library/react';

import ctx, { Data } from './Data';


class MockDomRect
{
  height;
  width;
  x;
  y;
  bottom;
  left;
  right;
  top;
  toJSON() {
    throw new Error('Method not implemented.');
  }
};

function Player(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    let objA = new MockDomRect();
    objA.x = 0;
    objA.y = 0;
    objA.width = 1;
    objA.height = 1;

    context[props?.id] = {
      'collider': objA,
      'tag': 'player'
    };
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{top: `100px`}}>
      {context?.text}
    </span>
  );
}

function Obsticle(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    let objB = new MockDomRect();
    objB.x = 0;
    objB.y = 0;
    objB.width = 1;
    objB.height = 1;

    context[props?.id] = {
      'collider': objB,
      'tag': 'obsticle'
    };
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{top: `100px`}}>
      {context?.text}
    </span>
  );
}

function TestGroup()
{
  return (
    <Data>
      <Player id={'Player'} />
      <Obsticle id={'Obsticle'} />
    </Data>
  );
}

test('Data - render', () => {
  const { debug } = render(<TestGroup />);
  debug();
});
