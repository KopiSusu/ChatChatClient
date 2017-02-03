const selectedTabs = [
	[
		{
			type: 'icon',
			action: 'back',
			className: 'small solo column-15-1',
			icon: 'Left'
		},
		{
			type: 'tab',
			id: 0,
			title: 'Details',
			className: 'small column-13-4',
			query: 'details',
			icon: 'Person'
		},
		{
			type: 'tab',
			id: 1,
			title: 'Order',
			className: 'small column-13-4',
			query: 'order',
			icon: 'Order'
		},
		{
			type: 'tab',
			id: 2,
			title: 'Payment',
			className: 'small column-13-4',
			query: 'payment',
			icon: 'Cash'
		}
	],
	[
		{
			type: 'text bubble'
		}
		// {
		// 	type: 'select',
		// 	options: [
		// 		{
		// 			label: 'Tag as inquery',
		// 			value: 'i'
		// 		},
		// 		{
		// 			label: 'Tag as order',
		// 			value: 'o'
		// 		},
		// 		{
		// 			label: 'Tag as payment',
		// 			value: 'p'
		// 		},
		// 		{
		// 			label: 'Remove tag',
		// 			value: 'd'
		// 		}
		// 	]
		// }
	]
]

const contextMenu = [
	{
		type: 'action',
		action: 'inquery tag',
		icon: 'Inquery',
		value: 'i',
		text: 'Tag as Inquery'
	},
	{
		type: 'action',
		action: 'order tag',
		icon: 'Cart',
		value: 'o',
		text: 'Tag as Order'
	},
	{
		type: 'action',
		action: 'payment tag',
		icon: 'Cash',
		value: 'p',
		text: 'Tag as Payment'
	},
	{
		type: 'action',
		action: 'remove tag',
		icon: 'Minus',
		value: null,
		text: 'Remove Tag'
	},
	{
		type: 'action',
		action: 'copy',
		icon: 'CopyOutline',
		text: 'Copy'
	}
]

const chatTabs = [
	{
		id: 0,
		type: 'action',
		action: '',
		icon: 'Write',
		text: 'textarea'
	},
	{
		id: 1,
		type: 'action',
		action: 'templates',
		icon: 'Copy',
		text: 'Templates'
	},
	{
		id: 2,
		type: 'action',
		action: 'products',
		icon: 'Cart',
		text: 'Products'
	}
]

export default (state = {
  	isFetching: false,
  	dragging: false,
  	contextOpen: false,
  	contextMenu: contextMenu,
  	contextPlacement: {
  		left: 0,
  		top: 0
  	},
  	selectedTab: selectedTabs[0][1],
  	selectedChatTab: chatTabs[0],
  	selectedTicket: null,
  	tabs: selectedTabs,
  	chatTabs: chatTabs,
  	messages: [],
  	cart: [],
  	payment: null,
  	order: null,
  	highlightedMessages: [],
  	query: ''
}, action) => {
	let index;
  	switch (action.type) {
  		case 'SELECT_DRAGGING':
			return Object.assign({}, state, {
		        isFetching: false,
		        dragging: action.payload
			});
		case 'SELECT_TAB_TICKET':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedTab: action.payload
			});
		case 'SELECT_TAB_CHAT':
  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedChatTab: action.payload
			});
  		case 'SELECT_TICKET':
  			if (action.payload && !action.payload.platform)
  				action.payload.platform = 'SMS'

  			return Object.assign({}, state, {
		        isFetching: false,
		        selectedTicket: action.payload,
		        cart: [],
		        messages: [],
		        selectedTab: selectedTabs[0][1],
			    tabs: selectedTabs
			});
		case 'SELECT_HIGHLIGHT_MESSAGE':
			let newHighlightedMessages = [...state.highlightedMessages]

			if(action.payload === 'empty') {
				newHighlightedMessages = []
			} else if(newHighlightedMessages.indexOf(action.payload) > -1) {
				newHighlightedMessages.splice(newHighlightedMessages.indexOf(action.payload), 1)
			} else {
				newHighlightedMessages.push(action.payload)
			}

			return Object.assign({}, state, {
				isFetching: false,
		        highlightedMessages: newHighlightedMessages
			});
		case 'SELECT_TAGS_MESSAGE':
            let tagMessages = _.map([...state.messages], (message) => {
            	if (state.highlightedMessages.indexOf(message.id) > -1)
            		message.tag = action.payload

            	return message
            })
            
			return Object.assign({}, state, {
				isFetching: false,
		        messages: tagMessages,
		        highlightedMessages: []
			});
		case 'SELECT_CONTEXT_OPEN':
			return Object.assign({}, state, {
				isFetching: false,
		        contextOpen: action.payload
			});
		case 'SELECT_CONTEXT_PLACEMENT':
			return Object.assign({}, state, {
				isFetching: false,
		        contextPlacement: action.payload
			});
		case '_FETCH_MESSAGES':
			console.log(action.payload)
			return Object.assign({}, state, {
		        isFetching: false,
		        messages: action.payload.reverse() || []
			});	
		case '_FETCH_CART': 
			let newCart = _.map(action.payload.item_objects, (item) => {
				item.quantity = 1
				return item
			})
			return Object.assign({}, state, {
		        isFetching: false,
		        cart: newCart
			});		
		case '_FETCH_ORDER':
			let newOrder = action.payload

			if(!newOrder) {
				newOrder = {
	                collection_type: "order",
	                active: false, 
	                cart: "",
	                tag: null,
	                account_id: 1,
	                customer_id: state.selectedTicket.id,
	                item_list: null,
	                item_id: null,
	                data: null,
	                img_src: null
	            }
	        }
			
			if(Array.isArray(newOrder))
				newOrder = action.payload[0]

			if(!newOrder.item_list) {
				newOrder.item_list = []
			} else {
				newOrder.item_list = newOrder.item_list.split(',')
			}

			return Object.assign({}, state, {
		        isFetching: false,
		        order: newOrder
			});		
  		case '_SUBMIT_MESSAGE':
            let newMessages = [...state.messages]
            newMessages.push(action.payload)

			return Object.assign({}, state, {
		        isFetching: false,
		        messages: newMessages
			});	
		case '_SUBMIT_PAYMENT':
			return Object.assign({}, state, {
		        isFetching: false,
		        payment: action.payload
			});	
		case '_SUBMIT_PRODUCT_CART':
			let addProductToCart = [...state.cart]
			index = _.findIndex(addProductToCart, (ticket) => {
				return ticket.id === action.payload.id
			})

			if(index === -1) {
				addProductToCart.push(action.payload)
				index = addProductToCart.length - 1
				addProductToCart[index].quantity = 0
			}

			if(action.payload.quantity) {
				addProductToCart[index].quantity = action.payload.quantity
			} else {
				addProductToCart[index].quantity++
			}

			return Object.assign({}, state, {
		        isFetching: false,
		        cart: addProductToCart
			});	
		case '_REMOVE_PRODUCT_CART':
			let removeProductToCart = [...state.cart]
			index = _.findIndex(removeProductToCart, (ticket) => {
				return ticket.id === action.payload.id
			})

			// Replace item at index using native splice
			removeProductToCart.splice(index, 1)

			return Object.assign({}, state, {
		        isFetching: false,
		        cart: removeProductToCart
			});		
    	default:
      		return state
  	}

}; 