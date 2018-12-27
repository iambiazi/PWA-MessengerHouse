import React from 'react';
import {connect} from 'react-redux';
import isomorphicFetch from 'isomorphic-fetch';
import Router from 'next/router';
import {addUser} from '../actions/message';

class Index extends React.Component {
  state = {
    username: '',
    password: '',
    serverError: false,
    loginError: false,
    view: 'login',
    errorMsg: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      const userInfo = {
        username: this.state.username,
        password: this.state.password,
      };
      isomorphicFetch(`/${this.state.view}`, {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then(stringified => {
          if (stringified.status === 'logged in') {
            this.props.addUser(userInfo.username, userInfo.password);
            Router.push('/browser');
          } else {
            this.setState({
              loginError: true,
              errorMsg:
                'Error logging in. Please try again',
            });
          }
        })
        .catch(() => {
          this.setState({serverError: true});
        });
    } else if (!this.state.username) {
        this.setState({
          loginError: true,
          errorMsg: 'Please enter a username',
        });
      } else {
        this.setState({
          loginError: true,
          errorMsg: 'Please enter a password',
        });
      }
  };

  handleLogin = () => {
    this.setState({view: 'login'});
  };

  handleSignup = () => {
    this.setState({view: 'signup'});
  };

  resetView = () => {
    if (this.state.view === 'login') {
      this.setState({view: 'signup'});
    } else {
      this.setState({view: 'login'});
    }
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render = () => (
    <div className="mdl-card mdl-shadow--2dp" id="login-signup-container">
      <div id="login-image-container">
        <img src="../static/img/house-xxl.png" id="login-image" alt="" />
      </div>
      <br />
      <div id='login-instructions'>
        {this.state.view === 'login'
            ? 'Please enter your username and password'
            : this.state.view === 'signup'
              ? 'Create a new username'
              : ''}
      </div>
      <br />
      {this.state.view !== 'choice' && (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <input
          className="login-input"
          type="text"
          placeholder="enter username"
          name="username"
          autoFocus="true"
        />
        <input
          className="login-input"
          type="password"
          placeholder="enter password"
          name="password"
        />
        <br />
        <input id="login-submit" type="submit" />
      </form>
        )}
      <style>
        {`
        #__next {
          height: 100%;
          width: auto;
        }
        #login-instructions {
          color: white;
          text-align: center;
        }
        body {
          height: 100%;
          width: auto;
          max-width: 1280px;
        }
        #login-image-container {
          margin-top: 25%;

        }
        #login-image {
          height: 10em;
          margin: auto;
          display: block;
        }
        .login-input {
          display: block;
          margin: auto;
          border: solid black 1px;
          width: 14em;
          text-align: center;
        }
        #login-submit {
          margin: auto;
          display: block;
          color: #0074E4;
          background-color:white;
          border-radius:40px;
          width: 11em;
          padding: .5em;
        }
        a {
          cursor: pointer;
          margin: auto;
        }
        #login-signup-container {
          width: auto;
          height: 100%;
          margin: auto;
          background:
            linear-gradient(
              rgba(0, 116, 228, 0.75),
              rgba(0, 116, 228, 0.75)
            ),
            url(./static/img/house-background.jpg);
          background-size: cover;
        }
        #toggle-signup-login {
          margin-top: 20em;
          margin: auto;
          width: 10em;
          border: none;
          color: white;
          background: none;
        }
        `}
      </style>
      {this.state.view !== 'choice' && (
      <button
        id="toggle-signup-login"
        type="button"
        onClick={this.resetView}
      >
        {this.state.view === 'login' ? 'Create New User' : 'Login Instead'}
      </button>
        )}
      {this.state.loginError && <div>{this.state.errorMsg}</div>}
      {this.state.serverError && <div>Error connecting to server</div>}
    </div>
    );
}

export default connect(
  () => ({}),
  {addUser},
)(Index);
