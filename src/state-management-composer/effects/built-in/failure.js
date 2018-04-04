import { mergeDeep } from 'immutable';
export default function failure({ selector = (action, state) => action.payload.error } = {}) {
    return (state, action) => mergeDeep(state, {
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: (action.payload && action.payload.selector || selector)(action, state)
    })
}