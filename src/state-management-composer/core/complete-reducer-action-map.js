import effects from '../effects'
import { capitalize, normalizeTypeForEffect } from '../util';
export default function completeReducerActionMap(targets) {
    const reducerHandlers = {}, actionCreators = {};
    if (targets && targets.length) {
        targets.forEach(target => {
            effects.types.forEach(type => {
                let actionCreatorType = `on${capitalize(target)}${capitalize(type)}`,
                    typeForSpecificAction = normalizeTypeForEffect({ effect: type, target });
                actionCreators[actionCreatorType] = payload => ({ type: typeForSpecificAction, payload, target });
                const reducerHandlerForSpecificType = effects[type]();
                reducerHandlers[typeForSpecificAction] = function (state, action) {
                    action = { ...action, ...{ target } };
                    return reducerHandlerForSpecificType.call(null, state, action);
                };
            });
        });
    }
    return { reducerHandlers, actionCreators };
}
