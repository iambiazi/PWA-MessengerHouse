import React from 'react';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <React.Fragment>

        <div className="mdl-card mdl-shadow--2dp" id="chatview">

          <ul>
          </ul>
          {/*<form onSubmit={this.handleSubmit} autoComplete="off">*/}
            {/*<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">*/}
              {/*<input*/}
                {/*type="text"*/}
                {/*value={this.state.text}*/}
                {/*onChange={e => this.setState({ text: e.target.value })}*/}
                {/*className="mdl-textfield__input"*/}
                {/*id="message-input"*/}
                {/*placeholder={'Send a message'}*/}
              {/*/>*/}
              {/*<label className="mdl-textfield__label" htmlFor="message-input" />*/}
            {/*</div>*/}
          {/*</form>*/}
          <style>{`
						form {
							background: #fff;
							padding: 0px 10px 0px 10px;
						}
						ul {
							height: 480px;
							margin: 0;
							padding: 0;
							text-align: left;
							list-style: none;
							overflow-y: scroll;
						}
						ul li {
							padding: 1px;
							background: #FFF;
						}
						.mdl-card {
							margin: auto;
							transition: all .3s;
							transform: translateY(100px);
							min-height: 500px;
							max-height: 500px;
						}
						.mdl-textfield {
							padding: 28px 0;
						}
					`}</style>
        </div>
      </React.Fragment>
    )
  }
}

export default Browse;
