import React from 'react';
import styles from './App.module.css';

import Template from './components/Template/Template';


export default class App extends React.Component
{
    render()
    {
        return (
          <div className={styles.root}>
            <Template />
          </div>
        );
    }
}
