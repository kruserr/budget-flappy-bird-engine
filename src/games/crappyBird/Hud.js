import React from 'react';


export default function Hud()
{
  const elem = React.useRef();
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [lastScoreId, setLastScoreId] = React.useState('');

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
      }
    }

    document.addEventListener('isColliding', eventHandler);

    return () => document.removeEventListener('isColliding', eventHandler);
  }, [lastScoreId]);


  return (
    <>
      <div
        ref={elem}
        style={{
          'color': '#FFF',
          'fontSize': '4vh',
          'textShadow': '0vh 0.4vh #333',
          'fontWeight': '600',
          'textAlign': 'center',
          'marginTop': '5vh',
        }}
      >
        <h2>{score}</h2>
        {gameOver &&
          <h1 style={{'marginTop': '33vh'}}>Game Over</h1>
        }
      </div>
    </>
  );
}
