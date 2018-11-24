import React from 'react';

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "http://hr-fec-otb.us-west-1.elasticbeanstalk.com/bundle.js";

    document.body.appendChild(script);
  }

  render() {
    return (
      <div id="browse-homes">
        <a href='/messenger'>Messenger</a>
        <div id="main" />
        <style>
          {`
            #main {
              margin-left: 30px;
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


export default Browser;
