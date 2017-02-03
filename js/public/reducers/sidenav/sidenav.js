const initStart = {
	"id": 1,
	"name": "Chats",
	"icon": "Chats",
	"query": {}
}

const navigation = [
	{
		"id": 1,
		"name": "Chats",
		"icon": "Chats",
 		"query": {}
	},
	{
		"id": 2,
		"name": "Posts",
		"icon": "Posts",
 		"query": {}
	}
]


export default (state = {
  	isFetching: false,
  	navigation: navigation,
  	selected: initStart
}, action) => {
  	switch (action.type) {
  		case 'SELECT_VIEW':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selected: action.payload
			});
		case '_FETCH_NAVIGATION':
  			return Object.assign({}, state, {
		        isFetching: false,
		        navigation: navigation
			});
    	default:
      		return state
  	}

}; 