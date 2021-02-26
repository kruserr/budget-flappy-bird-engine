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
      width: 25,
      height: 25
    })
  );

  React.useEffect(() => {
    function move() {
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
    fontSize: `10vh`,
    transform: `translate3d(${collider.getX()}vw, ${collider.getY()}vh, 0)`,
  };
  
  return (
    <span style={styleRoot}>
      {`(^)>`}
    </span>
  );
}
engine.addObject(<Hero />);

engine.start();
