import React from 'react';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="browse-homes">
        <div id="main" />
          <style>{`
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


export default Browse;
