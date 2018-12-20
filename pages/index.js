import React from 'react'
import { connect } from 'react-redux'
import isomorphicFetch from "isomorphic-fetch";
import Router from 'next/router'
import { addUser } from '../actions/message'

class Index extends React.Component {
  state = {
    username: '',
    password: '',
    serverError: false,
    loginError: false,
    view: 'choice',
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
            this.setState({loginError: true});
          }
        })
        .catch(() => {
          this.setState({serverError: true});
        });
    };


  handleLogin = () => {
    this.setState({view: 'login'});
  };

  handleSignup = () => {
    this.setState({view: 'signup'});
  };



  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render = () => {
    return (
      <div>
        {this.state.view === 'choice' && <a onClick={this.handleLogin}>Login</a>}
        <br />
        {this.state.view === 'choice' && <a onClick={this.handleSignup}>Signup</a>}
        {this.state.view !== 'choice' && <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input
            type="text"
            placeholder="enter username"
            name="username"
          />
          <input
            type="password"
            placeholder="enter password"
            name="password"
          />
          <input type="submit" />
        </form>}
        <style>{`
        a {
        cursor: pointer;
        }
        `}
        </style>
        {this.state.loginError && <div>Error logging in. Please try again</div>}
        {this.state.serverError && <div>Error connecting to server</div>}
      </div>
    );
  }
}

export default connect(() => ({}), {addUser})(Index);
