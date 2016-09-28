import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';

const renderApp = () => {
     render(<AppContainer>
               <Root/>
          </AppContainer>, document.querySelector('#root'));
}

renderApp();

if (module.hot) {
     module.hot.accept('./components/Root', () => {
          const HotApp = require('./components/Root').default;
          renderApp();
          return true;
     })
}
