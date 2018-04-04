export default function completeState(target) {
    return {
        [`${target}Loading`]: false,
        [target]: {
            // data: [],
            pageIndex: 1,
            pageSize: 10,
            loaded: false
        },
        [`${target}Error`]: null
    }
}