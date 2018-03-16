export default function completeState(defaultState, ignoredTargets = []) {
    let completedState = {};
    completedState = { ...defaultState };
    Object.keys(defaultState).filter(key => ignoredTargets.indexOf(key) === -1).forEach(target => {
        completedState[`${target}Loading`] = false;
        completedState[`${target}Error`] = null;
    });
    return completedState;
}