import React from 'react';
import Messenger from '../components/Messenger'

const MessengerView = () => {
  let endpoint;
  if (typeof window !== 'undefined') {
    endpoint = window.location.pathname.replace(/\/messenger\//, '');
  }
  if (endpoint !== '/messenger') {
    return <Messenger sender={endpoint} />;
  } else {
    return (<Messenger />);
  }
};

export default MessengerView;
