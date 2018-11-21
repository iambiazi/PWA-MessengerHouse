import React from 'react';

export default ({ message, username, firstMessage }) => (
  <li classname={!firstMessage ? 'first-message-' : 'another-message'}style={{ listStyle: 'none' }}>
    <div>
      <span className="message-username">{username}</span>
      <div className={username === message.username ?
        'my-message' : 'your-message'}
      >
    {/* <button */}
    {/* className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect" */}
    {/* onClick={_ => remove(message)} */}
    {/* style={{ fontSize: 12 }} */}
    {/* > */}
    {/* x */}
    {/* </button>{' '} */}
    {message.text}
    <style>
      {`
      .my-message {
      background: #00e34d;
      color: white;
      border-radius: 10px;
      margin-bottom: 0.1em;
      padding: 1px 8px;
      max-width: 60%;
      word-break: break-all;
      width: fit-content;
      }
      .your-message {
      background: #EEF6FF;
      border-radius: 10px;
      margin-bottom: 0.1em;
      padding: 1px 8px;
      max-width: 60%;
      word-break: break-all;
      width: fit-content;
      }
      li .my-message {
      float: right;
      }
      li {
      clear: right;
      }
      .message-username {
        text-align: right;
        display: block;
      }
    `}
    </style>
    </div>
    </div>


  </li>
);


