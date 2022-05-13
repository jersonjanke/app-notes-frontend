import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const makeStore = () => {
  return createStore(reducers, composeWithDevTools());
};

export const storeWrapper = createWrapper(makeStore, { debug: false });
