import axios from "axios";

// ACTION TYPES //
const GET_DIRECTIONS = "GET_DIRECTIONS";

// ACTION CREATORS //
const getDirections = directions => ({
  type: GET_DIRECTIONS,
  directions
});

// THUNK CREATORS //

export const fetchDirections = (start, end) => async dispatch => {
  console.log("start", start, "end", end);
  const apiURL = "https://maps.googleapis.com/maps/api/directions/json?";
  const startParam = `&origin=${start}`;
  const endParam = `&destination=${end}`;
  const bikeMode = "&mode=bicycling";
  const apiKey = "&key=AIzaSyDr3cIycd9ql4MFBqYfOb80LcZSzFLmDVo";
  const url = `${apiURL}${startParam}${endParam}${bikeMode}${apiKey}`;
  const res = await axios.get(url);
  const directions = res.data;
  console.log(directions);
  dispatch(getDirections(directions));
};

// REDUCER //
const directionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DIRECTIONS:
      return action.directions;
    default:
      return state;
  }
};

export default directionsReducer;
