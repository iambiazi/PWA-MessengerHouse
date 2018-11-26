import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

export default ({ message, username, firstMessage }) => {
  const ownMessage = username === message.username;
  return (
    <li style={{ listStyle: 'none' }}>
      <div className="message-container">
        <div className={ownMessage ? 'my-subcontainer' : 'your-subcontainer'}>
          {ownMessage && (
            <span className="timestamp">
              {dayjs(message.created_at).format('h:mma')}
              {'  '}
            </span>
          )}
          {!firstMessage
          && !ownMessage && (
            <span className="message-username">{message.username}</span>
          )}
          <div className={ownMessage ? 'my-message' : 'your-message'}>
            {message.messageType === 'text' ? message.text
            : (<Link href={`/browser/${message.text[0]}`}>
                <img className='shared-fav' src={message.text[1]} alt='house-preview'/>
              </Link>)
            }
            <br />
            {message.messageType === 'text' ? '' : 'Check out this house!'}
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
          .shared-fav {
          width: 6em;
          display: block;
          height: auto;
          margin: .2em auto -.8em auto;
          }
          .my-subcontainer {
            text-align: right;
          }
        `}
      </style>
    </li>
  );
};
