import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Friends from './components/Friends';
import FriendForm from './components/FriendForm';
import Login from './components/Login';
import { getFriends } from './actions';
import { connect } from 'react-redux';


class App extends Component {
  componentDidMount() {
    this.props.getFriends();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <header className="App-header">
            <h1 className="App-Title">{`Yasuke's Friends`}</h1>
            <Route exact path="/login" component={Login} />
          </header>
          <PrivateRoute exact path="/protected" component={FriendForm, Friends} />
          {this.props.error ? <h3>Error Fetching Friends</h3> : null}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { friendsReducer } = state;
  return {
    friends: friendsReducer.friends,
    error: friendsReducer.error,
    gettingFriends: friendsReducer.gettingFriends
  };
};

export default connect(mapStateToProps, { getFriends })(App);
