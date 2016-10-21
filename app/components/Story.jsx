import React from 'react';
import Log from 'loglevel';
import StoryStore from './StoryStore';
import Paginator from './Paginator';
import StoryListItem from './StoryListItem';

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

  getPage(pageSize, numItems) {
    let page = this.props.location.query.page;
    page = (page && /^\d+$/.test(page) ? Math.max(1, Number(page)) : 1);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(numItems, (startIndex + pageSize));
    const hasNext = endIndex < numItems;
    return { page, startIndex, endIndex, hasNext };
  }

  handleStoryUpdate(state) {
    this.setState(state);
  }

  render() {
    const items = [];
    const page = this.getPage(30, this.state.ids.length);
    const ids = this.state.ids;
    logView.debug(`${this.props.type}: render page ${page.page}`);
    for (let i = page.startIndex; i < page.endIndex; i += 1) {
      items.push(
        <StoryListItem key={ids[i]} itemId={ids[i]} store={this.store} />);
    }
    if (items.length === 0) {
      items.push(<div key={this.props.type}>{`loading ${this.props.type} ...`}</div>);
    }
    return (
      <div>
        <ol className="storylist" start={page.startIndex + 1}>
          {items}
        </ol>
        <Paginator
          pathname={this.props.location.pathname}
          page={page.page}
          hasNext={page.hasNext}
        />
      </div>
    );
  }
}

Story.propTypes = {
  type: React.PropTypes.string
};

Story.defaultProps = {
  type: 'newstories'
};


export default Story;
