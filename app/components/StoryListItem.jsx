import React from 'react';
import TimeAgo from 'react-timeago';
import urlParse from 'url-parse';
import log from 'loglevel';
import StoryStore from './StoryStore';

function hostName(url) {
  return urlParse(url, true).hostname;
}

function postTime(secs) {
  return <TimeAgo date={secs * 1000} />;
}

class StoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: StoryStore.getCacheItem(this.props.itemId)
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  componentWillMount() {
    // update story list item
    this.props.store.fetchItem(this.props.itemId);
    this.props.store.addListener(this.props.itemId, this.handleItemUpdate);
  }

  componentWillUnmount() {
    this.props.store.removeListener(this.props.itemId, this.handleItemUpdate);
  }

  handleItemUpdate(item) {
    this.setState({ item });
  }

  render() {
    const item = this.state.item;
    log.info(`story list item render ${this.props.itemId} : ${item}`);
    if (!item) {
      return <li key={this.props.itemId}>loading item {this.props.itemId} ...</li>;
    }
    return (
      <li key={this.props.itemId}>
        <div className="list-item">
          <div className="list-item__title">
            <a href={item.url}>{item.title}</a>{' '}
            <span className="list-item__host">
              <a href={item.url}>{`(${hostName(item.url)})`}</a>
            </span>
          </div>
          <div className="list-item__meta">
            {item.score} points by {item.by} {postTime(item.time)} | {item.descendants} comments.
          </div>
        </div>
      </li>
    );
  }
}

StoryListItem.propTypes = {
  itemId: React.PropTypes.number.isRequired,
  store: React.PropTypes.instanceOf(StoryStore).isRequired
};

export default StoryListItem;
