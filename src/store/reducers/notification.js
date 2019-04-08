import actionType from '../actions/actionType'

const initState = {
  content: [
    {
      id: 1,
      title: '消息一',
      hasRead: false
    },
    {
      id: 2,
      title: '消息二',
      hasRead: false
    },
    {
      id: 3,
      title: '消息三',
      hasRead: false
    },
    {
      id: 4,
      title: '消息四',
      hasRead: true
    },
    {
      id: 5,
      title: '消息五',
      hasRead: false
    },
    {
      id: 6,
      title: '消息六',
      hasRead: true
    }
  ]
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionType.MASK_NOTIFICATION_READ:
      return {
        ...state,
        content: state.content.map( item => {
          if ( item.id === action.payload.id ) {
            item.hasRead = true
          }
          return item;
        })
      }
    case actionType.MASK_ALL_NOTIFICATION_READ:
      return {
        ...state,
        content: state.content.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return state
  }
}