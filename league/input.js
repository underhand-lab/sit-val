import * as TransitionEngine from "../src/re/transition-engine/index.js";

import { calculateRE, getRunValue } from "./re-league.js";
import { visualize } from "./visualize.js";

const batterInput = document.getElementById('batter-league');
const runnerInput = document.getElementById('runner-league');

const transitionEngine = new TransitionEngine.Standard();

function execute() {

    const batterAbility = batterInput.getAbility();
    const runnerAbility = runnerInput.getAbility();

    const ret = calculateRE(
        batterAbility, runnerAbility, transitionEngine);
    
    const actions = ['bb', '1B', '2B', '3B', 'hr', 'so', 'fo', 'go'];

    ret['runValue'] = actions.reduce((acc, action, index) => {
        const value = getRunValue(action, runnerAbility, transitionEngine, ret.RE_data, ret.N_data);

        acc[action] = {
            name: action,
            value: value
        };

        return acc;
    }, {});

    visualize(ret, batterInput.getAbilityRaw());

}

batterInput.setAfterBindInput(() => {
    batterInput.setEvent(execute);
    runnerInput.setAfterBindInput(() => {
        runnerInput.setEvent(execute);
        execute();
    });
});