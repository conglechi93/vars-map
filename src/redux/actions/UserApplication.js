import API from 'api/Request';
import {
  GET_MANAGABLE_APPLICATION_ERROR,
  GET_MANAGABLE_APPLICATION_REQUEST,
  GET_MANAGABLE_APPLICATION_SUCCESS,

} from 'shared/constants/ActionTypes';
import {
  GET_MANAGABLE_APPLICATION_API,
} from 'shared/constants/ApiUrls';
import {REQUEST_MUTED} from '@api/RequestEnum';
export const onGetManagableApplication = () => {
  return (dispatch) => {
    dispatch({type: GET_MANAGABLE_APPLICATION_REQUEST});
    return API.get(GET_MANAGABLE_APPLICATION_API, {REQUEST_MUTED})
      .then((data) => {
        dispatch({
          type: GET_MANAGABLE_APPLICATION_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MANAGABLE_APPLICATION_ERROR,
          payload: error.message,
        });
      });
  };
};
