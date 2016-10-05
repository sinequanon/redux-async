import { takeEvery } from 'redux-saga'
import { put, call, take, select, fork } from 'redux-saga/effects'
import { FETCH_POSTS, requestPosts, receivePosts } from './Actions'
import axios from 'axios'

function *fetchPosts () {
  const state = yield select()
  console.log('state : %O', state)
  console.log('state.selectSubreddit : %s', state.selectSubreddit);
  yield put(requestPosts(state.selectSubreddit))
  const { data } = yield call(axios.get, `http://www.reddit.com/r/${state.selectSubreddit}.json`)
  return { data, selectSubreddit: state.selectSubreddit };
}

function *watchFetchPosts () {
  // yield *takeEvery(FETCH_POSTS, fetchPosts)
  while (yield(take(FETCH_POSTS))) {
    const { data, selectSubreddit } = yield(call(fetchPosts))
    console.log('wfp data', data);
    console.log('wfp selectSubreddit', selectSubreddit);
    yield put(receivePosts(selectSubreddit, data))
  }
}

function *watchAndLog () {
  while (true) {
    const action = yield take('*')
    const { state } = yield select()
    console.log('action : %O', action)
    console.log('state : %O', state)
  }
}

function *helloSaga () {
  console.log('Hello Saga!');
}
export function *rootSaga () {
  yield [
    watchFetchPosts(),
    watchAndLog()
  ]
}
