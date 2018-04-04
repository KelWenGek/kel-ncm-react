import { mergeDeep } from 'immutable';
export default function success({ selector = (action, state) => action.payload.data } = {}) {
    return (state, action) => mergeDeep(state, {
        [`${action.target}Loading`]: false,
        [action.target]: (action.payload && action.payload.selector || selector)(action, state),
        [`${action.target}Error`]: null
    });
}


// const payload = {
//     error: '',//错误信息
//     data: '',//有效数据
//     selector: '',//数据过滤
// }