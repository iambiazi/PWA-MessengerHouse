import React from 'react';
const NavBar = ({getConvo, friends}) => {
  return (
    <div>

      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          {friends.slice(-5).map((friend, i) => (
            <a key={i} onClick={() => getConvo(`${friend}`)}>{friend}</a>
          ))}

        </div>
      </div>
      <style>{`
        .dropbtn {
            background-color: #0069E0;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
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
      `}</style>
    </div>
  );
};

export default NavBar;
