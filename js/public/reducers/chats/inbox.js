const chatTabs = [
	{
		type: 'tab',
		id: 0,
		title: 'My Inbox',
		className: 'column-5-1',
		query: 'Mine',
		icon: 'Person'
	},
	{
		type: 'tab',
		id: 1,
		title: 'All Tickets',
		className: 'column-5-1',
		query: null,
		icon: 'Mail'
	},
	{
		type: 'tab',
		id: 2,
		title: 'New Tickets',
		className: 'column-5-1',
		query: 'New',
		icon: 'Conversation'
	},
	{
		type: 'icon',
		action: 'add',
		className: 'add',
		icon: 'PlusOutline'
	},
    {
        type: 'icon',
        action: 'log-out',
        className: 'solo right interactive',
        icon: 'LogOut'
    },
    {
        type: 'icon',
        action: 'settings',
        className: 'solo right interactive',
        icon: 'Gear'
    },
    {
        type: 'icon',
        action: 'notifications',
        className: 'solo right interactive',
        icon: 'Bell'
    }
]

export default (state = {
  	isFetching: false,
  	tabs: chatTabs,
  	selectedTab: chatTabs[0],
  	selectedTicket: null,
  	highlightTicket: null,
  	tickets: [],
  	query: ''
}, action) => {
	let messages;
	let tickets;
	let index;
    switch (action.type) {
		case 'SELECT_HIGHLIGHT':   	
  			let returnPayload = {
		        isFetching: false,
		        highlightTicket: action.payload
			}
  			return Object.assign({}, state, returnPayload);
  		case 'SELECT_ASSIGNEE':
		  	tickets = [...state.tickets]
			index = _.findIndex(tickets, (ticket) => {
				return ticket.id === action.payload.id
			})

	  		// Find ticket and alter read status with uId
			let replaceTicket = tickets[index]
			replaceTicket.assignee = action.secondaryProperty

			// Replace item at index using native splice
			tickets.splice(index, 1, replaceTicket)
			
			return Object.assign({}, state, {
		        isFetching: false,
		        tickets: tickets
			});
		case 'SELECT_TICKET':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedTicket: action.payload
			});
  		case 'SELECT_TAB_CHATS':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedTab: action.payload
			});
		case '_FETCH_TICKETS':
			return Object.assign({}, state, {
		        isFetching: false,
		        tickets: action.payload
			});
		case 'UPDATE_TICKET':
			tickets = [...state.tickets]
			index = _.findIndex(tickets, (ticket) => {
				return ticket.id === action.payload.id
			})

			// Replace item at index using native splice
			tickets.splice(index, 1, action.payload)

			return Object.assign({}, state, {
		        isFetching: false,
		        tickets: action.payload
			});
    	default:
      		return state
  	}
}; 