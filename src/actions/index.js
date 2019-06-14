import jsonGoogleGeocoding from "../api/jsonGoogleGeocoding";
import jsonYelp from "../api/jsonYelp";

export const storeLocationInFavorites = location => (dispatch, getState) => {
  if (getState().favorites.some(e => e.id === location.id)) {
    console.log("Location Already Exists in Favorites");
  } else {
    dispatch({
      type: "STORE_FAVORITE",
      payload: location
    });
  }
};

export const fetchInformationFromOtherAPIs = location => async dispatch => {
  dispatch({
    type: "SELECTED_LOCATION_DETAILS",
    payload: location
  });

  await dispatch(fetchReviewsFromOtherAPIs(location));
};

export const fetchReviewsFromOtherAPIs = location => async dispatch => {
  const yelpLoc = await jsonYelp("businesses/search/phone", {
    phone: "+1" + location.formatted_phone_number.replace(/\D/g, "")
  });

  if (yelpLoc.data.businesses.length === 0) {
    console.log("Yelp Search - no results match phone number and name");
    console.log(yelpLoc);
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

export const fetchLocations = (zipcode, google, service) => async (
  dispatch,
  getState
) => {
  console.log("fetchCoordinates");
  const coordinates = await jsonGoogleGeocoding
    .fromAddress(zipcode)
    .catch(e => {
      console.log(e);
    });

  console.log("fetchGoogleLocations");
  await dispatch(fetchGoogleLocations(zipcode, coordinates, google, service));

  const filteredLocations = getState().locations.filter(loc =>
    loc.formatted_address.includes(zipcode)
  );

  console.log("fetchGoogleLocationDetails");
  await asyncForEach(
    filteredLocations,
    async loc =>
      await dispatch(fetchGoogleLocationDetails(loc.place_id, google, service))
  );
};

export const resetStates = () => async dispatch => {
  await dispatch({
    type: "RESET_APP",
    payload: ""
  });
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const fetchGoogleLocationDetails = (
  _placeId,
  google,
  service
) => async dispatch => {
  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  await sleep(400).then(() => {
    return new Promise((resolve, reject) => {
      service.getDetails({ placeId: _placeId }, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return reject(status);
        } else {
          resolve(results);
        }
      });
    })
      .then(results => {
        dispatch({
          type: "FETCH_LOCATION_DETAILS",
          payload: results
        });
      })
      .catch(status => {
        console.log("error fetching nearby", status);
      });
  });
};

export const fetchGoogleLocations = (
  zipcode,
  coordinates,
  google,
  service
) => dispatch => {
  const request = {
    location: coordinates.results[0].geometry.location,
    radius: "1000",
    type: "restaurant",
    query: zipcode
  };
  return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
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

//
// const yelpfilteredLoc = await yelpLoc.data.businesses.filter(
//   loc =>
//     loc.name
//       .replace(/\D\w\s!?]/g, "")
//       .includes(location.name.replace(/\D\w\s!?]/g, "")) ||
//     location.name
//       .replace(/\D\w\s!?]/g, "")
//       .includes(loc.name.replace(/\D\w\s!?]/g, ""))
// );
