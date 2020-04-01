import { createStore } from 'redux';

const ACTIONS = {};

const INITIAL = {};

export default createStore(
	(state, action) => (
		action && ACTIONS[action.type]
		? ACTIONS[action.type](state, action)
		: state
	),
	INITIAL,
	typeof devToolsExtension==='function'
		? devToolsExtension()
		: undefined
);
