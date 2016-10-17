import React from 'react';
import StoryStore from './StoryStore';
import Comment from './Comment';
import { renderTitle, renderMeta, renderText } from './Utils';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: StoryStore.getCacheItem(Number(props.params.id))
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  componentWillMount() {
    if (!this.state.item) {
      return;
    }
    this.store = new StoryStore(this.state.item.type);
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
    this.setState({ item });
  }

  render() {
    const item = this.state.item;
    if (!item) {
      return <div className="list-item">Something goes wrong. Item is null!</div>;
    }
    const kids = [];
    item.kids.forEach(kid => kids.push(
      <Comment key={kid} id={kid} level={0} store={this.store} />));
    return (
      <div className="list-item">
        <div className="list-item__content">
          {renderTitle(item)}
          {renderMeta(item)}
          {renderText(item)}
        </div>
        <div className="list-item__kids">
          {kids}
        </div>
      </div>
    );
  }
}

export default Item;
