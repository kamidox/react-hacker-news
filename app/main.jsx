import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './components/Routes';

log.setLevel('error');
log.getLogger('net').setLevel('error');
log.getLogger('view').setLevel('error');
log.getLogger('model').setLevel('error');
log.getLogger('controller').setLevel('error');

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.body.appendChild(document.createElement('div'))
);
