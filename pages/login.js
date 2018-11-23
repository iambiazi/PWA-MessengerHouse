import React, {useState} from 'react';
import isomorphicFetch from "isomorphic-fetch";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
    const userInfo = {
      username: this.state.username,
      password: this.state.password,
    };
    // TODO make it so username in state can't change?
    isomorphicFetch('/signup', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(() => {
      // this.connectAuthedUser(userInfo.username, userInfo.password);
    });
  };

  return (
    <form onSubmit={loginUser}>
      <input type="text"
             placeholder="enter username"
             name="username"
             onChange={setUsername}
      />
      <input
        type="password"
        placeholder="enter password"
        name="password"
        onChange={setPassword}
      />
      <input type="submit"/>
    </form>
    );
};

export default Login;
