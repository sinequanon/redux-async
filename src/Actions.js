import axios from 'axios'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export const selectSubreddit = (subreddit) => (
  {
    type: SELECT_SUBREDDIT,
    payload: {
      subreddit
    }
  }
)

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const invalidateSubreddit = (subreddit) => (
  {
    type: INVALIDATE_SUBREDDIT,
    payload: {
      subreddit
    }
  }
)

export const REQUEST_POSTS = 'REQUEST_POSTS'

export const requestPosts = (subreddit) => (
  {
    type: REQUEST_POSTS,
    payload: {
      subreddit
    }
  }
)

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = (subreddit, json) => (
  {
    type: RECEIVE_POSTS,
    payload: {
      subreddit,
      posts: json.data.children.map(child => child.data)
    },
    meta: {
      receivedAt: Date.now()
    }
  }
)

export const FETCH_POSTS = 'FETCH_POSTS'

export const fetchPosts = (subreddit) => {
  return {
    type : FETCH_POSTS,
    payload : {
      subreddit
    }
  }
  // return (dispatch) => {
  //   dispatch(requestPosts(subreddit))
  //   return axios.get(`http://www.reddit.com/r/${subreddit}.json`).
  //     // then(response => response.json()).
  //     then(json => {
  //       dispatch(receivePosts(subreddit, json))
  //     })
  // }
}

