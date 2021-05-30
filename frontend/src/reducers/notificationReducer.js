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

export const notificationListReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    //retrieve notification
    case NOTIFICATION_LIST_REQUEST:
      return {
        loading: true,
        notifications: [],
        error: null,
      };
    case NOTIFICATION_LIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload,
      };
    case NOTIFICATION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NOTIFICATION_UPDATE_REQUEST:
      return {
        ...state,
        notifications: [
          ...state.notifications.slice(0, action.payload),
          {
            ...state.notifications[action.payload],
            loading: true,
            error: null,
          },
          ...state.notifications.slice(action.payload + 1),
        ],
      };
    case NOTIFICATION_UPDATE_SUCCESS:
      const i = state.notifications.findIndex((notification) => {
        return notification._id === action.payload.data._id;
      });
      state.notifications[action.payload.index].loading = false;
      state.notifications[i] = action.payload.data;
      return {
        ...state,
      };
    case NOTIFICATION_UPDATE_FAIL:
      return {
        ...state,
        notifications: [
          ...state.notifications.slice(0, action.payload.index),
          {
            ...state.notifications[action.payload.index],
            loading: false,
            error: action.payload.error,
          },
          ...state.notifications.slice(action.payload.index + 1),
        ],
      };
    default:
      return state;
  }
};
