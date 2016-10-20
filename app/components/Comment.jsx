import React from 'react';
import classNames from 'classnames';
import StoryStore from './StoryStore';
import { renderCommentMeta, renderCommentText } from './Utils';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: StoryStore.getCacheItem(props.id)
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
    this.setState({ item });
  }

  toggleCollapse(e) {
    e.preventDefault();
    this.props.store.toggleCollapse(this.props.id);
  }

  render() {
    if (!this.state.item) {
      return (
        <div className={`comment comment--level${this.props.level}`}>
          <div className="comment__content">
            {`loading comment ${this.props.id}`}
          </div>
        </div>
      );
    }
    const item = this.state.item;
    const id = this.props.id;
    const level = this.props.level;
    const store = this.props.store;
    const collapsed = StoryStore.isCollapsed(id);
    const childCount = StoryStore.childCount(id);
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
  store: React.PropTypes.instanceOf(StoryStore).isRequired
};

export default Comment;
