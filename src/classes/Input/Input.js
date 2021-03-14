let keyDownLock = false;

function clicked()
{
  document.dispatchEvent(new CustomEvent('playerInput'));
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
