import React from 'react';
import Log from 'loglevel';
import NavLink from './NavLink';
import StoryStore from './StoryStore';

require('./App.css');

const URL = 'https://github.com/kamidox/react-hacker-news';
const log = Log.getLogger('view');

class App extends React.Component {
  static handleBeforeUnload() {
    StoryStore.save();
  }

  componentWillMount() {
    log.debug(`App component will mount for window ${window}`);
    StoryStore.load();
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', App.handleBeforeUnload);
    }
  }

  componentWillUnmount() {
    log.debug(`App component will unmount for window ${window}`);
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', App.handleBeforeUnload);
    }
  }

  render() {
    log.debug('App component render');
    return (
      <div className="app">
        <div className="header">
          <a href={URL} className="header__logo">
            <img src="imgs/favicon.ico" alt="" width="16px" />
          </a>
          <NavLink to="/" onlyActiveOnIndex className="homelink">
          Hacker News</NavLink>
          <NavLink to="/news">News</NavLink>{' | '}
          <NavLink to="/best">Best</NavLink>{' | '}
          <NavLink to="/show">Show</NavLink>{' | '}
          <NavLink to="/jobs">Jobs</NavLink>{' | '}
          <NavLink to="/ask">Ask</NavLink>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <div className="footer">
          <a href={URL}>kamidox/react-hacker-news</a>
        </div>
      </div>
    );
  }
}

export default App;
