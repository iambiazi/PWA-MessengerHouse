import React from 'react';
import { connect } from 'react-redux';
import { addHouse } from '../actions/message';
import offerNotifications from '../utils/notification';

class Browser extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    offerNotifications();

    // temporarily shut down the hosting for these aspects of the app

    // const script_Top = document.createElement("script");
    // script_Top.src = "https://s3-us-west-1.amazonaws.com/img-gallery-hr/PWAbundle.js";
    // script_Top.async = true;
    // document.body.appendChild(script_Top);

    // const script = document.createElement("script");
    //
    // script.src = "https://s3-us-west-1.amazonaws.com/housing-hr/PWAbundle.js";
    // script.async = true;
    //
    // document.body.appendChild(script);

    // const delayForRender = () => {
    //   const favoriteButton = document.getElementById('add-favorites');
    //   favoriteButton.addEventListener('click', this.addFavorite);
    // };
    //
    // setTimeout(delayForRender, 2000);

  }

  componentWillUnmount() {
    // const favoriteButton = document.getElementById('add-favorites');
    // favoriteButton.removeEventListener('click', this.addFavorite);
  }

  addFavorite = () => {
    const imgUrl = document.querySelector('.home-profile-image').getAttribute('src');
    let houseNum = 0;
    const houseId = Number(window.location.pathname.replace(/\/browser\//, ''));
    if (houseId && houseId >= 0 && houseId < 100) {
      houseNum = houseId;
    }
    for (let i = 0, len = this.props.houses.length; i < len; ++i) {
      if (this.props.houses[i].house_id === houseNum) {
        return;
      }
    }
    this.props.addHouse(houseNum, this.props.user.username, imgUrl)
  };

  render() {
    return (
      <div id="browse-homes">
        <a href='/messenger'>Messenger</a>
        <div id="top-app" />
        <div id="main" />
        <style>
          {`
            #main {
              margin-left: -105px;
              transform: scale(.5);
            }
            #browse-homes {
              max-width: 100%;
              max-height: 100%;
            }
            html.mdl-js {
              background: white !important;
            }
          @media (max-width: 320px) {

            }

          `}
        </style>
      </div>
     );
  }
  }


export default connect(
  ({houses, user }) => ({houses, user}),
  { addHouse }
  )(Browser);
