import React from 'react';
import Log from 'loglevel';
import StoryStore from './StoryStore';
import { renderTitle, renderMeta } from './Utils';

const logView = Log.getLogger('view');
const logCtrl = Log.getLogger('controller');

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
    logCtrl.debug(`story list item updated for ${item.id}`);
    this.setState({ item });
  }

  render() {
    const item = this.state.item;
    logView.debug(`story list item render ${this.props.itemId} : ${item}`);
    if (!item) {
      return <li key={this.props.itemId}>loading item {this.props.itemId} ...</li>;
    }
    return (
      <li key={this.props.itemId}>
        <div className="item">
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
