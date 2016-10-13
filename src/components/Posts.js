import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Post from './Post'

const Posts = ({ subreddit }) =>
  <ul>
    { subreddit && subreddit.posts.map(post =>
        <Post key={post.id} post={post}/>)}
  </ul>

const mapStateToProps = (state) => {
  const subreddit = _.get(state, 'form.Form.values.subreddit', null)
  return {
    subreddit: subreddit && state.postsBySubreddit[subreddit]
  }
}

export default connect(mapStateToProps)(Posts)
