import React from 'react';
import './index.css';

import Engine from './classes/Engine/Engine';
import BoxCollider from './classes/BoxCollider/BoxCollider';


const engine = new Engine();

// https://www.kirupa.com/html5/press_and_hold.htm
let timerID;
let counter = 0;
let jump = false;
let unlock = true;
let pressHoldDuration = 20;
let pressHoldEvent = new CustomEvent("pressHold");

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

function Hero()
{
  const [collider, setCollider] = React.useState(
    new BoxCollider({
      x: 2.5,
      y: 37.9,
      width: 5,
      height: 5
    })
  );

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
    };

    requestAnimationFrame(move);
  });
  
  const styleRoot = {
    position: `fixed`,
    color: `yellow`,
    willChange: `transform`,
    fontSize: `${Math.max(collider.width, collider.height)}vh`,
    transform: `translate3d(${collider.getX()}vw, ${collider.getY()}vh, 0)`,
  };
  
  return (
    <span style={styleRoot}>
      {`(^)>`}
    </span>
  );
}
engine.addObject(<Hero />);

function Pipe(props)
{
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

      setCollider(new BoxCollider({...collider}));
    };

    requestAnimationFrame(move);
  });

  const styleRoot = {
    position: `fixed`,
    color: `green`,
    willChange: `transform`,
    fontSize: `10vh`,
    transform: `translate3d(${collider.getX()}vw, ${collider.getY()}vh, 0)`,
    whiteSpace: 'pre-wrap',
  };

  let text = `  --\n`;

  for (let i = 0; i < 4; i++)
  {
    text += `  | |\n`;
  }

  return (
    <span style={styleRoot}>
      {text}
    </span>
  );
}

for (let i = 0; i < 10; i++)
{
  if (i % 2 == 0)
  {
    engine.addObject(<Pipe data={{x: (65 * i) + 75, y: 41}}/>);
  }
  else
  {
    engine.addObject(<Pipe data={{x: (65 * i) + 75, y: -7}}/>);
  }
}

engine.start();
