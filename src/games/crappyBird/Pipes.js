import React from 'react';

import ctx from '../../classes/Data/Data';
import Pos from '../../classes/Pos/Pos';


function Pipe({id, pos, rotation})
{
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };
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
    <svg id={id} style={styleRoot} height="800px" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-65 8.2278)" fill="#999" stroke="#000" strokeLinejoin="round">
        <rect transform="scale(1,-1)" x="70.798" y="-505.16" width="58.404" height="478.4" rx="0" ry="0" imageRendering="auto" strokeWidth="1.5964" style={{mixBlendMode: 'normal'}}/>
        <rect transform="scale(1,-1)" x="65.694" y="-26.078" width="68.612" height="33.612" ry="5.2732" strokeWidth="1.3882" style={{mixBlendMode: 'normal'}}/>
      </g>
    </svg>
  );
}

function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getStartPos(index, offset)
{
  return new Pos({
    x: (offset * index) + offset,
    y: getRandomInt(300, 700),
  });
}

function PipeSet({engine, index, offset, spacing})
{
  const [end, setEnd] = React.useState(false);
  const [pos, setPos] = React.useState(getStartPos(index, offset));

  React.useEffect(() => {
    setPos(getStartPos(5, offset));
  }, [end]);

  React.useEffect(() => {
    function move()
    {
      if (pos.x > -108.91)
      {
        pos.x += -6;
      }
      else
      {
        setEnd(!end);
      }

      setPos({...pos});
    };

    engine.requestAnimationFrame(move);
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
      />
      <Pipe
        id={`${index}_down`}
        pos={posDown}
        rotation={180}
      />
    </span>
  );
}

export default function Pipes({engine})
{
  const offset = 600;
  const spacing = 1000;

  let items = [];
  for (let i = 0; i < 6; i++)
  {
    items.push(
      <PipeSet
        key={i}
        engine={engine}
        index={i}
        data={{i: i}}
        offset={offset}
        spacing={spacing}
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
