import { ADD_USER } from '../actions';

export default function (state = [], action) {
  const {
    type, username, password,
  } = action;
  switch (type) {
    case ADD_USER:
      return (
        {
          id: Math.random()
            .toString(36)
            .substring(2),
          username,
          password,
        });
    default:
      return state;
  }
}
