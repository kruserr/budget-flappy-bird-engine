import React from 'react';

import ctx from '../../classes/Data/Data';
import Pos from '../../classes/Pos/Pos';
import Physics from '../../classes/Physics/Physics';


const jumpAudio = new Audio('/assets/audio/jump.wav');
const collideAudio = new Audio('/assets/audio/quack.wav');

let jump = false;
let collide = false;
let keyDownLock = false;

function collided()
{
  if(collide == false)
    collideAudio.play();
    collide = true;
}

function clicked()
{
  jump = true;
  jumpAudio.play();
}

document.addEventListener("mousedown", () => clicked());
document.addEventListener("touchstart", () => clicked());
document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== ' ' || keyDownLock)
    {
      return;
    }
    
    keyDownLock = true;

    clicked();
  }
);
document.addEventListener(
  "keyup",
  (event) => {
    if (event.key !== ' ')
    {
      return;
    }
    
    keyDownLock = false;
  }
);

export default function Bird({engine})
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);
  const [id, setId] = React.useState('');

  const [collider, setCollider] = React.useState(
    new Pos({
      x: 100,
      y: window.innerHeight / 2,
    })
  );
  
  const physics = React.useMemo(() => {
    return new Physics(-10, 1);
  }, []);

  React.useEffect(() => {
    let parentId = element.current.parentNode.id.split('_');
    let idCounter = parseInt(parentId[2]);
    parentId.pop();
    parentId.push(++idCounter);
    const tempId = parentId.join('_');

    setId(tempId);

    document.addEventListener('isColliding', (event) => {
      if (event?.detail?.items?.includes(tempId))
      {
        collided();
        engine.stop();
      }
    });

    context[tempId] = {
      'tag': 'player'
    };
    setContext({...context});
  }, []);

  React.useEffect(() => {
    function move()
    {
      if (jump)
      {
        physics.applyJump(collider);
        jump = false;
      }
      else
      {
        physics.applyGravity(collider);
      }

      setCollider(new Pos({...collider}));
    };

    engine.requestAnimationFrame(move);
  }, [collider]);
  
  let rotation = Math.atan2(physics.getVelocity(), 6) * 180 / Math.PI;

  if (rotation < -40)
  {
    rotation = -40;
  }

  if (rotation > 40)
  {
    rotation = 40;
  }

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${collider.x}px, ${collider.y}px, 0) rotate(${rotation}deg)`,
  };

  console.log(id);
  
  return (
    <>
      <svg ref={element} id={id} style={styleRoot} height="50px" version="1.1" viewBox="0 0 74.017 55.852" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-62.95 -83.663)">
          <g stroke-width="1.5875">
          <g stroke="#28220b" stroke-width="1.5875">
            <ellipse transform="translate(-1.1875e-6)" cx="98.366" cy="116.63" rx="31.759" ry="17.625" fill="#fc0" fill-rule="evenodd"/>
            <ellipse transform="translate(-1.1875e-6)" cx="95.883" cy="134.04" rx="8.6278" ry="4.6856" fill="#f60"/>
            <ellipse transform="translate(-1.1875e-6)" cx="117.06" cy="97.553" rx="16.571" ry="13.096" fill="#fc0"/>
            <ellipse transform="translate(-1.1875e-6)" cx="131.36" cy="100.83" rx="4.8109" ry="3.2741" fill="#f60"/>
          </g>
          <ellipse transform="translate(-1.1875e-6)" cx="119.67" cy="95.883" rx="3.1404" ry="3.1404" fill="#28220b" stroke-width="1.5875"/>
          <path transform="translate(-1.1875e-6)" d="m69.832 110.85a10.758 4.744 0 0 1-6.0829-4.1265 10.758 4.744 0 0 1 5.4902-4.285 10.758 4.744 0 0 1 11.154 0.16847" fill="#fc0" stroke="#28220b" stroke-width="1.5875"/>
          <path transform="matrix(1.2706 0 0 .70673 -26.92 30.601)" d="m92.163 110.46c7.0526-0.57349 13.065-1.0384 18.959 3.5441 2.8957 2.2515-0.93968 8.5576-2.8468 11.41-3.8818 5.8064-7.4472 9.4699-14.606 11.69-3.5174 1.0909-5.0289-0.49088-7.0157-3.2841-4.0439-5.6852-3.3033-11.785-2.8827-19.267 0.20662-3.6764 4.9272-3.8118 8.3922-4.0935z" fill="#fc0" stroke="#28220b" stroke-width="1.6752"/>
          </g>
        </g>
      </svg>
    </>
  );
}
