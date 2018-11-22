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
          .timestamp{
          font-size:10px;
          font-weight: 300;
          color: transparent;
          margin: 3px;
          }
          li:hover .my-timestamp {
          color: black;
          transition: color .8s;
          }
          li:hover .timestamp {
          color: black;
          transition: color .8s;
          }
        .my-message {
        display: block;
        background: #00e34d;
        color: white;
        border-radius: 10px;
        margin-bottom: 0.1em;
        padding: 2px;
        max-width: 60%;
        white-space: wrap;
        word-wrap: break-word;
        width: fit-content;
        }
        .your-message {
        display: inline-block;
        background: #E5E5EA;
        border-radius: 10px;
        margin-bottom: 0.1em;
        padding: 2px;
        max-width: 60%;
        white-sapce: wrap;
        word-wrap: break-word;
        width: fit-content;
        }
        .my-message {
        clear: right;
        display: inline-block;
        }
        .message-username {
          display: block;
          font-size: 0.8em;
          font-weight: bold;
          line-height: 1.5;
          margin-left: 0.6em;
        }

      `}
      </style>
    </li>
  );
};

