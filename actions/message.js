import { ADD_MESSAGE, ADD_HOUSE } from '.';

export function addMessage(text, username, created_at) {
  return {
    type: ADD_MESSAGE,
    text,
    username,
    created_at,
  };
}

export function addHouse(house_id, username, created_at) {
  return {
    type: ADD_HOUSE,
    house_id,
    username,
    created_at,
  };
}
