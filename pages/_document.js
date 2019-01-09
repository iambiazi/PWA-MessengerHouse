import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html style={{ background: '#EEE', color: '#444' }} lang='en'>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1"
          />
          <meta name="theme-color" content="#673ab7" />
          <meta name="description" content="Progressive Web Application PWA that integrates a messenger with a real estate marketplace. Working demo." />
          <meta property='og:title' content='Messenger House' />
          <meta property="og:image" content="https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-658824784294/icon-384x384.png" />
          <meta property='og:description' content='Progressive Web Application PWA that integrates a messenger with a real estate marketplace. Working demo.' />
          <meta property='og:url' content='https://www.brian-louie.online' />
          <meta name='author' content='Brian Louie' />
          <link rel="manifest" href="../static/manifest.json" />
          <link rel="icon" href="../static/img/favicon.ico" />
          <noscript>
            For full functionality of this site it is necessary to enable JavaScript.
            Here are the
            {' '}
            <a href="https://www.enable-javascript.com/">
            instructions how to enable JavaScript in your web browser
              {' '}
            </a>
.
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
