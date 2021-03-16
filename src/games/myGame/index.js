import Engine from '../../classes/Engine/Engine';


function Hero()
{
  return (
    <>
      <h1 style={{color: 'green'}}>Hero</h1>
    </>
  );
}

Engine.addObject(<Hero />);

Engine.start();
