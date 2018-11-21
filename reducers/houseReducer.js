import { ADD_HOUSE } from '../actions';

export default function (state = [], action) {
  const {
    house_id, type, username, created_at,
  } = action;
  switch (type) {
    case ADD_HOUSE:
      return [
        ...state,
        {
          id: Math.random()
            .toString(36)
            .substring(2),
          house_id,
          username,
          created_at,
        },
      ];
    default:
      return state;
  }
}
