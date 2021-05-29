import {
  NOTIFICATION_CREATE_REQUEST,
  NOTIFICATION_CREATE_SUCCESS,
  NOTIFICATION_CREATE_FAIL,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_FAIL,
} from "../constants/notificationConstants";

export const createNotification =
  ({ body }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/streams`, { body }, config);
      dispatch({
        type: NOTIFICATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listNotifications =
  (userHandler) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_LIST_REQUEST });
      const { data } = await axios.get(`/api/streams/${userHandler}/user`);
      console.log(data);
      dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateNotification =
  (streamID, index) => async (dispatch, getState) => {
    const currentItem = { index };
    try {
      dispatch({ type: NOTIFICATION_UPDATE_REQUEST, payload: index });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(
        `/api/streams/${streamID}/unlike`,
        config
      );

      dispatch({
        type: NOTIFICATION_UPDATE_SUCCESS,
        payload: { data, ...currentItem },
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_UPDATE_FAIL,
        payload: {
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          ...currentItem,
        },
      });
    }
  };
