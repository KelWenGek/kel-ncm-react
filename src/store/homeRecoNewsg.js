import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_RECO_NEWSG']), 'HOME')
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
        target: 'HomeRecoNewsg',
        primaryActions: [actions.GET_HOME_RECO_NEWSG]
    }
);

export default actionReducerMap;

