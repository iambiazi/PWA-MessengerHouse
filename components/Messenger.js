import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {DropTarget} from 'react-drag-drop-container';
import {addMessage} from '../actions/message';
import Message from './Message';
import NavBar from './NavBar';
import Favorites from './Favorites';
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
      welcome: false,
      rendered: false,
    };
  }

  componentDidMount() {
    this.setState({
      rendered: true,
    });
    const connectSocket = () => {
      const {username} = this.props.user;
      this.socket = io('https://www.brian-louie.online');
      this.socket.on('connect', () => {
        this.socket.emit('authentication', {username});
      });
      this.socket.on('message', this.handleMessage);
      this.socket.on('typing', this.typingStatus);
      this.socket.on('noexist', this.noUserExists);
      this.socket.emit('login', username);
      this.socket.emit('unread', username);

      if (typeof Storage !== 'undefined') {
        if (!localStorage.getItem('firstTime')) {
          localStorage.setItem('firstTime', 'true');
          const botMessage = {
            text: 'first visit',
            username: username,
          };
          this.setState({welcome: true});
          this.setState({currentConvo: 'AgentDemo'});
          this.socket.emit('botMsg', botMessage);
          setTimeout(this.hideWelcome, 15000);
        } else {
          this.hideWelcome();
          if (this.props.messages.length) {
            const lastConvo = this.props.messages.filter(el => el.username !== username);
            if (lastConvo.length) {
              this.getCurrentConvo(lastConvo[lastConvo.length - 1].username);
            }
          }
        }
      }
    };
    setTimeout(connectSocket, 100);
    setTimeout(this.scrollToBottom, 100);
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
    if (message.messageType === 'text') {
      messageAlert(message.text, message.username);
    } else {
      messageAlert('Check out this house!', message.username);
    }

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
    if (username && username.replace(/\s/g, '')) {
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
    }

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

    if (this.state.text.replace(/\s/g, '') !== '' && this.state.currentConvo !== '') {
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
    if (this.state.currentConvo === 'AgentDemo') {
      const msg = {
        username: this.username,
        text: 'this is awesome',
      };
      this.socket.emit('botMsg', msg);
    }
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
      <div id="chatview">
        <Favorites
          shareFavorite={this.shareFavorite}
          tooltip={this.state.welcome}
        />
        <NavBar
          newMessage={this.state.otherNewMessage}
          newMessageCount={this.state.unread}
          currentChat={this.state.currentConvo}
          addConvo={this.addConversation}
          switchConvo={this.getCurrentConvo}
          tooltip={this.state.welcome}
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
            className="msg-input-class"
            id='msg-input-container'
          >
            <input
              type="text"
              value={this.state.text}
              onChange={this.showTypingStatus}
              className="msg-input-class"
              id="message-input"
              placeholder="Send a message"
              aria-label='message input'
            />

            <span
              onClick={this.handleSubmit}
              id='send-msg-button'
            >
              <i className="far fa-comment" />
            </span>

            <label htmlFor="message-input" />
          </div>
        </form>
        <style>
          {`
            #tooltip-bottom {
              display: none;
            }
            .tooltip > .tooltip-inner {
            background: #3c00e0;
            border: solid 1px #3c00e0;
            }
            .tooltip .arrow::before {
              border-bottom-color: #3c00e0;
              border-right-color: #3c00e0;
            }
            html {
              height: 100%;
              background: white;
            }
            #send-msg-button {
              margin-left: .5em;
              font-size: 1.3em;
            }
            #__next {
              height: 100%;
              min-height: 876px;
              width: auto;
            }
            body {
                height: 100%;
                background:
                linear-gradient(
                  rgba(0, 116, 228, 0.75),
                  rgba(0, 116, 228, 0.75)
                ),
                center no-repeat
                url(./static/img/house-background.jpg);
                background-size: cover;
            }
            .droptarget {
              height: 63vh;
            }
            #chatview {
              width: auto;
              height: 100%;
              max-width: 800px;
              border: solid lightgrey 1px;
              margin: auto;
              background: white;
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
              border-radius: .5em;
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
            .msg-input-class {
              display:inline-block;
              width: 87%;
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
            @media only screen and (min-width: 320px) and (max-width: 374px){
              #__next {
                min-height: 0px;
              }
              .droptarget {
                height: 23em;
              }
              ul {
                height: 23em;
              }
            }
            @media only screen and (min-width: 375px) and (max-width: 699px){
              #__next {
                min-height: 0px;
              }
              .droptarget {
                height: 67vh;
              }
              ul {
                height: 67vh;
              }
            }
            @media only screen and (min-width: 700px) and (max-width: 3600px){
              .droptarget {
                height: 78vh;
              }
              ul {
                height: 78vh;
              }
              #__next {
                font-size: 18px;
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
