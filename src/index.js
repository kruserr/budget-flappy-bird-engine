import React from 'react';
import './index.css';

import Engine from './classes/Engine/Engine';

import Bird from './games/crappyBird/Bird';
import Pipes from './games/crappyBird/Pipes';
import Background from './games/crappyBird/Background';


Engine.addObject(<Bird />);
Engine.addObject(<Pipes />);
Engine.setBackground(<Background engine={Engine} />);

Engine.start();
