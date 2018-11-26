import { ADD_USER } from '../actions';

export default function (state = [], action) {
  const {
    type, username, password,
  } = action;
  switch (type) {
    case ADD_USER:
      return (
        {
          username,
          password,
        });
    default:
      return state;
  }
}
