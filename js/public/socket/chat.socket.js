import io from 'socket.io-client';
import React from 'react';

import {
	fetchData
} from './../actions'


export const initSocket = () => {
	const serverAddress = `${location.protocol}//${location.hostname}:8090`;
	const socket = io(serverAddress);

	return socket;
}


export const configListener = (store, socket) => {
	socket.on('connect', function (action, data) {
		// inital connect logic
		// We want to request state.
	});

	// socket.on('state', function (action, data) {
	// 	// Distpact action directly to store	
	// 	debugger
	// 	store.dispatch()
	// });

	// We should determin several different error types and a catch all type.
	socket.on('_ACTION', function (action, data) {
		// Distpact action directly to store	
		store.dispatch()
	});

	// we should determin several different error types and a catch all type.
	socket.on('_ERROR', function (action, data) {
		// Distpact action directly to store
		store.dispatch()
	});


	// do socket switch here, need to build out
	// primarily check for errors.
	// send back ERROR_TYPE to reducer if failed <--- this will be its own error reducer
	// send back SUCCESS_TYPE to reducer if success <--- this will go down normal path

}

export default initSocket





// import io from 'socket.io-client';
// import React from 'react';

// import {
// 	fetchData
// } from './../actions'


// export const initSocket = () => {
// 	// const socket = new WebSocket("ws://138.197.61.193:9000/ws");

// 	const socket = io(`${location.protocol}//${location.hostname}:8090`);
// 	// socket.on('state', state =>
// 	//   store.dispatch(setState(state))
// 	// );

// 	// [
// 	//   'connect',
// 	//   'connect_error',
// 	//   'connect_timeout',
// 	//   'reconnect',
// 	//   'reconnecting',
// 	//   'reconnect_error',
// 	//   'reconnect_failed'
// 	// ].forEach(ev =>
// 	//   socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
// 	// );

//   	return socket;
// }


// export const configListener = (store, socket) => {
// 	const onOpen = (evt) => {
// 	  store.dispatch(fetchData('chat', '_FETCH_MESSAGES'))
// 	}
// 	socket.onopen = function(evt) { onOpen(evt) };

// 	const onMessage = (action) => {
// 		store.dispatch({
// 			type: '_SUBMIT_MESSAGE',
// 			payload: JSON.parse(action.data)
// 		})
// 	}
// 	socket.onmessage = function(evt) { onMessage(evt) };
// }

// export default initSocket


