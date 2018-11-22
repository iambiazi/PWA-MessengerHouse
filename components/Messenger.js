import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addMessage } from '../actions/message';
import { addHouse } from '../actions/message';
import Message from './Message';
import NavBar from './NavBar';

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
      currentConvo: '',
      friends: new Set(),
      currentView: 'messenger'
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
    if (!this.state.messages.length && !this.state.updated) {
      this.setState(state => {
        this.props.messages.forEach(msg => {
          state.friends.add(msg.username);
        });
        return state;
      });
      const filtered = this.state.currentConvo !== '' ? this.props.messages.filter(message => (message.username === this.state.currentConvo)) : this.props.messages;
      this.setState({ messages: filtered, updated: true })
    }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', this.handleMessage);
    setTimeout(this.scrollToBottom, 100);
  }

  componentWillUnmount() {
    this.socket.off('message', this.handleMessage);
    this.socket.close()
  }

  handleMessage = message => {
    this.setState(state => state.friends.add(message.username));
    this.setState(state => ({ messages: state.messages.concat(message) }));
    this.props.addMessage(message.text, message.username, message.created_at)
  };

  getCurrentConvo = otherUser => {

    this.setState(state => {
      const filtered = this.props.messages.filter(message => (message.username === otherUser));
      return {
        currentConvo: otherUser,
        messages: filtered,
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.text !== '') {
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
    }

  };

  changeToHomeView = () => {
    //TODO change this to routing? if so remove currentView from state
    this.setState({currentView: 'browse'})
  };

  changeToMessageView = () => {
    //TODO remove this with above function
    this.setState({currentView: 'messenger'})
  };

  scrollToBottom = () => {
    if (this.el) {
      this.el.scrollIntoView({ behavior: 'instant' })
    }
  };

  handleChange = e => {
    this.setState({ username: e.target.value })
  };

  render() {
    const sameUser = (msg, i, arr) => {
      return i > 0 && msg.username === arr[i - 1].username
    };

    return (
      <React.Fragment>

        <input
          type="text"
          onChange={this.handleChange}
          placeholder={'enter username'}
        />
        <div className="mdl-card mdl-shadow--2dp" id="chatview">
          <NavBar
            getConvo={this.getCurrentConvo}
            friends={[...this.state.friends]}
            changeHome={this.changeToHomeView}
            changeMessage={this.changeToMessageView}
            currentView={this.state.currentView}
          />
          {this.state.currentView === 'browser' && <ul>Browse Homes</ul>}
          {this.state.currentView === 'messenger' && <ul>
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
                this.el = el;
              }}
            />
          </ul>}
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
              <span className="send-msg-btn"><i className="fas fa-location-arrow"></i></span>
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
