export default (state = [], action) => {
  switch (action.type) {
    case "SELECTED_LOCATION_DETAILS":
      return action.payload;
    default:
      return state;
  }
};
