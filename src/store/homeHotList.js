import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_HOT_LIST']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: options => async dispatch => {
                    fetch({ options, dispatch, actionCreators, dataTarget: ['playlist', 'tracks'] });
                }
            }
        }
    },
    {
        target: 'HomeHotList',
        primaryActions: [actions.GET_HOME_HOT_LIST]
    }
);

export default actionReducerMap;

