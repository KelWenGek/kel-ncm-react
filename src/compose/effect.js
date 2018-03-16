import createTypes from './createTypes';

export const types = ['Loading', 'Success', 'Failure'];


export function onLoading(selector = (action, state) => true) {
    return (state, action) => ({
        ...state,
        [`${action.target}Loading`]: selector(action, state)
    });
}

export function onSuccess(selector = (action, state) => action.payload) {
    return (state, action) => ({
        ...state,
        [`${action.target}Loading`]: false,
        [action.target]: selector(action, state),
        [`${action.target}Error`]: null
    })
}

export function onFailure(selector = (action, state) => action.payload) {
    return (state, action) => ({
        ...state,
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: selector(action, state)
    })
}