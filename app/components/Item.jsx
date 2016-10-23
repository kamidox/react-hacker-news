import React from 'react';
import Log from 'loglevel';
import { ItemStore } from './DataStore';
import Comment from './Comment';
import { renderTitle, renderMeta, renderText } from './Utils';

const log = Log.getLogger('controller');

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ItemStore.getCacheItem(Number(props.params.id))
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  componentWillMount() {
    this.store = new ItemStore();
    this.store.fetchItem(this.props.params.id);
    this.store.addListener(this.props.params.id, this.handleItemUpdate);
  }

  componentWillUnmount() {
    if (!this.store) {
      return;
    }
    this.store.removeListener(this.props.params.id, this.handleItemUpdate);
    this.store = null;
  }

  handleItemUpdate(item) {
    log.debug(`item updated for ${item.id}`);
    this.setState({ item });
  }

  render() {
    const item = this.state.item;
    if (!item) {
      return <div className="item">Something goes wrong. Item is null!</div>;
    }
    const kids = [];
    item.kids.forEach(kid => kids.push(
      <Comment key={kid} id={kid} level={0} store={this.store} />));
    return (
      <div className="item">
        <div className="item__content">
          {renderTitle(item)}
          {renderMeta(item)}
          {renderText(item)}
        </div>
        <div className="item__kids">
          {kids}
        </div>
      </div>
    );
  }
}

export default Item;
