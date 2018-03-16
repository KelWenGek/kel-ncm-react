import axios from 'axios';
import { baseURL } from '@/constants/PATH';
axios.defaults.baseURL = baseURL;
export function fetch(context) {
    let { options, dispatch, actionCreators, dataTarget = ['result'] } = context;
    return new Promise((resolve, reject) => {
        dispatch(actionCreators.onLoading());
        axios(options).then(({ data }) => {
            if (data.code === 200) {
                let result = dataTarget.reduce((memo, target) => memo[target], data) || [];
                dispatch(actionCreators.onSuccess({
                    loaded: true,
                    data: result
                }));
                resolve(result);
            } else {
                let err = {
                    message: '请求出错'
                };
                dispatch(actionCreators.onFailure(err));
                reject(err);
            }
        }).catch(err => {
            reject(err);
            dispatch(actionCreators.onFailure(err))
        });
    });
}