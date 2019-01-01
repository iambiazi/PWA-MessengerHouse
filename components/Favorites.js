import React from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {DragDropContainer} from 'react-drag-drop-container';
import { Tooltip } from "reactstrap";

const Favorites = props => {
  const houses = [...props.houses];
  if (!houses.length) {
    houses.push({
      house_id: 1,
      imgUrl: '../static/img/example-fav.jpg',
    },
      {house_id: 2,
      imgUrl: '../static/img/example-fav2.jpg',
    },
  )
  }
  return (
    <div id="favorites-container">
      <div id='favorites-scrollable'>
      {houses.map((obj, i) => (
        <DragDropContainer
          onDrop={() => props.shareFavorite(obj)}
          targetKey="fav"
          dragClone
          render={() => (
            <Link href={`/browser/${obj.house_id}`} >
              <img
                id={`favorite-${i}`}
                className="fav-image-prev"
                key={i}
                src={obj.imgUrl}
                alt="house-image"
              />
            </Link>
          )}
        />
      ))}
        <Tooltip
          placement='right'
          isOpen={props.tooltip}
          target={'favorite-0'}
          onClick={props.closeTooltip}
        >
          Here you can view your favorites that you've added from the browser. Drag a favorite into the chat area to share!
        </Tooltip>

      <style>
        {`
      img {
        cursor: pointer;
      }
      #favorites-container {
        margin: 0 .3em 0 .3em;
        background-color: white;
        height: 6.5em;
        justify-content: space-around;
        overflow: hidden;
        overflow-x: scroll;
      }
      #favorites-scrollable {
        width: ${houses.length * 10}em;
      }
      .fav-image-prev {
        display: inline-block;
        width: auto;
        height: 5em;
        margin: .5em 1em;
        border: 3px solid black;
      }
      `}
      </style>
      </div>
    </div>
  );
};

export default connect(({houses}) => ({houses}))(Favorites);
