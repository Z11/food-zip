export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_LOCATIONS":
      return action.payload;
    default:
      return state;
  }
};
