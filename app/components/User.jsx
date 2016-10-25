import React from 'react';
import Spinner from 'react-spinkit';
import { UserStore } from './DataStore';
import { postTime, renderHtmlText } from './Utils';
import StoryList from './StoryList';

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
          loading the profile of user {this.props.params.id} ...
        </div>
      );
    }
    const user = this.state.user;
    return (
      <div className="user">
        <div className="user__id">{user.id}</div>
        <div className="user__meta">
          Created {postTime(user.created)}. Posts {user.submitted.length} stories/comments.
        </div>
        <div className="user__about">{renderHtmlText(user.about)}</div>
        <div className="user__story">
          <div className="user__meta">Stories/comments posted by {user.id}</div>
          <StoryList ids={user.submitted} location={this.props.location} />
        </div>
      </div>
    );
  }
}

export default User;
