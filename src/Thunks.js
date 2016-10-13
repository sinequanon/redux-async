import axios from 'axios'
import { receivePosts, requestPosts, receiveSubreddits } from './Actions'

export const fetchPostsThunk = (subreddit, dispatch) => {
  dispatch(requestPosts(subreddit))
  return axios.get(`http://www.reddit.com/r/${subreddit}.json`)
    .then((json) => {
      dispatch(receivePosts(subreddit, json))
    })
}

export const fetchSubredditsThunk = (query, dispatch) => (
  axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}`)
    .then((json) => {
      dispatch(receiveSubreddits(json))
    })
)
