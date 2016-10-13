import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { AutoComplete } from 'redux-form-material-ui'
import { FlatButton, AutoComplete as MUIAutoComplete } from 'material-ui'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchPosts, autocompleteSubreddit } from '../Actions'

const Form = ({ subreddits = [], subreddit = '', onFetchPosts, onAutoComplete }) =>
  <div>
    <form>
      <Field name='subreddit'
        component={AutoComplete}
        type='text'
        hintText='Enter a subreddit name'
        filter={MUIAutoComplete.fuzzyFilter}
        dataSource={subreddits}
        onUpdateInput={(val) => { onAutoComplete(val) }}
        floatingLabelText='Subreddit'/>
      <FlatButton label='Submit' primary={true} onClick={() => { onFetchPosts(subreddit) }}/>
    </form>
  </div>

const mapStateToProps = state => ({
  subreddit: _.get(state, 'form.Form.values.subreddit'),
  subreddits: _.get(state, 'autocompleteSubreddit.subreddits', [])
})

const mapDispatchToProps = dispatch => ({
  onFetchPosts: (subreddit) => { dispatch(fetchPosts(subreddit)) },
  // Debounce the autocomplete function
  onAutoComplete: _.debounce((query) => {
    // console.debug('query', query)
    dispatch(autocompleteSubreddit(query))
  },
    300,
    { leading: true, trailing: true, maxWait: 500 }
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'Form'
})(Form))
