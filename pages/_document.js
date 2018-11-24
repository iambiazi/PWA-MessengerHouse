import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html style={{ background: '#EEE', color: '#444' }}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
          />
          <meta name="theme-color" content="#673ab7" />
          <link rel="manifest" href="static/manifest.json" />
          <link rel="icon" href="static/img/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://code.getmdl.io/1.3.0/material.deep_purple-blue.min.css"
          />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/housing-hr/style.css" />
          {/*<script src="http://hr-fec-otb.us-west-1.elasticbeanstalk.com/bundle.js" defer/>*/}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer src="static/bundle.js" />
          <script defer src="https://code.getmdl.io/1.3.0/material.min.js" />

        </body>
      </html>
    )
  }
}
