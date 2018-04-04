import { mergeDeep } from 'immutable';
export default function loading({ selector = (action, state) => true } = {}) {
    return (state, action) => mergeDeep(state, {
        [`${action.target}Loading`]: (action.payload && action.payload.selector || selector)(action, state)
    });
}