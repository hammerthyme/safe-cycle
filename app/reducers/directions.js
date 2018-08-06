import fetchAccidentData from "../functions/fetchAccidentData";
import mapLatLngDirections from "../functions/mapLatLngDirections";

// ACTION TYPES //
const GET_DIRECTIONS = "GET_DIRECTIONS";
const GET_ACCIDENTS = "GET_ACCIDENTS";
const CLEAR_DIRECTIONS = "CLEAR_DIRECTIONS";
const START_LOADING = "START_LOADING";

// ACTION CREATORS //
const getDirections = directions => ({
  type: GET_DIRECTIONS,
  directions
});
const getAccidents = accidents => ({
  type: GET_ACCIDENTS,
  accidents
});
export const clearDirections = () => ({
  type: CLEAR_DIRECTIONS
});

const startLoading = () => ({
  type: START_LOADING
});

// THUNK CREATORS //

export const fetchDirections = (start, end) => dispatch => {
  dispatch(startLoading());
  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route(
    {
      origin: start, //was new google.maps.LatLng(40.681181, -73.946858),
      destination: end,
      travelMode: "BICYCLING" //was google.maps.TravelMode.BYCYCLING
    },
    async (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const latlngArr = mapLatLngDirections(result.routes[0].overview_path); //set of coordinates for entire directions route
        const accidents = await fetchAccidentData(latlngArr);
        dispatch(getAccidents(accidents));
        dispatch(getDirections(result));
      } else {
        console.error("error fetching directions");
      }
    }
  );
};

// INITIAL STATE //
const initialState = {
  directions: {},
  accidents: [],
  isLoading: false
};

// REDUCER //
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIRECTIONS:
      return { ...state, directions: action.directions };
    case GET_ACCIDENTS:
      return { ...state, accidents: action.accidents, isLoading: false };
    case CLEAR_DIRECTIONS:
      return { directions: {}, accidents: [] };
    case START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default rootReducer;
