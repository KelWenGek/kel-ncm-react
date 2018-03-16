export default function createReducer(initialState = null, reducerDescription) {
    return (state = initialState, action) => {
        const handler = reducerDescription[action.type];
        return handler ? handler(state, action) : state;
    }
}