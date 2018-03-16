import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_PLAYLIST']), 'PLAYLIST')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: options => async dispatch => {
                    fetch({ options, dispatch, actionCreators, dataTarget: ['playlist'] });
                }
            }
        }
    },
    {
        target: 'Playlist',
        primaryActions: [actions.GET_PLAYLIST]
    }
);

export default actionReducerMap;

