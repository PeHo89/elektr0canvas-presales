import { combineReducers } from "redux";
import homeReducer from "./home";
import frameReducer from "./frame";

export default combineReducers({
  home: homeReducer,
  frame: frameReducer,
});
