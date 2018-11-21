import 'isomorphic-fetch';
import React from 'react';
import { connect } from 'react-redux';

import Messenger from '../components/Messenger';



class Index extends React.Component {
  static async getInitialProps({ store }) {
    // Adding a default/initialState can be done as follows:
    // store.dispatch({ type: 'ADD_MESSAGE', text: 'It works!' });
    const res = await fetch(
      'https://api.github.com/repos/ooade/NextSimpleStarter',
    );
    const json = await res.json();
    return { stars: json.stargazers_count };
  }

  render() {
    const { stars } = this.props;
    return (
      <div>
        <div>
          <Messenger />
        </div>
      </div>
    );
  }
}

export default connect()(Index);
