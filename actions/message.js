import { ADD_MESSAGE} from './'

export function addMessage(text, username) {
	return {
		type: ADD_MESSAGE,
		text,
		username,
	}
}

