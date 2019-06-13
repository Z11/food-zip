import React from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import LocationReviews from "./LocationReviews";
import PhotoList from "./PhotoList";
import { storeLocationInFavorites } from "../actions/";
import StarRatings from "react-star-ratings";

const LocationDetail = ({ location, storeLocationInFavorites }) => {
  if (location.length === 0) return <div />;

  return (
    <div className="column">
      <br />
      <div>
        <PhotoList />
      </div>
      <div className="ui segment">
        <font size="5">{location.name}</font>
        <div>{location.formatted_address}</div>
        <i> {location.formatted_phone_number}</i>
        <div>
          <StarRatings
            rating={location.rating}
            starDimension="20px"
            starRatedColor="purple"
            starSpacing="10px"
          />
        </div>
        <br />
        <div>
          <button
            className="purple ui button"
            onClick={() => storeLocationInFavorites(location)}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="ui segment">
        <br />
        <Scrollbars style={{ width: 750, height: 500 }}>
          <LocationReviews />
        </Scrollbars>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    location: state.selectedLocation,
    photos: state.photos
  };
};

export default connect(
  mapStateToProps,
  { storeLocationInFavorites }
)(LocationDetail);
