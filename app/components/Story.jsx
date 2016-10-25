import React from 'react';
import Log from 'loglevel';
import { StoryStore } from './DataStore';
import StoryList from './StoryList';

const logView = Log.getLogger('view');

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      stories: []
    };

    // manual binding callbacks
    this.handleStoryUpdate = this.handleStoryUpdate.bind(this);
  }

  componentWillMount() {
    logView.debug(`${this.props.type}: componentWillMount`);
    this.store = new StoryStore(this.props.type);
    this.store.addListener('update', this.handleStoryUpdate);
    this.store.fetchStory();
    this.setState(this.store.getState());
  }

  componentWillUnmount() {
    logView.debug(`${this.props.type}: componentWillUnmount`);
    this.store.removeListener('update', this.handleStoryUpdate);
    this.store.stop();
    this.store = null;
  }

  handleStoryUpdate(state) {
    this.setState(state);
  }

  render() {
    return <StoryList ids={this.state.ids} location={this.props.location} />;
  }
}

Story.propTypes = {
  type: React.PropTypes.string
};

Story.defaultProps = {
  type: 'newstories'
};


export default Story;
