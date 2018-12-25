import React from 'react';
import { connect } from 'react-redux';
import isomorphicFetch from "isomorphic-fetch";
import Router from 'next/router';
import { addUser } from '../actions/message';

class Index extends React.Component {
  state = {
    username: '',
    password: '',
    serverError: false,
    loginError: false,
    view: 'login',
    errorMsg: '',
  };

  handleSubmit = (e) => {
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
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      }).then(res => res.json())
        .then((stringified) => {
          if (stringified.status === 'logged in') {
            this.props.addUser(userInfo.username, userInfo.password);
            Router.push('/browser')
          } else {
            this.setState({
              loginError: true,
              errorMsg: 'User with that name already exists. Pick another username',
            });
          }
        })
        .catch(() => {
          this.setState({serverError: true});
        });
    } else {
      if (!this.state.username) {
        this.setState({
          loginError: true,
          errorMsg: 'Please enter a username'});
      } else {
        this.setState({
          loginError: true,
          errorMsg: 'Please enter a password'});
      }
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



  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render = () => {
    return (
      <div className="mdl-card mdl-shadow--2dp" id="login-signup-container">
        <div id='login-image-container'>
          <img src='../static/img/login.png'
               id='login-image'
               alt='' />
        </div>
      <br />
        <div>{this.state.view === 'login' ? 'Please enter your username and password'
             :this.state.view === 'signup' ? 'Create a new username'
             : ''
      }
        </div>
        {/*{this.state.view === 'choice' && <a*/}
          {/*onClick={this.handleLogin}*/}
          {/*id='login-link'>Login</a>}*/}
        {/*<br />*/}
        {/*{this.state.view === 'choice' && <a*/}
          {/*onClick={this.handleSignup}*/}
          {/*id='signup-link'>Signup</a>}*/}
        {this.state.view !== 'choice' && <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input
            className='login-input'
            type="text"
            placeholder="enter username"
            name="username"
            autofocus='true'
          />
          <input
            className='login-input'
            type="password"
            placeholder="enter password"
            name="password"
          />
          <br />
          <input id='login-submit' type="submit" />
        </form>}
        <style>{`
        #login-image-container {
          margin-top: 5em;
        }
        #login-image {
          height: 10em;
          margin: auto;
          display: block;
        }
        .login-input {
          display: block;
          margin: auto;
        }
        #login-submit {
          margin: auto;
          display: block;
        }
        a {
          cursor: pointer;
          margin: auto;
        }
        #login-signup-container {
          width: 320px;
          height: 568px;
          margin: auto;
        }
        #toggle-signup-login {
          margin-top: 20em;
          margin: auto;
          width: 10em;
          border: none;
          color: #009CE5;
        }
        `}
        </style>
        {this.state.view !== 'choice' &&
        <button
          id='toggle-signup-login'
          type='button'
          onClick={this.resetView}
        >{this.state.view === 'login' ? 'Create New User' : 'Login Instead'}
        </button>
        }
        {this.state.loginError && <div>{this.state.errorMsg}</div>}
        {this.state.serverError && <div>Error connecting to server</div>}
      </div>
    );
  }
}

export default connect(() => ({}), {addUser})(Index);
