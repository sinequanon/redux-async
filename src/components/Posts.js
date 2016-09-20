import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Posts = ({postsBySubreddit}) => {
     let posts;
          for (let subreddit in postsBySubreddit) {
               posts = postsBySubreddit[subreddit].posts.map(post =>(
                    <li key={post.id}>{post.title}</li>
               )) 
          }

     return (
          <ul>
          {posts}
          </ul>
     );
}


const mapStateToProps = state => {
     return {
          postsBySubreddit: state.postsBySubreddit
     }
}

export default connect(mapStateToProps)(Posts)
