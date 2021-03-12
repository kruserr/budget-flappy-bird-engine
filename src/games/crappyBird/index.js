import React from 'react';

import Engine from '../../classes/Engine/Engine';

import Bird from './Bird';
import Pipes from './Pipes';
import Background from './Background';


Engine.addObject(<Bird />);
Engine.addObject(<Pipes />);
Engine.setBackground(<Background engine={Engine} />);

Engine.start();
