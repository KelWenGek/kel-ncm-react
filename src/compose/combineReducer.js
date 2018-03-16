function combineReducer(actionReducerMap) {
    if (!actionReducerMap) {
        throw new Error('reducerHandlers for combineReducer must be a array');
    }
    return (Array.isArray(actionReducerMap) ? actionReducerMap : [actionReducerMap]).map(m => m.reducerHandlers).reduce((combinedReducers, reducerHandlers) => {
        Object.keys(reducerHandlers).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(combinedReducers, key)) {
                throw new Error(`the root reducer has a duplicate key ${key}`)
            } else {
                combinedReducers[key] = reducerHandlers[key];
            }
        });
        return combinedReducers;
    }, {});
}

export default combineReducer;