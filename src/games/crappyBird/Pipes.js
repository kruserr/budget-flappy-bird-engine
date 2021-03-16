import React from 'react';
import Engine from '../../classes/Engine/Engine';


function Pipe({id, pos, rotation, score})
{
  const [context, setContext] = React.useContext(Engine.getContext());

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };

    if (score)
    {
      context[`${id}_score`] = {
        'tag': 'score'
      };
    }

    setContext({...context});
  }, []);

  if (!rotation)
  {
    rotation = 0;
  }

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${pos?.x}vh, ${pos?.y}vh, 0) rotate(${rotation}deg)`,
  };

  return (
    <div style={styleRoot}>
      <svg id={id} height="100vh" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-65 8.2278)" fill="#999" stroke="#000" strokeLinejoin="round">
          <rect transform="scale(1,-1)" x="70.798" y="-505.16" width="58.404" height="478.4" rx="0" ry="0" imageRendering="auto" strokeWidth="1.5964" style={{mixBlendMode: 'normal'}}/>
          <rect transform="scale(1,-1)" x="65.694" y="-26.078" width="68.612" height="33.612" ry="5.2732" strokeWidth="1.3882" style={{mixBlendMode: 'normal'}}/>
        </g>
      </svg>
      {score &&
      <span
        id={`${id}_score`}
        style={{
          position: 'fixed',
          willChange: 'transform',
          transform: 'translate3d(0, -30vh, 0px)',
          height: '40vh',
          width: '0.1vh',
        }}
      />
      }
    </div>
  );
}

function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getStartPos(index, offset, min, max)
{
  return Engine.getPos({
    x: ((offset * index) + offset),
    y: getRandomInt(min, max),
  });
}

function PipeSet({index, offset, spacing, numberOfPipes, min, max, speed})
{
  const [end, setEnd] = React.useState(false);
  const [pos, setPos] = React.useState(getStartPos(index, offset + 3.5, min, max));

  React.useEffect(() => {
    if (end)
    {
      setPos(getStartPos(numberOfPipes - 1, offset, min, max));
    }
  }, [end]);

  React.useEffect(() => {
    function move()
    {
      if (pos.x > -12.7)
      {
        pos.x += (-speed) * Engine.getTime().getTimeScale();
      }
      else
      {
        setEnd(!end);
      }

      setPos(Engine.getPos({...pos}));
    };

    Engine.fixedUpdate(move);
  }, [pos]);

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
        score={true}
      />
      <Pipe
        id={`${index}_down`}
        pos={posDown}
        rotation={180}
      />
    </span>
  );
}

function Ground({id})
{
  const [context, setContext] = React.useContext(Engine.getContext());

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };
    setContext({...context});
  }, []);

  return(
    <>
      <style jsx>{`
        // .groundImageContainer
        // {
        //   height: 100%;
        //   width: ${2*200}vh;
        //   background: #f4d7d7;
        //   transform: translate3d(0vh, 79.66vh, -1px);
        // }

        // .groundImage
        // {
        //   height: 100%;
        //   width: 200vh;
        //   will-change: transform;
        // }

        .groundImageContainer
        {
          height: 1vh;
          width: 100vh;
          transform: translate3d(0vh, 100vh, -1px);
        }
      `}</style>
      <div id={id} className="groundImageContainer" />
    </>
  );
}

export default function Pipes()
{
  const offset = 45;
  const spacing = 122;
  const numberOfPipes = 6;
  const min = 29;
  const max = 92;
  const speed = 0.34;

  let items = [];
  for (let i = 0; i < numberOfPipes; i++)
  {
    items.push(
      <PipeSet
        key={i}
        index={i}
        offset={offset}
        spacing={spacing}
        numberOfPipes={numberOfPipes}
        min={min}
        max={max}
        speed={speed}
      />
    );
  }

  const styleRoot = {

  };

  return (
    <>
      <span style={styleRoot}>
        {items}
      </span>
      <Ground id={'slapId_background_0'} />
    </>
  );
}
