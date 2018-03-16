import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_RECO_PLAYLIST']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: options => async dispatch => {
                    fetch({ options, dispatch, actionCreators });
                }
            }
        }
    },
    {
        target: 'HomeRecoPlaylist',
        primaryActions: [actions.GET_HOME_RECO_PLAYLIST]
    }
);
export default actionReducerMap;

