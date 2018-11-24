import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addMessage, addHouse } from '../actions/message';
import Message from './Message';
import NavBar from './NavBar';


class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      updated: false,
      currentConvo: '',
      friends: new Set(),
      currentView: 'messenger',
      typing: [],
    };
  }

  componentDidUpdate() {
    this.username = this.props.user.username;
    this.scrollToBottom();
    if (!this.state.messages.length && !this.state.updated) {
      this.setState((state) => {
        this.props.messages.forEach((msg) => {
          state.friends.add(msg.username);
        });
        return state;
      });
      const filtered = this.state.currentConvo !== ''
        ? this.props.messages.filter(
          message => message.username === this.state.currentConvo,
        )
        : this.props.messages;
      this.setState({ messages: filtered, updated: true });
    }
  }

  componentDidMount() {
    const {username, password} = this.props.user;
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.socket.emit('authentication', { username, password });
    });
    this.socket.on('message', this.handleMessage);
    this.socket.on('typing', this.typingStatus);
    setTimeout(this.scrollToBottom, 100);
  }

  componentWillUnmount() {
    //TODO do we want this to shut off when you navigate away from messenger?
    //TODO seems like we want to receive messages still
    this.socket.off('message', this.handleMessage);
    this.socket.close();
  }


  handleMessage = (message) => {
    this.setState(state => ({
      typing: state.typing.filter(
        ({ username }) => username !== message.username,
      ),
    }));
    this.setState(state => state.friends.add(message.username));
    this.setState(state => ({ messages: state.messages.concat(message) }));
    this.props.addMessage(message.text, message.username, message.created_at);
  };

  typingStatus = (data) => {
    const notIncluded = this.state.typing.filter(el => el.username !== data);
    for (let i = 0, len = this.state.typing.length; i < len; ++i) {
      if (this.state.typing[i].username === data) {
        clearTimeout(this.state.typing[i].timeoutId);
      }
    }
    const timeoutId = setTimeout(() => {
      this.setState(state => ({
        typing: state.typing.filter(el => el.username !== data),
      }));
    }, 3000);
    const status = { username: data, timeoutId };
    this.setState(state => ({ typing: [...notIncluded, status] }));
  };

  getCurrentConvo = (otherUser) => {
    this.setState(() => {
      const filtered = this.props.messages.filter(
        message => message.username === otherUser || message.username === this.username,
      );
      return {
        currentConvo: otherUser,
        messages: filtered,
      };
    });
  };


  showTypingStatus = (e) => {
      this.socket.emit('typing', this.username);
      this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.text !== '') {
      const message = {
        created_at: new Date().getTime(),
        username: this.username,
        text: this.state.text,
      };

      this.socket.emit('message', message);

      this.props.addMessage(
        this.state.text,
        this.username,
        message.created_at,
      );
      this.setState(state => ({
        text: '',
        messages: this.state.messages.concat(message),
      }));
    }
  };

  scrollToBottom = () => {
    if (this.el) {
      this.el.scrollIntoView({ behavior: 'instant' });
    }
  };

  render() {
    const sameUser = (msg, i, arr) => i > 0 && msg.username === arr[i - 1].username;
    const typingStatusMessage = !this.state.typing.length
      ? ''
      : this.state.typing.length === 1
        ? `${this.state.typing[0].username} is typing...`
        : this.state.typing.length === 2
          ? `${this.state.typing[0].username} and ${
            this.state.typing[1].username
          } are typing...`
          : 'several people are typing';
    return (
      <div className="mdl-card mdl-shadow--2dp" id="chatview">
        <NavBar
          getConvo={this.getCurrentConvo}
          friends={[...this.state.friends].filter(notUser => notUser !== this.username)}
          currentView={this.state.currentView}
        />
        {this.state.currentView === 'browser' && <ul>Browse Homes</ul>}
        {this.state.currentView === 'messenger' && (
        <ul>
          {this.state.messages.map((message, i, array) => (
            <Message
              key={i}
              message={message}
              username={this.username}
              firstMessage={sameUser(message, i, array)}
            />
              ))}
          <div
            ref={(el) => {
                  this.el = el;
                }}
          />
        </ul>
          )}
        <div id="typing-status">
          <i>{typingStatusMessage}</i>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              type="text"
              value={this.state.text}
              onChange={this.showTypingStatus}
              className="mdl-textfield__input"
              id="message-input"
              placeholder="Send a message"
            />

            <span onClick={this.handleSubmit}>
              <i className="far fa-comment" />
            </span>
            <label className="mdl-textfield__label" htmlFor="message-input" />
          </div>
        </form>
        <style>
          {`
            #typing-status {
            height: 2.4em;
            font-size: .7em;
            }
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
							height: 480px;
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
              height: 500px;
						}
						.mdl-textfield__input {
              display:inline-block;
              width: 90%;
              padding-top: .5em;
            }
						.timestamp{
		          font-size:10px;
		          font-weight: 300;
		          color: transparent;
		          margin: 3px;
	          }
	          li:hover .my-timestamp {
		          color: black;
		          transition: color .8s;
	          }
	          li:hover .timestamp {
		          color: black;
		          transition: color .8s;
	          }
	        .my-message {
		        display: inline-block;
		        background: #00e34d;
		        color: white;
		        border-radius: 10px;
		        padding: 7px;
		        max-width: 50%;
		        word-wrap: break-word;
		        clear: right;
		        line-height: 1.25;
	        }
	        .your-message {
		        display: inline-block;
		        background: #E5E5EA;
		        border-radius: 10px;
		        padding: 7px;
		        word-wrap: break-word;
		        max-width:70%;
		        line-height: 1.25;
	        }
          .message-username {
	          display: block;
	          font-size: 0.8em;
	          font-weight: bold;
	          line-height: 1.5;
	          margin-left: 0.6em;
          }
          .send-msg-btn {
            cursor:pointer;
          }
   				.mdl-textfield__label:after{
            background-color: #0069E0;
          }
					`}
        </style>
      </div>
    );
  }
}

export default connect(
  ({ messages, houses, user }) => ({ messages, houses, user }),
  { addMessage, addHouse },
)(Messenger);
