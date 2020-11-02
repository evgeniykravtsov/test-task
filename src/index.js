import React from 'react';
import ReactDOM from 'react-dom';
import {Task1} from './Task1/Task1';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import {Task2} from './Task2/Task2';
import style from './index.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <Router> 
      <header className={style.header}>
        <Link to="/">Task1</Link>
        <Link to="/Task2">Task2</Link>
      </header>
      <Route exact path="/" component={Task1} />        
      <Route exact path="/Task2" component={Task2} /> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

