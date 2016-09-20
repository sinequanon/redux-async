import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './Reducers';
import thunkMiddleware from 'redux-thunk';

export default () => {
     const loggerMiddleWare = createLogger();
     const store = createStore(
                         reducers,
                         applyMiddleware(
                              thunkMiddleware,
                              loggerMiddleWare
                         )
                    );
     
     if (module.hot) {
         console.log('reducers hot...');
         module.hot.accept('./Reducers', () => {
             const nextRootReducer = require('./Reducers');
             store.replaceReducer(nextRootReducer);
             // return true to indicate that this module is accepted and
             // there is no need to reload its parent modules
             return true;
         });
     }
     return store;
}
