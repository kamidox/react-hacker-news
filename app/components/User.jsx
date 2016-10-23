import React from 'react';
import Spinner from 'react-spinkit';
import { postTime, renderHtmlText, getPage } from './Utils';
import { UserStore } from './DataStore';
import StoryListItem from './StoryListItem';
import Paginator from './Paginator';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  componentWillMount() {
    this.store = new UserStore();
    this.store.fetchUser(this.props.params.id);
    this.store.addListener(this.props.params.id, this.handleUserUpdate);
  }

  componentWillUnmount() {
    this.store.removeListener(this.props.params.id, this.handleUserUpdate);
    this.store = null;
  }

  handleUserUpdate(user) {
    this.setState({ user });
  }

  render() {
    if (!this.state.user) {
      return (
        <div>
          <Spinner spinnerName="three-bounce" noFadeIn />
          loading user {this.props.params.id} ...
        </div>
      );
    }
    const id = this.props.params.id;
    const user = this.state.user;
    const items = [];
    const page = getPage(30, this.props.location.query.page, user.submitted.length);
    for (let i = page.startIndex; i < page.endIndex; i += 1) {
      items.push(
        <StoryListItem key={user.submitted[i]} itemId={user.submitted[i]} />);
    }

    return (
      <div className="user">
        <div className="user__id">{id}</div>
        <div className="user__meta">
          Created {postTime(user.created)}. Posts {user.submitted.length} stories.
        </div>
        <div className="user__about">{renderHtmlText(user.about)}</div>
        <div className="user__story">
          <div className="user__meta">Story posted by {id}</div>
          <ul>
            {items}
          </ul>
          <Paginator
            pathname={this.props.location.pathname}
            page={page.page}
            hasNext={page.hasNext}
          />
        </div>
      </div>
    );
  }
}

export default User;
