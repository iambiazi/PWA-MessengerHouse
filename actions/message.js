import { ADD_MESSAGE, ADD_HOUSE, ADD_USER, REMOVE_HOUSE } from '.';

export function addMessage(text, messageType, username, created_at, recipients) {
  return {
    type: ADD_MESSAGE,
    text,
    messageType,
    username,
    created_at,
    recipients,
  };
}

export function addHouse(house_id, username, imgUrl) {
  return {
    type: ADD_HOUSE,
    house_id,
    username,
    imgUrl,
  };
}

export function addUser(username) {
  return {
    type: ADD_USER,
    username,
  }
}

export function removeHouse(house_id) {
  return {
    type: REMOVE_HOUSE,
    house_id,
  }
}
