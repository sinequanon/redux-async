import { fetchPostsThunk, fetchSubredditsThunk } from './Thunks'

export const AUTOCOMPLETE_SUBREDDIT = 'AUTOCOMPLETE_SUBREDDIT'

export const autocompleteSubreddit = query => (
  fetchSubredditsThunk.bind(fetchSubredditsThunk, query)
)

export const RECEIVE_SUBREDDITS = 'RECEIVE_SUBREDDITS'

export const receiveSubreddits = ({ data }) => ({
  type: RECEIVE_SUBREDDITS,
  payload: {
    subreddits: (data.data && data.data.children.map(child => child.data.display_name)) || []
  },
  meta: {
    receivedAt: Date.now()
  }
})

export const REQUEST_POSTS = 'REQUEST_POSTS'

export const requestPosts = subreddit => (
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
      posts: json.data.data.children.map(child => child.data)
    },
    meta: {
      receivedAt: Date.now()
    }
  }
)

export const FETCH_POSTS = 'FETCH_POSTS'

export const fetchPosts = subreddit => (
  fetchPostsThunk.bind(fetchPostsThunk, subreddit)
)
