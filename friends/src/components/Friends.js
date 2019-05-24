import React, { Component } from 'react';
import '../App.css';
import SelectedFriend from './SelectedFriend';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { deleteFriend, updateSingleFriend, toggleShowUpdate } from '../actions';

import Loader from 'react-loader-spinner';
import UpdateFriendForm from './UpdateFriendForm';


class Friends extends Component {
  handleDeleteFriend = () => {
    const { id } = this.props.friendSelected;
    this.props.deleteFriend(id);
  };

  handleShowFriend = friend => {
    this.props.updateSingleFriend(friend);
  };

  toggleShowUpdate = () => {
    this.props.toggleShowUpdate();
  };
  render() {
    return (
      <div className="Friend-Container">
        <ul className="Friend-List">
          {this.props.friends.map(friend => {
            return (
              <li onClick={() => this.handleShowFriend(friend)} key={friend.id}>
                {friend.name}
              </li>
            );
          })}
        </ul>
        <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Friend</p>
          </div>
        {Object.keys(this.props.friendSelected).length > 0 ? (
          <SelectedFriend
            handleShowFriend={this.handleShowFriend}
            toggleShowUpdate={this.toggleShowUpdate}
            handleDeleteFriend={this.handleDeleteFriend}
            selected={this.props.friendSelected}
          />
        ) : null}
        {this.props.showUpdate ? (
          <UpdateFriendForm friend={this.props.friendSelected} />
        ) : null}
        {this.props.deletingFriend ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deletingFriend: state.friendsReducer.deletingFriend,
    error: state.friendsReducer.error,
    showUpdate: state.singleFriendReducer.showUpdate,
    friendSelected: state.singleFriendReducer.friendSelected
  };
};

export default connect(mapStateToProps, {
  deleteFriend,
  updateSingleFriend,
  toggleShowUpdate
})(Friends);
