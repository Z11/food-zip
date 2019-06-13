import axios from "axios";

const key = "Bearer ";

export default (_dir, _params) =>
  axios.get(
    `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/${_dir}`,
    {
      headers: {
        Authorization: key
      },
      params: _params
    }
  );
