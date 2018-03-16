import { createTypes, completeTypes, completeReducer } from '@/compose';
export const actions = createTypes(completeTypes(['CHANGE_TAB_INDEX']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onChange: index => ({ type: actions.CHANGE_TAB_INDEX, payload: index })
            },
            reducerHandlers: {
                [actions.CHANGE_TAB_INDEX](state, action) {
                    return {
                        ...state,
                        HomeTabCurIdx: action.payload
                    }
                }
            }
        }
    },
    {
        target: 'HomeTabCurIdx'
    }
);

export default actionReducerMap;

