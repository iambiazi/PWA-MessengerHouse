import { ADD_MESSAGE } from '../actions';

export default function (state = [], action) {
  const {
    type, text, username, created_at, recipients, messageType,
  } = action;
  switch (type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          text,
          username,
          created_at,
          messageType,
          recipients
        },
      ];
    default:
      return state;
  }
}
