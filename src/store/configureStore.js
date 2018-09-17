import {createStore, applyMiddleware} from '../../../../../.cache/typescript/2.9/node_modules/redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}