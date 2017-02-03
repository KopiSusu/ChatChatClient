const postTabs = [
	{
		type: 'tab',
		id: 0,
		title: 'Instagram',
		className: 'column-5-1 center',
		query: 'Mine',
		icon: 'Person'
	},
	{
		type: 'tab',
		id: 1,
		title: 'Facebook',
		className: 'column-5-1 center',
		query: null,
		icon: 'Mail'
	}
]
export default (state = {
  	isFetching: false,
  	tabs: postTabs,
  	selectedTab: postTabs[0],
  	selectedPost: null,
  	posts: [],
  	query: ''
}, action) => {
    switch (action.type) {
  		case 'SELECT_TAB_INBOX':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedTab: action.payload
			});
		case '_FETCH_POSTS':
			return Object.assign({}, state, {
		        isFetching: false,
		        posts: action.payload
			});
    	default:
      		return state
  	}
}; 