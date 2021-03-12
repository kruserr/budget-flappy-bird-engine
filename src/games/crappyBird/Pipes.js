import React from 'react';

import Engine from '../../classes/Engine/Engine';
import ctx from '../../classes/Data/Data';
import Pos from '../../classes/Pos/Pos';


function Pipe({id, pos, rotation, score})
{
  const [context, setContext] = React.useContext(ctx);

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
    transform: `translate3d(${pos?.x}px, ${pos?.y}px, 0) rotate(${rotation}deg)`,
  };

  return (
    <div style={styleRoot}>
      <svg id={id} height="800px" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
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
          transform: 'translate3d(0, -208px, 0px)',
          height: '220px',
          width: '10px',
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
  return new Pos({
    x: (offset * index) + offset,
    y: getRandomInt(min, max),
  });
}

function PipeSet({index, offset, spacing, numberOfPipes, min, max, speed})
{
  const [end, setEnd] = React.useState(false);
  const [pos, setPos] = React.useState(getStartPos(index, offset, min, max));

  React.useEffect(() => {
    if (end)
    {
      setPos(getStartPos(numberOfPipes - 1, offset, min, max));
    }
  }, [end]);

  React.useEffect(() => {
    function move()
    {
      if (pos.x > -108.91)
      {
        pos.x += -speed;
      }
      else
      {
        setEnd(!end);
      }

      setPos(new Pos({...pos}));
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

export default function Pipes()
{
  const offset = 600;
  const spacing = 975;
  const numberOfPipes = 6;
  const min = 235;
  const max = 720;
  const speed = 4;

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
    <span style={styleRoot}>
      {items}
    </span>
  );
}
