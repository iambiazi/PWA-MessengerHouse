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
          <meta property="og:image" content="../static/img/icon-384x384.png" />
          <meta property='og:description' content='Progressive Web Application PWA that integrates a messenger with a real estate marketplace. Working demo.' />
          <meta property='og:url' content='https://www.brian-louie.online' />

          <link rel="manifest" href="../static/manifest.json" />
          <link rel="icon" href="../static/img/favicon.ico" />
          <noscript>
            For full functionality of this site it is necessary to enable JavaScript.
            Here are the <a href="https://www.enable-javascript.com/">
            instructions how to enable JavaScript in your web browser </a>.
          </noscript>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/pwamobileimggallery/styles.css" />
          <link rel="stylesheet" href="../static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/*<script defer src="https://code.getmdl.io/1.3.0/material.min.js" />*/}
        </body>
      </html>
    )
  }
}
