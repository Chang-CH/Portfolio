import { combineReducers } from "redux";
import login from "./login.reducer"
import portfolios from "./PortfolioReducer"


/**
 * @file Combines reducers into one using combineReducers function.
 * 
 * @module reducers/root
 * @author Chen En
 * @category Reducer
 */

export default combineReducers({
  login,
  portfolios
});