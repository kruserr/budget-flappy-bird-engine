import React from 'react';
import './index.css';

import ctx from './classes/Data/Data';
import Engine from './classes/Engine/Engine';
import Pos from './classes/Pos/Pos';
import Physics from './classes/Physics/Physics';
import Audio from './classes/AudioSystem/AudioSystem';


const engine = new Engine();
const jumpAudio = new Audio('/assets/audio/jump.wav');

let jump = false;
let keyDownLock = false;

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

function Hero(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

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
        physics.applyJump(collider);
        jump = false;
      }
      else
      {
        physics.applyGravity(collider);
      }

      setCollider(new Pos({...collider}));
      context[props?.id] = {
        'collider': element?.current?.getBoundingClientRect(),
        'tag': 'player'
      };
      setContext({...context});
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

function Pipe({id, pos, rotation})
{
  // const element = React.useRef(null);
  // const [context, setContext] = React.useContext(ctx);

  // const [collider, setCollider] = React.useState(
  //   new Pos({
  //     x: props?.data?.x,
  //     y: props?.data?.y,
  //   })
  // );

  // React.useEffect(() => {
  //   function move()
  //   {
  //     if (collider.x > -108.91)
  //     {
  //       collider.x += -6;
  //     }
  //     else
  //     {
  //       collider.x += 6*600;
  //     }

  //     setCollider(new Pos({...collider}));
  //     context[props?.id] = {
  //       'collider': element?.current?.getBoundingClientRect(),
  //       'tag': 'obstacle'
  //     };
  //     setContext({...context});
  //   };

  //   engine.requestAnimationFrame(move);
  // }, [collider]);

  if (rotation != null)
  {
    rotation = rotation;
  }
  else
  {
    rotation = 0;
  }

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${pos?.x}px, ${pos?.y}px, 0) rotate(${rotation}deg)`,
  };

  return (
    <svg id={id} style={styleRoot} height="800px" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-65 8.2278)" fill="#999" stroke="#000" strokeLinejoin="round">
        <rect transform="scale(1,-1)" x="70.798" y="-505.16" width="58.404" height="478.4" rx="0" ry="0" imageRendering="auto" strokeWidth="1.5964" style={{mixBlendMode: 'normal'}}/>
        <rect transform="scale(1,-1)" x="65.694" y="-26.078" width="68.612" height="33.612" ry="5.2732" strokeWidth="1.3882" style={{mixBlendMode: 'normal'}}/>
      </g>
    </svg>
  );
}

function PipeSet({index, pos, spacing})
{
  // const [end, setEnd] = React.useState(false);

  // const startPos = React.useMemo(() => {
  //   function getRandomInt(min, max)
  //   {
  //     min = Math.ceil(min);
  //     max = Math.floor(max);
  //     return Math.floor(Math.random() * (max - min) + min);
  //   }
  
  //   const offset = 1000;
  //   const randomInt = getRandomInt(300, 700);

  //   return {
  //     'up': new Pos({x: (600 * index) + 600, y: randomInt}),
  //     'down': new Pos({x: (600 * index) + 600, y: randomInt - offset}),
  //   };
  // }, [end]);

  let posDown = {...pos};
  if (posDown?.y != null)
  {
    posDown.y -= spacing;
  }

  return (
    <span>
      <Pipe
        id={`${index}_up`}
        pos={pos}
      />
      <Pipe
        id={`${index}_down`}
        pos={posDown}
        rotation={180}
      />
    </span>
  );
}

function PipeGroup()
{
  const [items, setItems] = React.useState([]);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    function getRandomInt(min, max)
    {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    const spacing = 1000;

    let data = [];
    for (let i = 0; i < 6; i++)
    {
      data.push(
        <PipeSet
          key={i}
          index={i}
          pos={new Pos({x: (600 * i) + 600, y: getRandomInt(300, 900)})}
          spacing={spacing}
        />
      );
    }

    setItems(data);
  }, []);

  React.useEffect(() => {
    function move()
    {
      // for (let item of items)
      // {
      //   if (item.props.pos.x > -108.91)
      //   {
      //     item.props.pos.x += -6;
      //   }
      //   else
      //   {
      //     item.props.pos.x += 6*600;
      //   }

      //   // setCollider(new Pos({...collider}));
      //   // context[props?.id] = {
      //   //   'collider': element?.current?.getBoundingClientRect(),
      //   //   'tag': 'obstacle'
      //   // };
      //   // setContext({...context});
      // }

      if (offset > -6*600)
      {
        setOffset(offset - 6);
      }
      else
      {
        setOffset(0);
      }
    };

    engine.requestAnimationFrame(move);
  }, [offset]);

  // console.log(offset);

  // items[0].props.pos.x -= 250;

  // for (let item of items)
  // {
  //   item.props.pos.x = offset;
  // }

  // console.log(items);

  return (
    <>
      <style jsx>{`
        .items
        {
          position: fixed;
          width: 100%;
          height: 100%;
          will-change: transform;
          transform: translate3d(${offset}px, 0, 0px);
        }
      `}</style>
      <span className="items">
        {items}
      </span>
    </>
  );
}
engine.addObject(<PipeGroup />);

function BackgroundImage({style, className})
{
  return (
    <svg className={className} style={style} width="1e3" height="340" version="1.1" viewBox="0 0 264.58 89.958" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -33.928)">
        <g fill-rule="evenodd">
        <rect x="-2.2204e-16" y="33.928" width="264.58" height="89.958" fill="#ffb380"/>
        <g stroke-linejoin="round" stroke-width=".565">
          <rect x="20.847" y="44.619" width="25.925" height="27.261" fill="#cdde87" stroke="#a05a2c"/>
          <circle d="m 40.090429,57.714985 a 6.6817379,8.2853556 0 0 1 -6.345611,8.274865 6.6817379,8.2853556 0 0 1 -6.984047,-7.442325 6.6817379,8.2853556 0 0 1 5.642942,-9.023643 6.6817379,8.2853556 0 0 1 7.551787,6.534451 l -6.546809,1.656652 z" fill="#fc0" stroke="#2b2200"/>
          <circle d="m 35.340773,54.433205 a 1.1339285,0.8504464 0 0 1 -1.076886,0.849369 1.1339285,0.8504464 0 0 1 -1.185232,-0.763914 1.1339285,0.8504464 0 0 1 0.957639,-0.926227 1.1339285,0.8504464 0 0 1 1.281581,0.670725 l -1.111031,0.170047 z" fill="#2b2200" stroke="#2b2200"/>
        </g>
        <g stroke="#24221c" stroke-linejoin="round" stroke-width=".565">
          <rect x="90.872" y="43.817" width="40.625" height="46.505" fill="#afe9dd"/>
          <rect x="90.872" y="43.817" width="12.428" height="34.344" fill="#5fd35f"/>
          <rect x="119.87" y="43.817" width="11.626" height="34.077" fill="#5fd35f"/>
        </g>
        </g>
        <path d="m112.39 90.055-0.13364-46.238" fill="none" stroke="#000" stroke-width=".565"/>
        <path d="m103.43 66.268 16.303-0.13364" fill="none" stroke="#000" stroke-width=".565"/>
        <g fill-rule="evenodd">
        <g stroke="#28170b" stroke-linejoin="round" stroke-width=".565">
          <rect x="159.56" y="74.286" width="86.061" height="2.94" fill="#c87137"/>
          <rect x="170.79" y="61.59" width="7.2163" height="12.428" fill="#ff8080"/>
          <rect x="173.16" y="57.835" width="2.7403" height="3.7325" fill="#de8787"/>
          <rect x="187.69" y="70.21" width="12.428" height="3.8754" fill="#f60"/>
          <rect x="189.56" y="68.74" width="9.0203" height="1.47" fill="#a40"/>
        </g>
        <ellipse transform="scale(-1,1)" cx="-240.79" cy="72.224" rx="3.2327" ry="1.7402" fill="#fc0" stroke="#28220b" stroke-width=".024807"/>
        </g>
        <g stroke="#28220b">
        <ellipse transform="scale(-1,1)" cx="-241.04" cy="73.942" rx=".87823" ry=".46263" fill="#f60" stroke-width=".024846"/>
        <ellipse transform="scale(-1,1)" cx="-238.89" cy="70.34" rx="1.6867" ry="1.293" fill="#fc0" stroke-width=".026525"/>
        <ellipse transform="scale(-1,1)" cx="-237.43" cy="70.663" rx=".4897" ry=".32326" fill="#f60" stroke-width=".026525"/>
        </g>
        <ellipse transform="scale(-1,1)" cx="-238.62" cy="70.175" rx=".31967" ry=".31006" fill="#28220b" stroke-width=".026525"/>
        <path transform="scale(-1,1)" d="m-243.7 71.653a1.095 0.4684 0 0 1-0.61919-0.40742 1.095 0.4684 0 0 1 0.55886-0.42308 1.095 0.4684 0 0 1 1.1354 0.01663" fill="#fc0" stroke="#28220b" stroke-width=".026525"/>
        <path transform="matrix(-.12934 0 0 .069778 253.54 63.73)" d="m92.163 110.46c7.0526-0.57349 13.065-1.0384 18.959 3.5441 2.8957 2.2515-0.93968 8.5576-2.8468 11.41-3.8818 5.8064-7.4472 9.4699-14.606 11.69-3.5174 1.0909-5.0289-0.49088-7.0157-3.2841-4.0439-5.6852-3.3033-11.785-2.8827-19.267 0.20662-3.6764 4.9272-3.8118 8.3922-4.0935z" fill="#fc0" stroke="#28220b" stroke-width=".26458"/>
        <ellipse cx="223.64" cy="70.577" rx="7.2831" ry="3.5079" fill="#ff2a2a" fill-rule="evenodd" stroke="#28170b" stroke-linejoin="round" stroke-width=".565"/>
        <rect x="222.49" y="64.096" width="2.2551" height="2.9901" fill="#ff8080" fill-rule="evenodd" stroke="#28170b" stroke-linejoin="round" stroke-width=".565"/>
        <g fill="#e6e6e6" fill-rule="evenodd" stroke="#28170b" stroke-linejoin="round" stroke-width=".565">
        <rect x="174.26" y="105.16" width="76.573" height="16.972"/>
        <rect x="176.77" y="122.16" width="2.1686" height="1.4375"/>
        <rect x="247.31" y="122.16" width="2.2974" height="1.4366"/>
        <rect x="172.43" y="106.24" width="1.7718" height="1.0631"/>
        </g>
        <rect x="169.5" y="105.18" width="2.9057" height="2.9529" fill="#b3b3b3" fill-rule="evenodd" stroke="#28170b" stroke-linejoin="round" stroke-width=".565"/>
      </g>
    </svg>
  );
}

function Background()
{
  const [x, setX] = React.useState(0);
  let offset = 0;

  React.useEffect(() => {
    engine.requestAnimationFrame(() => {
      let change = x - 0.25;

      if (x < -294)
      {
        offset = offset - 294;
        change = 0;
      }

      setX(change)
    });
  }, [x]);

  return (
    <>
    <style jsx>{`
      .backgroundImage
      {
        position: fixed;
        height: 100%;
        width: 294vh;
        will-change: transform;
      }
    `}</style>
    <BackgroundImage className="backgroundImage" style={{transform: `translate3d(${offset + x}vh, 0, -1px)`}} />
    <BackgroundImage className="backgroundImage" style={{transform: `translate3d(${offset + x-2 + 294}vh, 0, -2px)`}} />
    <BackgroundImage className="backgroundImage" style={{transform: `translate3d(${offset + x+2 + 294}vh, 0, -3px)`}} />
    </>
  );
}
engine.setBackground(<Background />);

engine.start();
