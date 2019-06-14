import React from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";

const LocationReviews = ({ reviews }) => {
  const Reviews = reviews.map(rev => {
    return (
      <div className="item" key={rev.id}>
        <Fade left>
          <img className="ui avatar image" src={rev.profile_photo_url} alt="" />
          <description>
            <div className="content">
              <div className="header">{rev.author_name}</div>
              <div className="description">
                <div>Source: {rev.tag}</div>
                <div>{rev.text}</div>
                <i> Rating: {rev.rating}</i>
              </div>
            </div>
          </description>
        </Fade>
      </div>
    );
  });
  return <div className="ui relaxed divided list">{Reviews}</div>;
};

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  };
};

export default connect(mapStateToProps)(LocationReviews);
