import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import {addHouse, removeHouse} from '../actions/message';
import offerNotifications from '../utils/notification';

class Browser extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    offerNotifications();
    window.scroll(0, 0);

    const script_Top = document.createElement("script");
    script_Top.src = "https://s3-us-west-1.amazonaws.com/pwamobileimggallery/bundleGz.js";
    script_Top.async = true;
    document.body.appendChild(script_Top);

    const script = document.createElement('script');

    script.src =
      'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-658824784294/bundle.js';
    script.async = true;

    document.body.appendChild(script);

    const delayForRender = () => {
      const favoriteButton = document.getElementById('add-favorites');
      const messengerButton = document.getElementById('messenger-button');
      const agentButton = document.getElementById('chat-agent');
      favoriteButton.addEventListener('click', this.addFavorite);
      messengerButton.addEventListener('click', this.handleMessengerClick);
      agentButton.addEventListener('click', this.handleAgent);
      this.setState({isRendered: true});
    };

    setTimeout(delayForRender, 1500);
  }

  componentWillUnmount() {
    const favoriteButton = document.getElementById('add-favorites');
    favoriteButton.removeEventListener('click', this.addFavorite);
    const messengerButton = document.getElementById('messenger-button');
    messengerButton.removeEventListener('click', this.handleMessengerClick);
    const agentButton = document.getElementById('chat-agent');
    agentButton.removeEventListener('click', this.handleAgent);
  }

  addFavorite = () => {
    const imgUrl = document
      .querySelector('.img-responsive')
      .getAttribute('src');
    let houseNum = 0;
    const houseId = Number(window.location.pathname.replace(/\/browser\//, ''));
    if (houseId && houseId >= 0 && houseId < 100) {
      houseNum = houseId;
    }
    for (let i = 0, len = this.props.houses.length; i < len; ++i) {
      if (this.props.houses[i].house_id === houseNum) {
        this.props.removeHouse(houseNum);
        return;
      }
    }
    this.props.addHouse(houseNum, this.props.user.username, imgUrl);
  };

  handleMessengerClick = () => {
    Router.push('/messenger');
  };

  handleAgent = () => {
    Router.push('messenger/AgentDemo');
  };

  render() {
    return (
      <div id="browse-homes">
        <Head>
          <title>Browse Homes</title>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/pwamobileimggallery/styles.css" />
          <link rel="stylesheet" href="../static/style.css" />
        </Head>
        <div id="app" />
        <div id="main" />
        <style>
          {`
            #main {
              overflow: hidden;
            }
          `}
        </style>
      </div>
    );
  }
}

export default connect(
  ({houses, user}) => ({houses, user}),
  {addHouse, removeHouse},
)(Browser);
