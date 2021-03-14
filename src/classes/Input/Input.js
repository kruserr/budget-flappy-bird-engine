import Engine from '../Engine/Engine';


export default function Input()
{
  let keyDownLock = false;

  function clicked()
  {
    Engine.getEvent().dispatch(new CustomEvent('playerInput'));
  }

  Engine.getEvent().listen("mousedown", () => clicked());
  Engine.getEvent().listen("touchstart", () => clicked());
  Engine.getEvent().listen(
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
  Engine.getEvent().listen(
    "keyup",
    (event) => {
      if (event.key !== ' ')
      {
        return;
      }
      
      keyDownLock = false;
    }
  );
}
