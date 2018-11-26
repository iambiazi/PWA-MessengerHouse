import { ADD_HOUSE } from '../actions';

export default function (state = [], action) {
  const {
    house_id, type, username, imgUrl,
  } = action;
  switch (type) {
    case ADD_HOUSE:
      return [
        {
          house_id,
          username,
          imgUrl,
        },
        ...state,
      ];
    default:
      return state;
  }
}
