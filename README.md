# Slap the Bird Engine
### The game engine for web developers

<br>

# Demo
https://slap-the-bird.github.io/

<br>

# Get the engine
```
git clone https://github.com/Slap-the-Bird/slap-the-bird-engine.git
cd slap-the-bird-engine
npm install
npm run start
```

# Develop your own game
- Go to the file `./src/index.js`
    - Uncomment `myGame` and comment `crappyBird`
        ```
        // import './games/crappyBird/index';
        import './games/myGame/index';
        ```
- Go to the file `./src/games/myGame/index.js`
    - Start creating React Components
- Explore the Engine API with code completion
    ```
    Engine.
    ```

## Example

`./src/games/myGame/index.js`
```
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
```

<br>


# Test Coverage Report
```
 PASS  src/classes/Input/Input.test.ts
 PASS  src/classes/Engine/Engine.test.js
 PASS  src/classes/Physics/Physics.test.ts
 PASS  src/classes/Data/Data.test.js
 PASS  src/classes/Time/Time.test.ts
 PASS  src/classes/Pos/Pos.test.ts
 PASS  src/classes/AudioSystem/AudioSystem.test.js
 PASS  src/classes/EventSystem/EventSystem.test.ts
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |                   
 AudioSystem     |     100 |      100 |     100 |     100 |                   
  AudioSystem.ts |     100 |      100 |     100 |     100 |                   
 Data            |     100 |      100 |     100 |     100 |                   
  Data.js        |     100 |      100 |     100 |     100 |                   
 Engine          |     100 |      100 |     100 |     100 |                   
  Engine.tsx     |     100 |      100 |     100 |     100 |                   
 EventSystem     |     100 |      100 |     100 |     100 |                   
  EventSystem.ts |     100 |      100 |     100 |     100 |                   
 Input           |     100 |      100 |     100 |     100 |                   
  Input.js       |     100 |      100 |     100 |     100 |                   
 Physics         |     100 |      100 |     100 |     100 |                   
  Physics.ts     |     100 |      100 |     100 |     100 |                   
 Pos             |     100 |      100 |     100 |     100 |                   
  Pos.ts         |     100 |      100 |     100 |     100 |                   
 Time            |     100 |      100 |     100 |     100 |                   
  Time.ts        |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------

Test Suites: 8 passed, 8 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        5.252 s
Ran all test suites.
```

<br>

# Use Case Diagram
<img src="doc/use_case.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Activity Diagram
<img src="doc/activity.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Communication Diagram
<img src="doc/communication.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Deployment Diagram
<img src="doc/deployment.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Game Loop Sequence Diagram
<img src="doc/game_loop.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Engine Architecture Diagram
<img src="doc/engine_architecture.png" />
<br/>
<br/>
<br/>
<br/>

# Render Loop Sequence Diagram
<img src="doc/render_loop.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Class Diagram
<img src="doc/class.drawio.svg" />
<br/>
<br/>
<br/>
<br/>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
