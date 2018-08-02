import { combineReducers } from "redux";
import directionsReducer from "./directions";

const rootReducer = combineReducers({ directions: directionsReducer });

export default rootReducer;
