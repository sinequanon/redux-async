import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { AUTOCOMPLETE_SUBREDDIT, RECEIVE_SUBREDDITS,
  REQUEST_POSTS, RECEIVE_POSTS } from './Actions'


const autocompleteSubreddit = (state = {
  query: '',
  subreddits: []
}, action) => {
  switch (action.type) {
    case AUTOCOMPLETE_SUBREDDIT:
      return {
        ...state,
        query: action.payload.query
      }
    case RECEIVE_SUBREDDITS:
      return {
        ...state,
        subreddits: action.payload.subreddits
      }
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  posts: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        posts: action.payload.posts,
        lastUpdated: action.meta.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.payload.subreddit]: posts(state[action.payload.subreddit], action)
      }
    default:
      return state
  }
}

const pageState = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default combineReducers({
  postsBySubreddit,
  pageState,
  autocompleteSubreddit,
  form: formReducer
})
