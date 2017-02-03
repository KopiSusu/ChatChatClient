/* @flow */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import sidenav from './sidenav/sidenav'

import auth from './auth/auth'

import inbox from './chats/inbox'
import chat from './chats/chat'

import posts from './posts/posts'

import items from './items/items'

import socket from './socket/socket'

const rootReducer = combineReducers({
  sidenav: sidenav,
  auth: auth,
  chat: chat,
  inbox: inbox,
  posts: posts,
  items: items,
  routing: routerReducer
});

export default rootReducer;

