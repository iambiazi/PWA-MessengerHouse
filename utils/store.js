import { createStore, compose, applyMiddleware } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import rootReducer from '../reducers'

const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.devToolsExtension && window.devToolsExtension()
		: f => f
)

export default initialState =>
createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(),
		offline(offlineConfig)
	)
);
