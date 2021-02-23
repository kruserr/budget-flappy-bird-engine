import './index.css';

import Engine from './classes/Engine/Engine';
import GameObject from './components/GameObject/GameObject';
import Event from './classes/Event/Event';
import EventList from './classes/EventList/EventList';
import Action from './classes/Action/Action';
import BoxCollider from './classes/BoxCollider/BoxCollider';


const engine = new Engine();
const eventList = new EventList();

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

const heroJump = new Action({
  event: new Event({
    name: '',
    lambda: (self) => {
      return space;
    }
  }),
  lambda: (self) => {
    if (self.boxCollider.getY() > 0)
    {
      self.boxCollider.setY(-0.6);
    }
  }
});

const heroGravity = new Action({
  event: new Event({
    name: '',
    lambda: (self) => {
      return true;
    }
  }),
  lambda: (self) => {
    if (self.boxCollider.getY() < 87.8)
    {
      self.boxCollider.setY(0.2);
    }
  }
});

const heroRender = (self) => {
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
    actions = {[
      heroGravity,
      heroJump,
    ]}
    lambda = {heroRender}
    boxCollider = {new BoxCollider({x: 2.5, y: 37.9, width: 25, height: 25})}
  />
);
engine.addObject(hero);

engine.start();
