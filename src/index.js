import './index.css';

import Engine from './classes/Engine/Engine';
import GameObject from './components/GameObject/GameObject';
import BoxCollider from './classes/BoxCollider/BoxCollider';


const engine = new Engine();

// https://www.kirupa.com/html5/press_and_hold.htm
let timerID;
let counter = 0;
let jump = false;
let unlock = true;
let pressHoldDuration = 15;
let pressHoldEvent = new CustomEvent("pressHold");

const timer = () =>
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

const pressingDown = () =>
{
  requestAnimationFrame(() => timer());
  jump = true;
}

const notPressingDown = () =>
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
  () => {
    if (unlock)
    {
      unlock = false;
      pressingDown();
    }
  }
);
document.addEventListener(
  "keyup",
  () => {
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

const heroRender = (self) => {
  if (jump)
  {
    if (self.boxCollider.getY() > -12)
    {
      self.boxCollider.setY(-0.6);
    }
  }
  else
  {
    if (self.boxCollider.getY() < 100)
    {
      self.boxCollider.setY(0.3);
    }
  }

  const styleRoot = {
    position: `fixed`,
    color: `yellow`,
    willChange: `transform`,
    fontSize: `10vh`,
    transform: `translate3d(${self.boxCollider.getX()}vw, ${self.boxCollider.getY()}vh, 0)`,
  };
  
  return (
    <span style={styleRoot}>
      {`(^)>`}
    </span>
  );
};

const hero = (
  <GameObject
    lambda = {heroRender}
    boxCollider = {new BoxCollider({x: 2.5, y: 37.9, width: 25, height: 25})}
  />
);
engine.addObject(hero);

engine.start();
