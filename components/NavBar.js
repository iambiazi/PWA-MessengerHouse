import React from 'react';
import Link from 'next/link'

const NavBar = ({
  getConvo,
  friends,
  newMessage,
  changeHome,
  changeMessage,
  addConvo,
  currentChat
}) => {
  return (
    <div id="navbar-container">
      <div id='convo-status'>
        Chatting with <br/>
        {currentChat}
      </div>
      <Link href='/browser' prefetch>
        <a id="house-button2"><i className="fa fa-home"> Home</i></a>

      </Link>
      <span>
        <div id='new-message-badge'>{newMessage ? 'New message' : ''}</div>
    </span>
      <div className="dropdown">
        <button className="dropbtn"
        ><i className="fas fa-bars"> Menu</i></button>
        <div className="dropdown-content">
          <a onClick={addConvo}>Start a new convo</a>
          {friends.slice(-5).map((friend, i) => (
            <a key={i} onClick={() => getConvo(`${friend}`)}>
              {friend}
            </a>
          ))}
        </div>
      </div>
      <style>
        {`
        #new-message-badge {
          background: red;
          color: white;
          position: absolute;
          font-size: .75em;
          z-index: 1;
          left: 18em;
        }
        #convo-status {
          color: white;
          font-size: .8em;
          position: relative; /*  */
        }
        a {
          font-size: 12px;
        }
        #navbar-container {
          display: flex;
          justify-content: space-around; /* changed to space-around from flex-end */
          background-color: #0069E0;
          height: 3em; /*  */
        }
        #house-button {
          margin-right: 12px;
          width: auto; /* deleted height */
        }
        #house-button:hover {
          transform: scale(1.2); /* added zoom */
        }
        #house-button2 {
          color: white;
          position: relative;
          left: 1.5em;
          top: 20%;
          font-size:1em;
        }
        .dropbtn {
            background-color: #0069E0;
            color: white;
            font-size: 1em; /* changed to 1em from 16px */
            border: none;
            cursor: pointer;
            width: 120px;
            margin: .5em .2em;
            text-align: end;
        }
        .dropdown {
            position: relative;
            display: inline-block;
            float: right;
        }
        .dropdown-content {
            margin-top: -.15em;
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        .dropdown-content a {
            color: black;
             padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        .dropdown-content a:hover {background-color: #f1f1f1}
        .dropdown:hover .dropdown-content {
            display: block;
        }
        .dropdown:hover .dropbtn {
            background-color: #0069E0;
        }
      `}
      </style>
    </div>
  );
};

export default NavBar;
