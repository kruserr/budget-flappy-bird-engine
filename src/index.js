import './index.css';

import Engine from './classes/Engine/Engine';
import GameObject from './components/GameObject/GameObject';
import BoxCollider from './classes/BoxCollider/BoxCollider';


const engine = new Engine();

let space = false;

document.addEventListener(
  'keydown',
  (event) => {
    if(event.key === ' ')
    {
      space = true;
    }
  }
);

document.addEventListener(
  'keyup',
  (event) => {
    if(event.key === ' ')
    {
      space = false;
    }
  }
);

const heroRender = (self) => {
  if (space)
  {
    if (self.boxCollider.getY() > -12)
    {
      self.boxCollider.setY(-0.6);
    }
  }
  else
  {
    if (self.boxCollider.getY() < 100)
    {
      self.boxCollider.setY(0.3);
    }
  }

  const styleRoot = {
    position: `fixed`,
    color: `yellow`,
    willChange: `transform`,
    fontSize: `10vh`,
    transform: `translate3d(${self.boxCollider.getX()}vw, ${self.boxCollider.getY()}vh, 0)`,
  };
  
  return (
    <span style={styleRoot}>
      {`(^)>`}
    </span>
  );
};

const hero = (
  <GameObject
    lambda = {heroRender}
    boxCollider = {new BoxCollider({x: 2.5, y: 37.9, width: 25, height: 25})}
  />
);
engine.addObject(hero);

engine.start();
