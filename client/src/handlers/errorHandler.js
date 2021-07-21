import { log_out_user, toggle_unsaved_state } from '../actions/LoginAction';
import { add_error } from '../actions/ErrorAction';
import store from '../index';

/**
 * LoginAction exports actions and their respective action creators.
 * 
 * @module errorHandler
 * @author Chen En
 * @category Auxiliary Functions
 */

/**
 * A standardized error handler to handle errors from requests to backend. 
 * If error.response.status is 401 and err.response.data is "authorized user", it means that
 * the user is not signed in. User details will be removed from localStorage and a LOG_OUT_USER action will
 * be dispatched. The user will then be redirected to the home page to login again.
 * 
 * @param {Object} err error object
 * @param {Object} history history object
 * @returns void
 * @member handleErrors
 * @function
 */
export const handleErrors = (err, history) => {
    console.log(err);
    if (err.response) {
        console.log(err.response.data);
        
        const message = err.response.data !== undefined ? err.response.data : "error encountered"
        store.dispatch(add_error(message, err.response.status));

        if (err.response.status === 401 && err.response.data === 'unauthorized user' && history !== undefined) {
            localStorage.removeItem(process.env.REACT_APP_USER_LOCALSTORAGE);
            //sets unsaved state to false so user can be successfully navigated out of portfolio page immediately
            store.dispatch(toggle_unsaved_state(false));
            console.log("toggle unsave false");
            store.dispatch(log_out_user());
            history.push('/');
        }
    } else {
        store.dispatch(add_error(err.message));
        console.log(err.message);
    }
}