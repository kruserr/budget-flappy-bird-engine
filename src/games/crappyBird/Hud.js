import React from 'react';
import Engine from '../../classes/Engine/Engine';


export default function Hud()
{
  const [start, setStart] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [lastScoreId, setLastScoreId] = React.useState('');
  const [restart, setRestart] = React.useState(false);

  React.useEffect(() => {
    function handlePlayerInput()
    {
      if (!start)
      {
        setStart(true);
      }
      else if (start && restart)
      {
        Engine.restart();
      }
    }

    Engine.getEvent().listen('playerInput', handlePlayerInput);

    return () => Engine.getEvent().remove('playerInput', handlePlayerInput);
  }, [start, restart]);

  React.useEffect(() => {
    function eventHandler(event)
    {
      let items = event?.detail?.items;

      if (items[0]?.tag == 'player' && items[1]?.tag == 'score')
      {
        if (items[1]?.id != lastScoreId)
        {
          setScore(score => ++score);
          setLastScoreId(items[1]?.id);
        }
      }

      if (items[0]?.tag == 'player' && items[1]?.tag == 'obstacle')
      {
        setGameOver(true);
        setRestart(true);
      }
    }

    Engine.getEvent().listen('isColliding', eventHandler);

    return () => Engine.getEvent().remove('isColliding', eventHandler);
  }, [lastScoreId]);

  React.useEffect(() => {
    if (start)
    {
      Engine.getTime().start();
    }
    else
    {
      Engine.getTime().stop();
    }
  }, [start]);

  return (
    <>
      <div style={{'width': '100vw', 'height': '100vh'}}>
        <div
          style={{
            'color': '#FFF',
            'fontSize': '4vh',
            'textShadow': '0vh 0.4vh #333',
            'fontWeight': '600',
            'textAlign': 'center',
            'marginTop': '8.5vh',
          }}
        >
          <h2>{score}</h2>
          <h1 style={{'marginTop': '28vh', 'height': '9.5vh'}}>{gameOver && 'Game Over'}</h1>
          {(!start || gameOver) &&
          <span>
            <span>
              <svg style={{'transform': 'rotate(90deg)', 'marginTop': '18vh'}} height="4.25vh" version="1.1" viewBox="0 0 5.8304 5.6861" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-81.253 -98.706)">
                  <path d="m84.593 103.95-0.28127 0.28128c-0.11909 0.11907-0.31168 0.11907-0.42952 0l-2.463-2.4618c-0.11909-0.11905-0.11909-0.31171 0-0.42949l2.463-2.4631c0.1191-0.11909 0.31168-0.11909 0.42952 0l0.28127 0.28127c0.12036 0.12037 0.11784 0.31675-0.0051 0.43458l-1.5267 1.4545h3.6413c0.16851 0 0.30408 0.13551 0.30408 0.30408v0.40545c0 0.16852-0.13557 0.30408-0.30408 0.30408h-3.6413l1.5267 1.4545c0.12417 0.11779 0.12669 0.3142 0.0051 0.43456z" fill="#fff" stroke="#000" strokeWidth=".15415"/>
                </g>
              </svg>
            </span>
            <h4 style={{'marginTop': '0px'}}>{gameOver ? 'Touch to Restart' : 'Touch to Start'}</h4>
          </span>
          }
        </div>
      </div>
    </>
  );
}
