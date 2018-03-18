import axios from 'axios';
import { baseURL } from '@/constants/PATH';
axios.defaults.baseURL = baseURL;
export function fetch(context) {
    let { options, dispatch, actionCreators } = context;
    dispatch(actionCreators.onLoading());
    return axios(options).catch(err => {
        dispatch(actionCreators.onFailure(err))
    });
}