import jsonGoogleGeocoding from "../api/jsonGoogleGeocoding";
import jsonYelp from "../api/jsonYelp";

export const storeGooogleSvc = (google, service) => dispatch => {
  dispatch({
    type: "STORE_GOOGLE_SVC_OBJECTS",
    payload: { google: google, service: service }
  });
};

export const fetchLocations = zipcode => async dispatch => {
  const coordinates = await jsonGoogleGeocoding
    .fromAddress(zipcode)
    .catch(e => {
      console.log(e);
    });

  await dispatch(fetchGoogleLocations(zipcode, coordinates));
};

export const fetchGoogleLocations = (zipcode, coordinates) => (
  dispatch,
  getState
) => {
  const request = {
    location: coordinates.results[0].geometry.location,
    radius: "1000",
    type: "restaurant",
    query: zipcode
  };
  return new Promise((resolve, reject) => {
    getState().googleSvc.service.textSearch(request, (results, status) => {
      if (
        status !==
        getState().googleSvc.google.maps.places.PlacesServiceStatus.OK
      ) {
        return reject(status);
      } else {
        resolve(results);
      }
    });
  })
    .then(results => {
      dispatch({
        type: "FETCH_LOCATIONS",
        payload: results
          .filter(loc => loc.formatted_address.includes(zipcode))
          .sort((a, b) => b.rating - a.rating)
      });
    })
    .catch(status => {
      console.log("error fetching nearby", status);
      dispatch({
        type: "FETCH_LOCATIONS",
        payload: "No Results"
      });
    });
};

export const fetchLocationDetailsFromAPIs = location => async (
  dispatch,
  getStatus
) => {
  await dispatch(fetchGoogleLocationDetails(location.place_id));
  await dispatch(fetchReviewsFromAPIs(getStatus().selectedLocation));
};

export const fetchGoogleLocationDetails = placeId => async (
  dispatch,
  getState
) => {
  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  await sleep(400).then(() => {
    return new Promise((resolve, reject) => {
      getState().googleSvc.service.getDetails(
        { placeId: placeId },
        (results, status) => {
          if (
            status !==
            getState().googleSvc.google.maps.places.PlacesServiceStatus.OK
          ) {
            return reject(status);
          } else {
            resolve(results);
          }
        }
      );
    })
      .then(results => {
        dispatch({
          type: "SELECTED_LOCATION_DETAILS",
          payload: results
        });
      })
      .catch(status => {
        console.log("error fetching nearby", status);
      });
  });
};

export const fetchReviewsFromAPIs = location => async dispatch => {
  const yelpLoc = await jsonYelp("businesses/search/phone", {
    phone: "+1" + location.formatted_phone_number.replace(/\D/g, "")
  });

  if (yelpLoc.data.businesses.length === 0) {
    console.log("Yelp Search - no results match phone number and name");
    let x = 0;
    const filteredGoogleReviews = location.reviews.map(rev => ({
      id: x++,
      rating: rev.rating,
      text: rev.text,
      author_name: rev.author_name,
      profile_photo_url: rev.profile_photo_url,
      tag: "Google"
    }));
    dispatch({
      type: "FETCH_REVIEWS",
      payload: filteredGoogleReviews.sort((a, b) => b.rating - a.rating)
    });
    dispatch({
      type: "FETCH_PHOTOS",
      payload: null
    });
  } else {
    const yelpReviews = await jsonYelp(
      `businesses/${yelpLoc.data.businesses[0].id}/reviews`,
      {}
    );

    if (yelpReviews.data.reviews.length === 0) {
      console.log("Yelp Search - no results match phone id");
      console.log(yelpReviews);
    }

    let i = 0;
    const filteredYelpReviews = yelpReviews.data.reviews.map(rev => ({
      id: i++,
      rating: rev.rating,
      text: rev.text,
      author_name: rev.user.name,
      profile_photo_url: rev.user.image_url,
      tag: "Yelp"
    }));

    const filteredGoogleReviews = location.reviews.map(rev => ({
      id: i++,
      rating: rev.rating,
      text: rev.text,
      author_name: rev.author_name,
      profile_photo_url: rev.profile_photo_url,
      tag: "Google"
    }));

    dispatch({
      type: "FETCH_REVIEWS",
      payload: [...filteredYelpReviews, ...filteredGoogleReviews].sort(
        (a, b) => b.rating - a.rating
      )
    });

    const yelpPhotos = await jsonYelp(
      `businesses/${yelpLoc.data.businesses[0].id}`,
      {}
    );

    i = 0;
    const photos = yelpPhotos.data.photos.map(pic => ({
      id: i++,
      photo_url: pic
    }));

    dispatch({
      type: "FETCH_PHOTOS",
      payload: photos
    });
  }
};

export const storeLocationInFavorites = location => (dispatch, getState) => {
  if (getState().favorites.some(e => e.id === location.id)) {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: location
    });
  } else {
    dispatch({
      type: "STORE_FAVORITE",
      payload: location
    });
  }
};

export const resetStates = () => async dispatch => {
  await dispatch({
    type: "RESET_APP",
    payload: ""
  });
};
