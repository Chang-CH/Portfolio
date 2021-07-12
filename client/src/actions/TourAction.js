import { ACTIONS, EVENTS, LIFECYCLE, STATUS } from 'react-joyride';
import { STEPS_COUNT } from '../reducers/TourReducer';

/**
 * TourAction exports actions and their respective action creators.
 * 
 * @module TourAction
 * @author Chen En
 * @category Action
 */

/**
 * string that identifies a START action.
 * 
 * @type {string}
 * @member START
 */
export const START = "START";

/**
 * string that identifies a RESTART action.
 * 
 * @type {string}
 * @member RESTART
 */
export const RESTART = "RESTART";



/**
 * string that identifies a NEXT_OR_PREV action.
 * 
 * @type {string}
 * @member NEXT_OR_PREV
 */
 export const NEXT_OR_PREV = "NEXT_OR_PREV";

/**
 * string that identifies a NEXT action.
 * 
 * @type {string}
 * @member NEXT
 */
 export const NEXT = "NEXT";

/**
 * string that identifies a STOP action.
 * 
 * @type {string}
 * @member STOP
 */
export const STOP = "STOP";

export const beginTour = () => ({
    type: START
})

export const restartTour = () => ({
    type: RESTART
})

export const manualNext = () => ({
    type: NEXT
})

export function callback(data) { 
  return dispatch => {
    console.log(data)
    const { action, index, type, status } = data;

    if (
      // If close button clicked then close the tour
      
      // If skipped or end tour, then close the tour
      (action === ACTIONS.NEXT && index >= STEPS_COUNT) ||
      action === ACTIONS.SKIP
    ) {
        dispatch({
            type: STOP
        })
    } else {
      return;
    }
  }
}

