import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Story from './Story';
import App from './App';
import Item from './Item';
import User from './User';

function stories(type) {
  return props => <Story {...props} type={type} />;
}

const home = stories('topstories');
const news = stories('newstories');
const best = stories('beststories');
const show = stories('showstories');
const jobs = stories('jobstories');
const asks = stories('askstories');

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={home} />
    <Route path="/news" component={news} />
    <Route path="/best" component={best} />
    <Route path="/show" component={show} />
    <Route path="/ask" component={asks} />
    <Route path="/jobs" component={jobs} />
    <Route path="/story/:id" component={Item} />
    <Route path="/user/:id" component={User} />
  </Route>
);

export default routes;
