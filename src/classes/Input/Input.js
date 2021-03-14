import Engine from '../Engine/Engine';


export default function Input()
{
  let keyDownLock = false;

  function clicked()
  {
    Engine.getEvent().dispatch(new CustomEvent('playerInput'));
  }

  Engine.getEvent().listen('pointerdown', () => clicked());
  Engine.getEvent().listen('keydown', (event) => {
    if (event.key !== ' ' || keyDownLock)
    {
      return;
    }
    
    keyDownLock = true;

    clicked();
  });
  Engine.getEvent().listen('keyup', (event) => {
    if (event.key !== ' ')
    {
      return;
    }
    
    keyDownLock = false;
  });

  function disableEvent(event)
  {
    event.preventDefault();
  }

  document.onmousedown = (event) => disableEvent(event);
  document.onmouseenter = (event) => disableEvent(event);
  document.onmouseleave = (event) => disableEvent(event);
  document.onmousemove = (event) => disableEvent(event);
  document.onmouseout = (event) => disableEvent(event);
  document.onmouseover = (event) => disableEvent(event);
  document.onmouseup = (event) => disableEvent(event);

  document.ontouchend = (event) => disableEvent(event);
  document.ontouchmove = (event) => disableEvent(event);
  document.ontouchcancel = (event) => disableEvent(event);
  document.ontouchstart = (event) => disableEvent(event);

  document.onpointerover = (event) => disableEvent(event);
  document.onpointerenter = (event) => disableEvent(event);
  document.onpointermove = (event) => disableEvent(event);
  document.onpointerup = (event) => disableEvent(event);
  document.onpointercancel = (event) => disableEvent(event);
  // document.onpointerdown = (event) => disableEvent(event);
  document.onpointerout = (event) => disableEvent(event);
  document.onpointerleave = (event) => disableEvent(event);
  document.ongotpointercapture = (event) => disableEvent(event);
  document.onlostpointercapture = (event) => disableEvent(event);
}
