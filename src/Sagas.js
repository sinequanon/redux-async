import { takeEvery } from 'redux-saga'
import { put, call, take, select } from 'redux-saga/effects'
import { FETCH_POSTS, requestPosts, receivePosts } from './Actions'
import axios from 'axios'

function *fetchPosts () {
  const state = yield select()
  console.log('state : %o', state)
  yield put(requestPosts(state.selectSubreddit))
  const { data } = yield call(axios.get, `http://www.reddit.com/r/${state.selectSubreddit}.json`)
  console.log('data', data);
  yield put(receivePosts(state.selectSubreddit, data))
}

function *watchFetchPosts () {
  yield *takeEvery(FETCH_POSTS, fetchPosts)
}

function *watchAndLog () {
  while (true) {
    const action = yield take('*')
    const { state } = yield select()
    console.log('action : %o', action)
    console.log('state : %o', state)
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
