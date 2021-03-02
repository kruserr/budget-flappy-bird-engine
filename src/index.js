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
      x: 100,
      y: window.innerHeight / 2,
      width: 66.66,
      height: 50
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
        if (collider.getY() > -50)
        {
          collider.setY(-10);
        }
      }
      else
      {
        if (collider.getY() < window.innerHeight)
        {
          collider.setY(10);
        }
      }

      setCollider(new BoxCollider({...collider}));
      context[props?.id] = element?.current?.getBoundingClientRect();
      setContext({...context});
    };

    engine.requestAnimationFrame(move);
  }, [collider]);
  
  // const styleRoot = {
  //   position: `absolute`,
  //   left: collider.getX(),
  //   top: collider.getY(),
  // };

  const styleRoot = {
    position: `fixed`,
    color: `yellow`,
    willChange: `transform`,
    transform: `translate3d(${collider.getX()}px, ${collider.getY()}px, 0)`,
  };
  
  return (
    <svg ref={element} id={props?.id} style={styleRoot} height="50px" version="1.1" viewBox="0 0 72.695 54.52" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-63.611 -84.325)">
        <g stroke="#28220b">
        <ellipse cx="98.366" cy="116.63" rx="31.759" ry="17.625" fill="#fc0" fillRule="evenodd" strokeWidth=".24745"/>
        <ellipse cx="95.883" cy="134.04" rx="8.6278" ry="4.6856" fill="#f60" strokeWidth=".24784"/>
        <ellipse cx="117.06" cy="97.553" rx="16.571" ry="13.096" fill="#fc0" strokeWidth=".26458"/>
        <ellipse cx="131.36" cy="100.83" rx="4.8109" ry="3.2741" fill="#f60" strokeWidth=".26458"/>
        </g>
        <g strokeWidth=".26458">
        <ellipse cx="119.67" cy="95.883" rx="3.1404" ry="3.1404" fill="#28220b"/>
        <path d="m69.832 110.85a10.758 4.744 0 0 1-6.0829-4.1265 10.758 4.744 0 0 1 5.4902-4.285 10.758 4.744 0 0 1 11.154 0.16847" fill="#fc0" stroke="#28220b"/>
        <path transform="matrix(1.2706 0 0 .70673 -26.92 30.601)" d="m92.163 110.46c7.0526-0.57349 13.065-1.0384 18.959 3.5441 2.8957 2.2515-0.93968 8.5576-2.8468 11.41-3.8818 5.8064-7.4472 9.4699-14.606 11.69-3.5174 1.0909-5.0289-0.49088-7.0157-3.2841-4.0439-5.6852-3.3033-11.785-2.8827-19.267 0.20662-3.6764 4.9272-3.8118 8.3922-4.0935z" fill="#fc0" stroke="#28220b"/>
        </g>
      </g>
    </svg>
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
      width: 108.91,
      height: 800
    })
  );

  React.useEffect(() => {
    function move()
    {
      if (collider.getX() > -108.91)
      {
        collider.setX(-6);
      }
      else
      {
        collider.setX(6*600);
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

  // const styleRoot = {
  //   position: `absolute`,
  //   left: collider.getX(),
  //   top: collider.getY(),
  //   transform: `rotate(${rotation}deg)`,
  // };

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${collider.getX()}px, ${collider.getY()}px, 0) rotate(${rotation}deg)`,
  };

  let text = `  --\n`;

  for (let i = 0; i < 7; i++)
  {
    text += `  | |\n`;
  }

  return (
    <svg ref={element} id={props?.id} style={styleRoot} height="800px" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-65 8.2278)" fill="#999" stroke="#000" strokeLinejoin="round">
        <rect transform="scale(1,-1)" x="70.798" y="-505.16" width="58.404" height="478.4" rx="0" ry="0" imageRendering="auto" strokeWidth="1.5964" style={{mixBlendMode: 'normal'}}/>
        <rect transform="scale(1,-1)" x="65.694" y="-26.078" width="68.612" height="33.612" ry="5.2732" strokeWidth="1.3882" style={{mixBlendMode: 'normal'}}/>
      </g>
    </svg>
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
  // Normal pipe spacing
  const offset = 1000;
  const randomInt = getRandomInt(200, 800);

  // Wide pipe spacing
  // const offset = 130;
  // const randomInt = getRandomInt(30, 65);

  const styleRoot = {

  };

  return (
    <span style={styleRoot}>
      <Pipe id={`${props?.id}_up`} data={{x: (600 * props?.data?.i) + 600, y: randomInt}}/>
      <Pipe id={`${props?.id}_down`} data={{x: ((600 * props?.data?.i) + 600), y: randomInt - offset, rotation: 180}}/>
    </span>
  );
}

function PipeGroup()
{
  let items = [];
  for (let i = 0; i < 6; i++)
  {
    items.push(<PipeSet key={i} id={i} data={{i: i}} />);
  }

  const styleRoot = {

  };

  return (
    <span style={styleRoot}>
      {items}
    </span>
  );
}
engine.addObject(<PipeGroup />);

engine.start();
