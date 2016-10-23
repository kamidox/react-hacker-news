import React from 'react';
import Spinner from 'react-spinkit';
import Log from 'loglevel';
import { ItemStore } from './DataStore';
import { renderTitle, renderMeta } from './Utils';

const logView = Log.getLogger('view');
const logCtrl = Log.getLogger('controller');

class StoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: ItemStore.getCacheItem(this.props.itemId)
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  componentWillMount() {
    // update story list item
    this.store = new ItemStore();
    this.store.fetchItem(this.props.itemId);
    this.store.addListener(this.props.itemId, this.handleItemUpdate);
  }

  componentWillUnmount() {
    this.store.removeListener(this.props.itemId, this.handleItemUpdate);
  }

  handleItemUpdate(item) {
    logCtrl.debug(`story list item updated for ${item.id}`);
    this.setState({ item });
  }

  render() {
    const item = this.state.item;
    logView.debug(`story list item render ${this.props.itemId} : ${item}`);
    if (!item) {
      return (
        <li key={this.props.itemId}>
          <Spinner spinnerName="circle" noFadeIn />
          loading item {this.props.itemId} ...
        </li>);
    }
    if (!item.title) {
      logView.info(`skip story item with empty title: type=${item.type} id=${item.id}`);
      return null;
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
  itemId: React.PropTypes.number.isRequired
};

export default StoryListItem;
