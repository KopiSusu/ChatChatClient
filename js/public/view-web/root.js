import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {fetchData, fetchRealData, requestData} from './../actions';
import {configureStore, socketConnection} from './../store/configure-store';
import {configListener} from './../socket/chat.socket.js'

import Scene from './scene/scene.js'

import Chats from './scene/core/chats/chats'
import Inbox from './scene/core/chats/components/inbox/inbox'
import Chat from './scene/core/chats/components/chat/chat'

import Posts from './scene/core/posts/posts'


const user = 'user'

// Add the reducer to your store on the `routing` key
const store = configureStore();
// const socket = configListener(store, socketConnection());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

// Configure View
// store.dispatch(fetchData(user, '_FETCH_USER'))
store.dispatch(fetchRealData('account/1/user/1', '_FETCH_USER'))

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
		  	<Route component={Scene}>
		    	<Route path="chats" component={Chats}>
		    		<IndexRoute component={Inbox}/>
		    		<Route path=":ticketID" component={Chat}/>
		    	</Route>
		    	<Route path="posts" component={Posts}>
		    	</Route>
		  	</Route>
		  	<Redirect from="/" to="chats"/>
		</Router>
	</Provider>,
	document.getElementById('Gong')
)


