import * as  Actions from './../../actions'

export default (state = {
  	isFetching: false,
  	user: null,
    users: null,
    company: {
      "cId": 1,
      "name": "Tulola"
    },
  	loggedIn: false
}, action) => {

  switch (action.type) {
    case '_FETCH_USER':
      return Object.assign({}, state, {
        isFetching: false,
        user: action.payload,
        loggedIn: true
      });
    case '_FETCH_COMPANY':
      return Object.assign({}, state, {
        isFetching: false,
        company: action.payload
      });
    case '_FETCH_USERS':
      return Object.assign({}, state, {
        isFetching: false,
        users: action.payload
      });
    default:
      return state
  }
  
}; 
