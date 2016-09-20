import { combineReducers } from 'redux';

import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, FETCH_POSTS,
          REQUEST_POSTS, RECEIVE_POSTS } from './Actions';


const selectSubreddit = (state = 'reactjs', action) => {
     switch (action.type) {
          case SELECT_SUBREDDIT:
               return action.payload.subreddit
               break;
          default:
               return state; 
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
                         };
                         break;
                    case RECEIVE_POSTS:
                         return {
                              ...state,
                              isFetching: false,
                              didInvalidate: false,
                              posts: action.payload.posts,
                              lastUpdated: action.meta.receivedAt
                         };
                         break;
                    default:
                         return state;
               }

}

const postsBySubreddit = (state = {}, action) => {
     switch(action.type) {
          case REQUEST_POSTS:
          case RECEIVE_POSTS:
               return {
                    ...state,
                    [action.payload.subreddit]: posts(state[action.payload.subreddit], action)
               }
               break;
          default:
               return state;
     }
}

const pageState = (state = { isFetching: false }, action) => {
     switch(action.type) {
          case REQUEST_POSTS:
               return {
                    ...state,
                    isFetching: true
               };
               break;
          case RECEIVE_POSTS:
               return {
                    ...state,
                    isFetching: false
               }
          default:
               return state;
     }
}

export default combineReducers({
     postsBySubreddit,
     pageState,
     selectSubreddit
});
