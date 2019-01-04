import React from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {DragDropContainer} from 'react-drag-drop-container';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const tooltipFav = (
  <Tooltip placement="bottom" className="tooltipMessenger" id="tooltip-fav">
    Here you can view your favorites that you've added from the browser. Drag a favorite into the chat area to share!
  </Tooltip>);

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
      {props.tooltip &&
      <OverlayTrigger
        placement="bottom"
        defaultOverlayShown={props.tooltip}
        overlay={tooltipFav}>
      <div id='favorites-scrollable'>
      {houses.map((obj, i) => (
        <DragDropContainer
          onDrop={() => props.shareFavorite(obj)}
          targetKey="fav"
          dragClone
          render={() => (
            <Link
              id={`link-${i}`}
              href={`/browser/${obj.house_id}`}
            >
              <img
                id={`favorite-${i}`}
                className="fav-image-prev"
                key={i}
                src={obj.imgUrl}
                alt="house-image"
                crossOrigin='anonymous'
              />
            </Link>
          )}
        />
      ))}
      </div>
      </OverlayTrigger>}
      {!props.tooltip &&
        <div id='favorites-scrollable'>
          {houses.map((obj, i) => (
            <DragDropContainer
              onDrop={() => props.shareFavorite(obj)}
              targetKey="fav"
              dragClone
              render={() => (
                <Link
                  id={`link-${i}`}
                  href={`/browser/${obj.house_id}`}
                >
                  <img
                    id={`favorite-${i}`}
                    className="fav-image-prev"
                    key={i}
                    src={obj.imgUrl}
                    alt="house-image"
                    crossOrigin='anonymous'
                  />
                </Link>
              )}
            />
          ))}
        </div>}
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
        width: ${houses.length * 13}em;
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
  );
};

export default connect(({houses}) => ({houses}))(Favorites);
