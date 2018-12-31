import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {DropTarget} from 'react-drag-drop-container';
import {addMessage} from '../actions/message';
import Message from './Message';
import NavBar from './NavBar';
import Favorites from './Favorites';
import Welcome from './Welcome';
import {messageAlert} from '../utils/notification';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      updated: false,
      currentConvo: this.props.sender || '',
      friends: new Set(),
      typing: [],
      otherNewMessage: false,
      unread: {},
      welcome: true,
    };
  }

  componentDidMount() {
    const connectSocket = () => {
      const {username, password} = this.props.user;
      this.socket = io('https://www.brian-louie.online');
      this.socket.on('connect', () => {
        this.socket.emit('authentication', {username, password});
      });
      this.socket.on('message', this.handleMessage);
      this.socket.on('typing', this.typingStatus);
      this.socket.on('noexist', this.noUserExists);
      this.socket.emit('login', username);
      this.socket.emit('unread', username);
    };

    setTimeout(connectSocket, 100);
    setTimeout(this.scrollToBottom, 100);

    // if (!this.state.currentConvo) {
    //   setTimeout(this.hideWelcome, 5000);
    // } else {
    //   this.hideWelcome();
    // }
  }

  componentDidUpdate() {
    this.username = this.props.user.username;
    this.scrollToBottom();
    if (!this.state.messages.length && !this.state.updated) {
      this.setState(state => {
        const setCopy = new Set(state.friends);
        this.props.messages.forEach(msg => {
          setCopy.add(msg.username);
        });
        return {friends: setCopy};
      });
      const filtered =
        this.state.currentConvo !== ''
          ? this.props.messages.filter(
              message => message.username === this.state.currentConvo,
            )
          : this.props.messages.filter(
              message => message.username === this.props.messages.slice(-1)[0],
            );
      this.setState({
        messages: filtered,
        updated: true,
      });
    }
  }

  hideWelcome = () => {
    this.setState({welcome: false});
  };

  handleMessage = message => {
    messageAlert(message.text, message.username);
    this.setState(state => ({
      typing: state.typing.filter(
        ({username}) => username !== message.username,
      ),
    }));
    this.setState(state => {
      const setCopy = new Set(state.friends);
      setCopy.add(message.username);
      return {friends: setCopy};
    });
    if (message.username === this.state.currentConvo) {
      this.setState(state => ({messages: state.messages.concat(message)}));
    } else {
      this.setState(state => {
        const updated = {...state.unread};
        if (updated[message.username]) {
          updated[message.username] += 1;
        } else {
          updated[message.username] = 1;
        }
        return {
          otherNewMessage: true,
          unread: updated,
        };
      });
    }
    this.props.addMessage(
      message.text,
      message.messageType,
      message.username,
      message.created_at,
      message.recipients,
    );
    this.scrollToBottom();
  };

  noUserExists = () => {
    if (this.state.currentConvo !== 'AgentDemo') {
      alert('User by that name does not exist');
    }
    // TODO placeholder, not for actual use
  };

  typingStatus = data => {
    if (data === this.state.currentConvo) {
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
      const status = {username: data, timeoutId};
      this.setState(state => ({typing: [...notIncluded, status]}));
    }
  };

  getCurrentConvo = newConvo => {
    this.setState(state => {
      const filtered = this.props.messages.filter(
        message =>
          message.username === newConvo ||
          (message.username === this.username &&
            message.recipients.includes(newConvo)),
      );
      const newUnread = {...state.unread};
      delete newUnread[newConvo];
      return {
        currentConvo: newConvo,
        messages: filtered,
        unread: newUnread,
        otherNewMessage: false,
      };
    });
  };

  addConversation = async () => {
    // TODO placeholder prompt
    const username = await prompt('enter a username');
    this.setState(
      state => {
        // TODO currently no confirmation for friends
        const setCopy = new Set(state.friends);
        setCopy.add(username);
        return {
          currentConvo: username,
          friends: setCopy,
        };
      },
      () => {
        this.getCurrentConvo(username);
      },
    );
  };

  showTypingStatus = e => {
    const typingStatus = {
      username: this.username,
      recipients: [this.state.currentConvo],
    };
    this.socket.emit('typing', typingStatus);
    this.setState({text: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.text !== '' && this.state.currentConvo !== '') {
      const message = {
        created_at: new Date().getTime(),
        username: this.username,
        text: this.state.text,
        messageType: 'text',
        recipients: [this.state.currentConvo],
      };

      this.socket.emit('message', message);

      if(this.state.currentConvo === 'AgentDemo') {
        this.socket.emit('botMsg', message);
      }

      this.props.addMessage(
        this.state.text,
        'text',
        this.username,
        message.created_at,
        [this.state.currentConvo],
      );
      this.setState(state => ({
        text: '',
        messages: this.state.messages.concat(message),
      }));
    }
  };

  scrollToBottom = () => {
    if (this.el) {
      this.el.scrollIntoView({behavior: 'instant'});
    }
  };

  shareFavorite = houseObj => {
    const message = {
      created_at: new Date().getTime(),
      username: this.username,
      text: [
        houseObj.house_id,
        houseObj.imgUrl,
      ],
      messageType: 'link',
      recipients: [this.state.currentConvo],
    };
    this.socket.emit('message', message);
    this.props.addMessage(
      message.text,
      message.messageType,
      message.username,
      message.created_at,
      message.recipients,
    );
    this.setState(
      state => ({messages: [...state.messages, message]}),
      () => this.scrollToBottom(),
    );
  };

  addAgent = () => {
    this.setState({currentConvo: 'AgentDemo'});
  };

  render() {
    const sameUser = (msg, i, arr) =>
      i > 0 && msg.username === arr[i - 1].username;
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
        <Favorites shareFavorite={this.shareFavorite} />
        {this.state.welcome && <Welcome/>}
        <NavBar
          newMessage={this.state.otherNewMessage}
          newMessageCount={this.state.unread}
          currentChat={this.state.currentConvo}
          addConvo={this.addConversation}
          agentChat={this.addAgent}
          switchConvo={this.getCurrentConvo}
          friends={[...this.state.friends].filter(
            notUser =>
              notUser !== this.username && notUser !== this.state.currentConvo,
          )}
        />
        <DropTarget targetKey="fav">
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
              ref={el => {
                this.el = el;
              }}
            />
          </ul>
        </DropTarget>
        <div id="typing-status">
          <i>{typingStatusMessage}</i>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div
            className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
            id='msg-input-container'
          >
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
            #__next {
              height: 100%;
              width: auto;
            }
            body {
              height: 100%;
              max-width: 1280px;
            }
            .droptarget {
              height: 63vh;;
            }
            #chatview {
              width: auto;
              height: 100%;
              max-width: 800px;
            }
            #typing-status {
              margin-top: .5em;
              height: 2.4em;
              font-size: .7em;
            }
            #message-input {
              border-bottom: lightgray solid 1px;
              border-top: lightgray solid 1px;
              height: 3em;
            }
            form {
              background: #fff;
              padding: 0px 10px 0px 10px;
            }
            ul {
              position: relative;
              top:0.5em;
              height: 63vh;
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
            #msg-input-container {
              width: 100%;
            }
            .mdl-card {
              margin: auto;
              transition: all .3s;
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
              font-weight: 400;
              background: #00e34d;
              color: white;
              border-radius: 10px;
              padding: 7px;
              max-width: 80%;
              word-wrap: break-word;
              clear: right;
              line-height: 1.25;
              text-align: left; /*  */
            }
            .your-message {
              display: inline-block;
              background: #E5E5EA;
              border-radius: 10px;
              padding: 7px;
              word-wrap: break-word;
              max-width:80%;
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
            @media only screen and (min-width: 320px) and (max-width: 374px){
              .droptarget {
                height: 23em;
              }
              ul {
                height: 23em;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default connect(
  ({messages, houses, user}) => ({messages, houses, user}),
  {addMessage},
)(Messenger);
