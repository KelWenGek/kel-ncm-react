import * as effects from './effect';
function completeReducer(factory, options = {}) {
    if (typeof factory === 'object') {
        options = factory;
        factory = null;
    }
    if (typeof factory !== 'function') {
        throw new Error('the argument factory should be a function or an object option');
    }
    let reducerHandlers = {}, actionCreators = {}, actions;
    if (options.primaryActions) {
        (Array.isArray(actions = options.primaryActions)
            ? actions
            : [actions]).forEach(actionName => {
                effects.types.forEach(type => {
                    let target = options.target, normalizedType = `${actionName}_${type.toUpperCase()}`;
                    actionCreators[`on${type}`] = payload => ({ type: normalizedType, payload, target });
                    reducerHandlers[normalizedType] = effects[`on${type}`](options.selectors && options.selectors[type]);
                });
            });
    }
    const override = factory && factory.call(this, reducerHandlers, actionCreators);
    if (override) {
        reducerHandlers = { ...reducerHandlers, ...override.reducerHandlers };
        actionCreators = { ...actionCreators, ...override.actionCreators };
    }
    return { reducerHandlers, actionCreators };
}
export default completeReducer;

