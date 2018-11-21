import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client';

import { addTodo, removeTodo } from '../actions/todo'
import TodoItem from './TodoItem'


class Todo extends React.Component {

	state = {
		text: '',
		messages: [],
	}

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
			text: this.state.text,
		}

		this.socket.emit('message', message);

		this.props.addTodo(this.state.text);
		this.setState(state => ({
			text: '',
			messages: state.messages.concat(message),
		}))
	}

	removeTodo = todo => {
		this.props.removeTodo(todo)
	}

	render() {
		return (
			<div className="mdl-card mdl-shadow--2dp">
				<ul>
					{this.props.todos.map((todo, i) => (
						<TodoItem key={i} todo={todo} remove={this.removeTodo} />
					))}
					{this.state.messages.map((message, i) => (
            <TodoItem key={i} todo={message} remove={this.removeTodo} />
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
						/>
						<label className="mdl-textfield__label" htmlFor="input">
							Send a message
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
							padding: 10px;
							background: #FFF;
							border-bottom: 1px solid #EEE;
						}
						ul li:nth-child(2n) {
							background: #EEF6FF;
						}
						ul li:last-child {
							border-bottom: none;
						}
						.mdl-card {
							margin: auto;
							transition: all .3s;
							transform: translateY(100px);
						}
					`}</style>
			</div>
		)
	}
}

export default connect(
	({ todos }) => ({ todos }),
	{ addTodo, removeTodo }
)(Todo)
