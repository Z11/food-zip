import React from "react";
import PhotoItem from "./PhotoItem";
import { connect } from "react-redux";
import "./styles.css";

const PhotoList = ({ photos }) => {
  if (photos !== null) {
    const images = photos.map(image => {
      return <PhotoItem key={image.id} image={image} />;
    });

    return (
      <div className="ui placeholder segment">
        <div className="image-list">{images}</div>
      </div>
    );
  } else {
    return (
      <div className="ui placeholder segment">
        <img alt="" src={require("../misc/test.jpg")} />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    location: state.selectedLocation,
    photos: state.photos
  };
};

export default connect(mapStateToProps)(PhotoList);
