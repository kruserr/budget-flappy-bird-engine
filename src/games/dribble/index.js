import React from 'react';
import Engine from '../../classes/Engine/Engine';


let counter = 0;

function Ball()
{
  const id = 'slapId_0_1';
  const jumpSpeed = 1.25;
  const gravity = jumpSpeed / 10;

  const [jump, setJump] = React.useState(false);
  const [context, setContext] = React.useContext(Engine.getContext());
  const [pos, setPos] = React.useState(
    Engine.getPos({
      x: 10,
      y: 48,
    })
  );
  const [ground, setGround] = React.useState(false);

  const physics = React.useMemo(() => {
    return Engine.getPhysics(-(jumpSpeed), gravity);
  }, []);

  React.useEffect(() => {
    Engine.getEvent().listen('isColliding', (event) => {
      if (!ground)
      {
        setGround(true);
        // pos.y = 48;
        // setPos(Engine.getPos({...pos}));
      }
    });

    context[id] = {
      'tag': 'player'
    };
    setContext({...context});

    function handlePlayerInput()
    {
      setJump(true);
    }

    Engine.getEvent().listen('playerInput', handlePlayerInput);

    return () => Engine.getEvent().remove('playerInput', handlePlayerInput);
  }, []);

  React.useEffect(() => {
    function move()
    {
      if (jump)
      {
        physics.applyJump(pos);
        setJump(false);
        setGround(false);
      }
      else
      {
        if (!ground)
        {
          physics.applyGravity(pos);
        }
      }

      setPos(Engine.getPos({...pos}));
    };

    Engine.fixedUpdate(move);
  }, [pos]);

  return (
    <>
      <span
        id={id}
        style={{
          color: 'white',
          position: 'fixed',
          willChange: 'transform',
          transform: `translate3d(5vh, ${pos.y}vh, 0px)`,
        }}
      >
        ( )
      </span>
    </>
  );
}
Engine.addObject(<Ball />);

function Ground()
{
  const id = 'slapId_1_1';
  const [context, setContext] = React.useContext(Engine.getContext());

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };
    setContext({...context});
  }, []);

  return(
    <>
      <span
        id={id}
        style={{
          color: 'green',
          position: 'fixed',
          willChange: 'transform',
          transform: 'translate3d(0vh, 60vh, 1px)',
        }}
      >
        _________________________________________________________
      </span>
    </>
  );
}
Engine.addObject(<Ground />);

Engine.start();
