const templates = [
	{
		id: 0,
		item_type: 'template',
		value: 'Dear User \n \nWelcome to Tulola Jewlery! \nHere at Tulola we serve the best peanut butter cups in all the land!!\n'
	},
	{
		id: 1,
		item_type: 'template',
		value: 'Dear User \n \nYour order is in progress! \nWould you like to view your order?\n'
	},
	{
		id: 2,
		item_type: 'template',
		value: 'Dear User \n \nYour payment is in progress! \nWould you like to view your payment?\n'
	},
	{
		id: 3,
		item_type: 'template',
		value: 'Dear User \n \nYour payment has been processed!! \nPlease let us know if there is anything else we can help you with!\n'
	}
]

export default (state = {
  	isFetching: false,
  	dragging: false,
  	products: [],
  	templates: templates
}, action) => {
  	switch (action.type) {
  		case 'SELECT_DRAGGING':
			return Object.assign({}, state, {
		        isFetching: false,
		        dragging: action.payload
			});
  		case 'SELECT_VIEW':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selected: action.payload
			});
		case '_FETCH_PRODUCTS':
			return Object.assign({}, state, {
		        isFetching: false,
		        products: action.payload
			});
		case '_FETCH_TEMPLATES':
			return Object.assign({}, state, {
		        isFetching: false,
		        templates: action.payload
			});
    	default:
      		return state
  	}

}; 