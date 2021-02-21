import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import Engine from './components/Engine/Engine';
import GameObject from './components/GameObject/GameObject';


class Hero extends GameObject
{
  renderHook()
  {
    const styleRoot = {
      color: `green`,
    };

    return (
      <div style={styleRoot}>
        Hero
      </div>
    );
  }
}

const engine = new Engine();
const hero = new Hero();

engine.addObject(hero);

engine.start();


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
