import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPosts } from '../Actions';
import Posts from './Posts';

const App = ({dispatch, isFetching, subreddit}, context) => { 
     const header = <h1>{ isFetching ? 'Fetching posts...' : 'Reddit Simulator' }</h1>;
     return <div>
               { header }
               <h3>Enter a valid subreddit name</h3>
          <input type="text" name="subredditName" onChange={ e => {
                         console.log('e : %o', e.target.value);
                         console.log('subreddit : %s', subreddit);;
                         dispatch(selectSubreddit(e.target.value));
                    }
               }
               defaultValue="reactjs"/>
               <button onClick={
                    e => {
                          
                         dispatch(fetchPosts(subreddit));
                    }
               }>Get Posts</button>
               <Posts/>
          </div>
}
App.contextTypes = {
     store: PropTypes.object
}

const mapStateToProps = state => {
     console.log('App mapStateTopProps', state);
     return     {
          isFetching: state.pageState.isFetching,
          subreddit: state.selectSubreddit
     }
}

export default connect(mapStateToProps)(App);
