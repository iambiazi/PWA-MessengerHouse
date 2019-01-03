import { ADD_USER } from '../actions';

export default function (state = [], action) {
  const {
    type, username,
  } = action;
  switch (type) {
    case ADD_USER:
      return (
        {
          username,
        });
    default:
      return state;
  }
}
