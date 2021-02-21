import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import Engine from './classes/Engine/Engine';
import GameObject from './components/GameObject/GameObject';
import EventList from './classes/EventList/EventList';
import Action from './classes/Action/Action';


const engine = new Engine();
const eventList = new EventList();

const hero = new GameObject({
  actions: [
    new Action({
      event: eventList.getEvent('true'),
      lambda: (self) => {
        console.log('Hero - Event true');

        let data = self.state;
        data['text'] = 'text';
      }
    })
  ],
  lambda: (self) => {
    console.log(self);

    const styleRoot = {
      color: `green`,
    };

    return (
      <div style={styleRoot}>
        {self.state.text}
      </div>
    );
  }
});
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
// reportWebVitals(console.log);
