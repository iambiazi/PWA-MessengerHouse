import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link';


class Index extends React.Component {
  componentDidMount() {
    //TODO IF LOGGED IN ALREADY, CHANGE STATE VIEW
  }

  render() {
    return (
      <div>
        <div>
          <Link href='/browser'>
          <a>Browser</a>
          </Link>
          <br/>
          <Link href='/messenger'>
            <a>Messenger</a>
          </Link>
        </div>
      </div>
    )
  }
}


export default connect()(Index)
