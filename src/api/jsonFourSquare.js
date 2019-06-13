import axios from "axios";

const key = "";
const secret = "";
export default (_dir, _params) =>
  axios.get("https://api.foursquare.com/v2/venues/search", {
    headers: {
      client_id: key,
      client_secret: secret
    },
    params: _params
  });
