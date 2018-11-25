import React from 'react';
import { connect } from 'react-redux';

const images = [
'https://s3-us-west-1.amazonaws.com/fechomephotos/FwJhPat9rhI.jpg',
'https://s3-us-west-1.amazonaws.com/fechomephotos/FwJhPat9rhI.jpg',
'https://s3-us-west-1.amazonaws.com/fechomephotos/FwJhPat9rhI.jpg',
'https://s3-us-west-1.amazonaws.com/fechomephotos/FwJhPat9rhI.jpg'
];
const Favorites = () => {

  return (
	  <div id='favorites-container'>
      {images.map((img, i) => (
	    	<img className='fav-image-prev'
	    			 key={i}
	    			 src={img}
	    		   alt="house-image"
	    		 // onClick={}
	      />
	    ))}

      <style>{`
      #favorites-container {
        display: flex;
        margin: 0 .3em 0 .3em;
        background-color: white;
        height: 6em;
        justify-content: space-around;
      }
      .fav-image-prev {
        width: 5em;
        height: auto;
        margin: .5em 1em;
        border-radius: 50%;
        border: 3px solid #BADA55;
      }
      `}</style>
	  </div>
  )
};

export default connect(
({houses}) => ({houses})
)(Favorites);
