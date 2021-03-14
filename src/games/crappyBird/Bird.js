import React from 'react';
import Engine from '../../classes/Engine/Engine';


const jumpAudio = '/assets/audio/jump.wav';
Engine.addAudio(jumpAudio);

const collideAudio = '/assets/audio/quack.wav';
Engine.addAudio(collideAudio);

export default function Bird()
{
  const id = 'slapId_0_1';
  const jumpSpeed = 1.25;
  const gravity = jumpSpeed / 10;

  const element = React.useRef(null);
  const wingEl = React.useRef(null);
  const [context, setContext] = React.useContext(Engine.getContext());
  const [jump, setJump] = React.useState(false);
  const [collide, setCollide] = React.useState(false);
  const [wingUnlocked, setWingUnlocked] = React.useState(true);

  const [collider, setCollider] = React.useState(
    Engine.getPos({
      x: 10,
      y: 48,
    })
  );
  
  const physics = React.useMemo(() => {
    return Engine.getPhysics(-(jumpSpeed), gravity);
  }, []);

  React.useEffect(() => {
    Engine.getEvent().listen('isColliding', (event) => {
      let items = event?.detail?.items;

      if (items[0]?.tag == 'player' && items[1]?.tag == 'obstacle')
      {
        if(collide === false)
        {
          Engine.playAudio(collideAudio);
          setCollide(true);
        }
        
        Engine.stop();
        Engine.stopAudio(jumpAudio);

        element.current.classList.add('fall');
      }
    });

    context[id] = {
      'tag': 'player'
    };
    setContext({...context});
  }, []);

  React.useEffect(() => {
    function handlePlayerInput()
    {
      setJump(true);
      Engine.playAudio(jumpAudio);
    }

    Engine.getEvent().listen('playerInput', handlePlayerInput);

    return () => Engine.getEvent().remove('playerInput', handlePlayerInput);
  }, []);

  React.useEffect(() => {
    function move()
    {
      if (jump)
      {
        physics.applyJump(collider);
        setJump(false);

        if (wingUnlocked)
        {
          setWingUnlocked(false);

          wingEl.current.classList.add('wingDown');
          new Promise(res => setTimeout(res, 100))
            .then(() => {
              wingEl.current.classList.remove('wingDown');
              new Promise(res => setTimeout(res, 100))
                .then(() => {
                  setWingUnlocked(true);
                });
            });
        }
      }
      else
      {
        physics.applyGravity(collider);
      }

      setCollider(Engine.getPos({...collider}));
    };

    Engine.fixedUpdate(move);
  }, [collider]);

  let rotation;
  if (Engine.getTime().getTimeScale() != 0 || collide)
  {
    rotation = (Math.atan2(physics.getVelocity(), jumpSpeed) * 180 / Math.PI);
  }

  const styleRoot = {
    display: 'flex',
    position: 'fixed',
    willChange: 'transform',
    transform: `translate3d(${collider.x}vh, ${collider.y}vh, 0)`,
  };

  return (
    <>
      <style jsx>{`
        .wingDown
        {
          transform: translate3d(-0.6vh, -2.4vh, 0);
        }

        .fall
        {
          transform: translate3d(${collider.x}vw, 150vh, 0px) !important;
          transition: transform 900ms linear;
        }
      `}</style>
      <span ref={element} id={id} style={styleRoot}>
        <svg style={{transform: `rotate(${rotation}deg)`}} height="4.25vh" version="1.1" viewBox="0 0 74.017 55.852" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-62.95 -83.663)">
            <g strokeWidth="1.5875">
            <g stroke="#28220b" strokeWidth="1.5875">
              <ellipse transform="translate(-1.1875e-6)" cx="98.366" cy="116.63" rx="31.759" ry="17.625" fill="#fc0" fillRule="evenodd"/>
              <ellipse transform="translate(-1.1875e-6)" cx="95.883" cy="134.04" rx="8.6278" ry="4.6856" fill="#f60"/>
              <ellipse transform="translate(-1.1875e-6)" cx="117.06" cy="97.553" rx="16.571" ry="13.096" fill="#fc0"/>
              <ellipse transform="translate(-1.1875e-6)" cx="131.36" cy="100.83" rx="4.8109" ry="3.2741" fill="#f60"/>
            </g>
            <ellipse transform="translate(-1.1875e-6)" cx="119.67" cy="95.883" rx="3.1404" ry="3.1404" fill="#28220b" strokeWidth="1.5875"/>
            <path transform="translate(-1.1875e-6)" d="m69.832 110.85a10.758 4.744 0 0 1-6.0829-4.1265 10.758 4.744 0 0 1 5.4902-4.285 10.758 4.744 0 0 1 11.154 0.16847" fill="#fc0" stroke="#28220b" strokeWidth="1.5875"/>
            <path ref={wingEl} style={{'willChange': 'transform', 'transition': 'transform 100ms linear'}} transform="matrix(1.2706 0 0 .70673 -26.92 30.601)" d="m92.163 110.46c7.0526-0.57349 13.065-1.0384 18.959 3.5441 2.8957 2.2515-0.93968 8.5576-2.8468 11.41-3.8818 5.8064-7.4472 9.4699-14.606 11.69-3.5174 1.0909-5.0289-0.49088-7.0157-3.2841-4.0439-5.6852-3.3033-11.785-2.8827-19.267 0.20662-3.6764 4.9272-3.8118 8.3922-4.0935z" fill="#fc0" stroke="#28220b" strokeWidth="1.6752"/>
            </g>
          </g>
        </svg>
      </span>
    </>
  );
}
