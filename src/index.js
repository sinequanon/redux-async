/*
  eslint import/no-extraneous-dependencies: "off",
  global-require: "off"
 */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './components/Root'
import './styles/app.css'

render(<AppContainer>
  <Root/>
</AppContainer>, document.querySelector('#root'))

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const HotRoot = require('./components/Root').default
    render(<AppContainer>
      <HotRoot/>
    </AppContainer>, document.querySelector('#root'))
    return true
  })
}
