export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_LOCATION_DETAILS": {
      //console.log([...state, action.payload]);
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
