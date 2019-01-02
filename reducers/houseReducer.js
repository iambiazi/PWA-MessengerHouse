import { ADD_HOUSE } from '../actions';
import { REMOVE_HOUSE } from '../actions';

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
    case REMOVE_HOUSE:
      return state.filter(el => el.house_id !== house_id);
    default:
      return state;
  }
}
