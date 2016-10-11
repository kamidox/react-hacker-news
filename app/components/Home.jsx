import React from 'react';
import log from 'loglevel';
import StoryStore from './StoryStore';
import Paginator from './Paginator';

class Home extends React.Component {
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
    log.info(`${this.props.type}: componentWillMount`);
    this.store = new StoryStore(this.props.type);
    this.store.addListener('update', this.handleStoryUpdate);
    this.store.fetchStory();
    this.setState(this.store.getState());
  }

  componentWillUnmount() {
    log.info(`${this.props.type}: componentWillUnmount`);
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
    const page = this.getPage(50, this.state.ids.length);
    log.info(`${this.props.type}: render page ${page.page}`);
    for (let i = page.startIndex; i < page.endIndex; i += 1) {
      items.push(<li key={this.state.ids[i]}>{this.state.ids[i]}</li>);
    }
    return (
      <div>
        <div>Hacker News Home</div>
        <ol className="Item__list" start={page.startIndex + 1}>
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

Home.propTypes = {
  type: React.PropTypes.string
};

Home.defaultProps = {
  type: 'newstories'
};


export default Home;
