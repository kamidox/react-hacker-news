import React from 'react';
import log from 'loglevel';
import StoryStore from './StoryStore';
import { renderTitle, renderMeta } from './Utils';

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
          {renderTitle(this.state.item)}
          {renderMeta(this.state.item)}
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
