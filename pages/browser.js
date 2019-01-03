import React from 'react';
import {connect} from 'react-redux';
import {addHouse, removeHouse} from '../actions/message';
import offerNotifications from '../utils/notification';

class Browser extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    offerNotifications();

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

    setTimeout(delayForRender, 1000);
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
    window.location.pathname = 'messenger';
  };

  handleAgent = () => {
    window.location.pathname = 'messenger/AgentDemo';
  };

  render() {
    return (
      <div id="browse-homes">
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
