import React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';

export default ({ message, username, firstMessage }) => {
  const ownMessage = username === message.username;
  return (
    <li style={{ listStyle: 'none' }}>
      <div className="message-container">
        <div className={ownMessage ? 'my-subcontainer' : 'your-subcontainer'}>
          {ownMessage && (
            <span className="timestamp">
              {dayjs(message.created_at).format('h:mma')}{'  '}
            </span>
          )}
          {!firstMessage &&
            !ownMessage && (
              <span className="message-username">{message.username}</span>
            )}
          <div className={ownMessage ? 'my-message' : 'your-message'}>
            {message.text}
          </div>
          {!ownMessage && (
            <span className="timestamp">
              {'  '}
              {dayjs(message.created_at).format('h:mma')}
            </span>
          )}
        </div>
      </div>

      <style>
        {`
          .my-subcontainer {
            text-align: right;
          }
        `}
      </style>
    </li>
  );
};

