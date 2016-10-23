import React from 'react';
import Spinner from 'react-spinkit';
import classNames from 'classnames';
import Log from 'loglevel';
import { ItemStore } from './DataStore';
import { renderCommentMeta, renderCommentText } from './Utils';

const logCtrl = Log.getLogger('controller');
const logView = Log.getLogger('view');

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: ItemStore.getCacheItem(props.id)
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentWillMount() {
    this.props.store.fetchItem(this.props.id);
    this.props.store.addListener(this.props.id, this.handleItemUpdate);
  }

  componentWillUnmount() {
    this.props.store.removeListener(this.props.id, this.handleItemUpdate);
  }

  handleItemUpdate(item) {
    logCtrl.debug(`comment updated for ${item.id}`);
    this.setState({ item });
  }

  toggleCollapse(e) {
    e.preventDefault();
    logCtrl.debug(`toogle collapse for comment ${this.props.id}`);
    this.props.store.toggleCollapse(this.props.id);
  }

  render() {
    logView.debug(`Comment component render for item ${this.state.item}`);
    if (!this.state.item) {
      return (
        <div className={`comment comment--level${this.props.level}`}>
          <div className="comment__content">
            <Spinner spinnerName="circle" noFadeIn />
            {`loading comment ${this.props.id}`}
          </div>
        </div>
      );
    }
    const item = this.state.item;
    const id = this.props.id;
    const level = this.props.level;
    const store = this.props.store;
    const collapsed = ItemStore.isCollapsed(id);
    const childCount = ItemStore.childCount(id) + 1;
    const className = classNames('comment', `comment--level${level}`, {
      'comment--collapsed': collapsed,
    });

    return (
      <div className={className}>
        <div className="comment__content">
          {renderCommentMeta(item, collapsed, childCount, this.toggleCollapse)}
          {renderCommentText(item)}
        </div>
        {item.kids && <div className="comment__kids">
          {item.kids.map(kid =>
            <Comment
              key={kid}
              id={kid}
              level={level + 1}
              store={store}
            />)}
        </div>}
      </div>
    );
  }
}

Comment.propTypes = {
  id: React.PropTypes.number.isRequired,
  level: React.PropTypes.number.isRequired,
  store: React.PropTypes.instanceOf(ItemStore).isRequired
};

export default Comment;
