import React from 'react';
import Link from 'next/link'

const NavBar = ({
  getConvo,
  friends,
  changeHome,
  changeMessage,
  currentView,
}) => (
  <div id="navbar-container">
    {currentView === 'messenger' && (
      <Link href='/browser' prefetch>
        <a><img src="../static/house.png" id="house-button" alt='' /></a>
      </Link>
    )}
    <div className="dropdown">
      <button className="dropbtn">Menu</button>
      <div className="dropdown-content">
        {currentView === 'browse' && <a onClick={changeMessage}>Messenger</a>}
        {friends.slice(-5).map((friend, i) => (
          <a key={i} onClick={() => getConvo(`${friend}`)}>
            {friend}
          </a>
        ))}
      </div>
    </div>
    <style>
      {`
        a {
        font-size: 12px;
        }
        #navbar-container {
        display: flex;
        justify-content: flex-end;
        }
        #house-button {
        margin-right: 12px;
        height: 50px;
        width: auto;
        }
        .dropbtn {
            background-color: #0069E0;
            color: white;
            padding: 10px;
            font-size: 16px;
            border: none;
            cursor: pointer;
            width: 120px;
        }
        .dropdown {
            position: relative;
            display: inline-block;
            float: right;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        .dropdown-content a {
            color: black;
            // padding: 12px 16px;
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

export default NavBar;
