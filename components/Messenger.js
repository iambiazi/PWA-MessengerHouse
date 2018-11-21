import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { addMessage } from '../actions/message';
import { addHouse } from '../actions/message';
import Message from './Message';

const generateName = () => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;
  const firstName = [
    'Jack',
    'Steven',
    'Brian',
    'Marc',
    'Drew',
    'Stephanie',
    'Daniel',
    'James',
    'Spencer',
    'Caitlin',
    'Jackie',
    'Julius',
    'Patrick',
  ];
  const lastName = [
    'Li',
    'Chung',
    'Tiosejo',
    'Louie',
    'Curtis',
    'Sockwell',
    'Jiang',
    'Bykowsky',
    'Detro',
    'Chen',
    'Sea',
    'Doyle',
  ];
  const name =
    firstName[getRandomInt(0, firstName.length)] +
    ' ' +
    lastName[getRandomInt(0, lastName.length)];
  return name
};

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      username: generateName(),
      updated: false,
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
    if (!this.state.messages.length && !this.state.updated) {
      this.setState({ messages: this.props.messages, updated: true })
    }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', this.handleMessage);
    setTimeout(this.scrollToBottom, 100)
  }

  componentWillUnmount() {
    this.socket.off('message', this.handleMessage);
    this.socket.close()
  }

  handleMessage = message => {
    this.setState(state => ({ messages: state.messages.concat(message) }));
    this.props.addMessage(message.text, message.username, message.created_at)
  };

  handleSubmit = e => {
    e.preventDefault();

    const message = {
      created_at: new Date().getTime(),
      username: this.state.username,
      text: this.state.text,
    };

    this.socket.emit('message', message);

    this.props.addMessage(
      this.state.text,
      this.state.username,
      message.created_at,
    );
    this.setState(state => ({
      text: '',
      messages: this.state.messages.concat(message),
    }))
  };

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'instant' })
  };

  handleChange = e => {
    this.setState({ username: e.target.value })
  };

  render() {
    const sameUser = (msg, i, arr) => {
      return i > 0 && msg.username === arr[i - 1].username
    };

    // let allMessages = this.props.messages.concat(this.state.messages);
    // allMessages.sort((a, b) => b.createdAt - a.createdAt);
    return (
      <React.Fragment>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder={'enter username'}
        />

        <div className="mdl-card mdl-shadow--2dp" id="chatview">
          <ul>
            {/*{this.props.messages.map((message, i, array) => (*/}
            {/*<Message key={i} message={message} username={this.state.username} firstMessage={sameUser(message, i, array)}/>*/}
            {/*))}*/}
            {this.state.messages.map((message, i, array) => (
              <Message
                key={i}
                message={message}
                username={this.state.username}
                firstMessage={sameUser(message, i, array)}
              />
            ))}
            <div
              ref={el => {
                this.el = el
              }}
            />
          </ul>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                type="text"
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                className="mdl-textfield__input"
                id="message-input"
                placeholder={'Send a message'}
              />
              <label className="mdl-textfield__label" htmlFor="message-input" />
            </div>
          </form>
          <style>{`
						#message-input {
						border-bottom: lightgray solid 1px;
						border-top: lightgray solid 1px;
						height: 20px;
						}
						form {
							background: #fff;
							padding: 0px 10px 0px 10px;
						}
						ul {
							min-height: 100px;
							margin: 0;
							padding: 0;
							text-align: left;
							list-style: none;
							overflow-y: scroll;
						}
						ul li {
							padding: 1px;
							background: #FFF;
						}
						.mdl-card {
							margin: auto;
							transition: all .3s;
							transform: translateY(100px);
							min-height: 500px;
							max-height: 500px;
						}
					`}</style>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(
  ({ messages, houses }) => ({ messages, houses }),
  { addMessage , addHouse},
)(Messenger)
