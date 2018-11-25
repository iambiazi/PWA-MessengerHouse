import React from 'react';

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }

  componentDidMount() {
    const script_Top = document.createElement("script");
    script_Top.src = "https://s3-us-west-1.amazonaws.com/img-gallery-hr/bundle.js";
    script_Top.async = true;
    document.body.appendChild(script_Top);

    const script = document.createElement("script");

    script.src = "http://hr-fec-otb.us-west-1.elasticbeanstalk.com/bundle.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div id="browse-homes">
        <a href='/messenger'>Messenger</a>
        <div id="top-app" />
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
