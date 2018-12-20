import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { DragDropContainer } from 'react-drag-drop-container'

const Favorites = props => (
  <div id="favorites-container">
    {props.houses.map((obj, i) => (
      <DragDropContainer
        onDrop={() => props.shareFavorite(i)}
        targetKey="fav"
        dragClone
        render={() => (
          <Link href={`/browser/${obj.house_id}`} prefetch>
            <img
              className="fav-image-prev"
              key={i}
              src={obj.imgUrl}
              alt="house-image"
            />
          </Link>
          )}
      />
      ))}

    <style>
      {`
      img {
        cursor: pointer;
      }
      #favorites-container {
        margin: 0 .3em 0 .3em;
        background-color: white;
        height: 6em;
        justify-content: space-around;
      }
      .fav-image-prev {
        display: inline-block;
        width: 5em;
        height: auto;
        margin: .5em 1em;
        border: 3px solid black;
      }
      `}
    </style>
  </div>
  );

export default connect(({ houses }) => ({ houses }))(Favorites)
