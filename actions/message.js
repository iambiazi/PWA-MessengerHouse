import { ADD_MESSAGE} from './'

export function addMessage(text, username, created_at) {
	return {
		type: ADD_MESSAGE,
		text,
		username,
		created_at
	}
}

