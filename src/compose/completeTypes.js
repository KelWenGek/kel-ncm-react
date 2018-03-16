function completeTypes(types, ignoredActions = []) {
    let completedTypes = types.reduce((memo, type) => {
        memo.push(type);
        memo.push(`${type}_SUCCESS`);
        memo.push(`${type}_FAILURE`);
        return memo;
    }, []);
    return [...completedTypes, ...ignoredActions];
}
export default completeTypes;