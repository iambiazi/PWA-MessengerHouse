import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client';

import { addMessage } from '../actions/message'
import Message from './Message'



class Messenger extends React.Component {

	state = {
		text: '',
		messages: [],
		username: Math.floor(Math.random() * 1000).toString(),
	}

	//TODO need to load props from redux

	componentDidMount() {
		this.socket = io('http://localhost:3000');
		this.socket.on('message', this.handleMessage);
	}

	componentWillUnmount() {
		this.socket.off('message', this.handleMessage);
		this.socket.close();
	}

	handleMessage = (message) => {
		this.setState(state => ({ messages: state.messages.concat(message) }))
	}

	handleSubmit = e => {
		e.preventDefault()

		const message = {
			id: (new Date()).getTime(),
			username: this.state.username,
			text: this.state.text,
		}

		this.socket.emit('message', message);

		this.props.addMessage(this.state.text, this.state.username);
		this.setState(state => ({
			text: '',
			messages: state.messages.concat(message)
		}))
	}

	handleChange = e => {
		this.setState({username: e.target.value})
	}

	render() {
		const sameUser = (msg, i, arr) => {
			return i > 0 && msg.username === arr[i - 1].username;
		};
		return (
			<>

        <input type="text" onChange={this.handleChange} placeholder={"enter username"}/>

				<div className="mdl-card mdl-shadow--2dp">
				<ul>
					{this.props.messages.map((message, i, array) => (
          <Message key={i} message={message} username={this.state.username} firstMessage={sameUser(message, i, array)}/>
        ))}
					{this.state.messages.map((message, i, array) => (
            <Message key={i} message={message} username={this.state.username} firstMessage={sameUser(message, i, array)}/>
					))}
				</ul>
				<form onSubmit={this.handleSubmit}>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input
							type="text"
							value={this.state.text}
							onChange={e => this.setState({ text: e.target.value })}
							className="mdl-textfield__input"
							id="input"
							placeholder={"Send a message"}
						/>
						<label className="mdl-textfield__label" htmlFor="input">

						</label>
					</div>
				</form>
				<style>{`
						form {
							background: #fff;
							padding: 10px;
						}
						ul {
							min-height: 100px;
							margin: 0;
							padding: 0;
							text-align: left;
							list-style: none;
						}
						ul li {
							padding: 3px;
							background: #FFF;
						}
						.mdl-card {
							margin: auto;
							transition: all .3s;
							transform: translateY(100px);
						}
					`}</style>
			</div>
				</>
		)
	}
}

export default connect(
	({ messages }) => ({ messages }),
	{ addMessage }
)(Messenger)
