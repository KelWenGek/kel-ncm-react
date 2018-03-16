import Immutable from 'seamless-immutable';
const sep = '/'
function stringArrayToObject(actionsArray, namespace) {
    if (actionsArray.some(actionName => !actionName || typeof actionName !== 'string')) {
        throw new Error('Action names must be an array of strings.')
    }
    return Immutable(actionsArray).asObject(actionName => [
        actionName,
        namespace ? `${namespace}${sep}${actionName}` : actionName
    ]);
}

function createTypes(actionsArray, namespace) {
    if (!namespace) console.warn('No namespace provided while creating action types');
    return stringArrayToObject(actionsArray, namespace);
}

export default createTypes;
