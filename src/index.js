import React from 'react';
import './index.css';

import ctx from './classes/Data/Data';
import Engine from './classes/Engine/Engine';
import BoxCollider from './classes/BoxCollider/BoxCollider';


const engine = new Engine();

// https://www.kirupa.com/html5/press_and_hold.htm
let timerID;
let counter = 0;
let jump = false;
let unlock = true;
let pressHoldDuration = 20;
let pressHoldEvent = new CustomEvent('pressHold');

function timer()
{
  jump = true;

  if (counter < pressHoldDuration)
  {
    timerID = requestAnimationFrame(() => timer());
    counter++;
  }
  else
  {
    document.dispatchEvent(pressHoldEvent);
  }
}

function pressingDown()
{
  requestAnimationFrame(() => timer());
  jump = true;
}

function notPressingDown()
{
  cancelAnimationFrame(timerID);
  counter = 0;

  jump = false;
}

document.addEventListener("mousedown", () => pressingDown());
document.addEventListener("mouseup", () => notPressingDown());

document.addEventListener("touchstart", () => pressingDown());
document.addEventListener("touchend", () => notPressingDown());

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== ' ')
      return;
    
    if (unlock)
    {
      unlock = false;
      pressingDown();
    }
  }
);
document.addEventListener(
  "keyup",
  (event) => {
    if (event.key !== ' ')
      return;
    
    notPressingDown();
    unlock = true;
  }
);

document.addEventListener(
  "pressHold",
  () => {
    jump = false;
  }
);

function Hero(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  const [collider, setCollider] = React.useState(
    new BoxCollider({
      x: 2.5,
      y: 37.9,
      width: 5,
      height: 5
    })
  );

  React.useEffect(() => {
    document.addEventListener('isColliding', (event) => {
      if (event?.detail?.items?.includes(props?.id))
      {
        engine.stop();
      }
    });
  }, []);

  React.useEffect(() => {
    function move()
    {
      if (jump)
      {
        if (collider.getY() > -12)
        {
          collider.setY(-0.6);
        }
      }
      else
      {
        if (collider.getY() < 100)
        {
          collider.setY(0.4);
        }
      }

      setCollider(new BoxCollider({...collider}));
      context[props?.id] = element?.current?.getBoundingClientRect();
      setContext({...context});
    };

    engine.requestAnimationFrame(move);
  }, [collider]);
  
  const styleRoot = {
    position: `fixed`,
    color: `yellow`,
    willChange: `transform`,
    fontSize: `${Math.max(collider.width, collider.height)}vh`,
    transform: `translate3d(${collider.getX()}vw, ${collider.getY()}vh, 0)`,
  };
  
  return (
    <span ref={element} id={props?.id} style={styleRoot}>
      {`(^)>`}
    </span>
  );
}
engine.addObject(<Hero id={'Hero'} />);

function Pipe(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  const [collider, setCollider] = React.useState(
    new BoxCollider({
      x: props?.data?.x,
      y: props?.data?.y,
      width: 5,
      height: 40
    })
  );

  React.useEffect(() => {
    function move()
    {
      if (collider.getX() > -30)
      {
        collider.setX(-0.6);
      }
      else
      {
        collider.setX(400);
      }

      setCollider(new BoxCollider({...collider}));
      context[props?.id] = element?.current?.getBoundingClientRect();
      setContext({...context});
    };

    engine.requestAnimationFrame(move);
  }, [collider]);

  let rotation = 0;
  if (props?.data?.rotation != null)
    rotation = props?.data?.rotation;

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${collider.getX()}vw, ${collider.getY()}vh, 0) rotate(${rotation}deg)`,
  };

  let text = `  --\n`;

  for (let i = 0; i < 7; i++)
  {
    text += `  | |\n`;
  }

  return (
    <span ref={element} id={props?.id} style={styleRoot}>
      {text}
    </span>
  );
}

function PipeSet(props)
{
  function getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Normal pipe spacing
  // const offset = 100;
  // const randomInt = getRandomInt(15, 80);

  // Wide pipe spacing
  const offset = 120;
  const randomInt = getRandomInt(30, 65);

  const styleRoot = {

  };

  return (
    <span style={styleRoot}>
      <Pipe id={`${props?.id}_up`} data={{x: (65 * props?.data?.i) + 75, y: randomInt}}/>
      <Pipe id={`${props?.id}_down`} data={{x: ((65 * props?.data?.i) + 75) + 8.5, y: randomInt - offset, rotation: 180}}/>
    </span>
  );
}

function PipeGroup()
{
  let items = [];
  for (let i = 0; i < 6; i++)
  {
    items.push(<PipeSet id={i} data={{i: i}} />);
  }

  const styleRoot = {
    color: `green`,
    fontSize: `10vh`,
    whiteSpace: 'pre-wrap',
  };

  return (
    <span style={styleRoot}>
      {items}
    </span>
  );
}
engine.addObject(<PipeGroup />);

engine.start();
