import React from 'react';
import './index.css';

import Engine from './classes/Engine/Engine';

import Bird from './games/crappyBird/Bird';
import Pipes from './games/crappyBird/Pipes';
import Background from './games/crappyBird/Background';


const engine = new Engine();

engine.addObject(<Bird engine={engine} />);
engine.addObject(<Pipes engine={engine} />);
engine.setBackground(<Background engine={engine} />);

engine.start();
