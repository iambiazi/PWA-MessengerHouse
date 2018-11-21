import { ADD_MESSAGE } from '../actions'

export default function(state = [], action) {
	const { type, text, username } = action
	switch (type) {
		case ADD_MESSAGE:
			return [
				...state,
				{
					id: Math.random()
						.toString(36)
						.substring(2),
					text,
					username
				}
			]
		default:
			return state
	}
}
