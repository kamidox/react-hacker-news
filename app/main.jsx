import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Show from './components/Show';
import Jobs from './components/Jobs';
import Ask from './components/Ask';

log.setDefaultLevel('trace');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/show" component={Show} />
      <Route path="/ask" component={Ask} />
      <Route path="/jobs" component={Jobs} />
    </Route>
  </Router>,
  document.body.appendChild(document.createElement('div'))
);
