/* @flow */

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import socketServer from './../socket/chat.socket';
import rootReducer from "../reducers";
import remoteActionMiddleware from './remote-action-middleware';

const loggerMiddleware = createLogger();

let socket = socketServer()

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket),
  	thunkMiddleware,
  	loggerMiddleware
)(createStore);

export const socketConnection = () => {
	return socket
}

export const configureStore = function (initialState: Object = {}): Function {
  return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;
