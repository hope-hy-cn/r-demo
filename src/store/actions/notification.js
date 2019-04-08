import actionType from './actionType';

export const maskNotificationRead = (id) => {
  return {
    type: actionType.MASK_NOTIFICATION_READ,
    payload: {
      id
    }
  }
}

export const maskAllNotificationRead = () => {
  return {
    type: actionType.MASK_ALL_NOTIFICATION_READ
  }
}