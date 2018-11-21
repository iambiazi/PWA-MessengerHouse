import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'

import Messenger from '../components/Messenger'

class Index extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Messenger />
        </div>
      </div>
    )
  }
}

export default connect()(Index)
