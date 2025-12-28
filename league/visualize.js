import * as Calc from "../src/sabermetrics/calc.js";
import { VisualizerPersonal } from "./visualizer/visualizer-personal.js";
import { VisualizerLeague } from "./visualizer/visualizer-league.js";
import { VisualizerRunValue } from "./visualizer/visualizer-run-value.js";
import { Visualizer9RE } from "./visualizer/visualizer-9RE.js";
import { VisualizerRE24 } from "./visualizer/visualizer-RE24.js";

import { BoxList } from "../src/ui/box-list.js"

const boxList = new BoxList(document.getElementById('boxes'));
const toolSelect = document.querySelector('#tool-select');

let visualizers = [];

function addToolRaw(src, visualizer) {
    return new Promise((resolve, reject) => {
        boxList.addBoxTemplate(src, () => {
            visualizer = visualizers.filter(vs => vs !== visualizer);
        }, (box) => {
            box.className = 'container neumorphism';

            visualizer.bindElement(box);
            visualizers.push(visualizer);
            apply(visualizer);
            resolve();
        });
    });

}

function addTool(src, visualizer) {
    addToolRaw(src, visualizer).then(() => {
        toolSelect.closeAction();
        let bottom = document.body.scrollHeight;
        window.scrollTo({ top: bottom, left: 0, behavior: 'smooth' });
    })
}

const addVisualizePersonalBtn =
    document.querySelector('#add-visualizer-personal');
const addVisualizeLeagueBtn =
    document.querySelector('#add-visualizer-league');
const addVisualizeRunValueBtn =
    document.querySelector('#add-visualizer-run-value');
const addVisualize9REBtn =
    document.querySelector('#add-visualizer-9RE');
const addVisualizeRE24Btn =
    document.querySelector('#add-visualizer-RE24');

addVisualizePersonalBtn.addEventListener('click', () => {
    const visualizePersonal = new VisualizerPersonal();

    visualizePersonal.bindBatterPopUp(
        document.getElementById('batter-personal'));

    addTool("./template/visualize-personal.html",
        visualizePersonal);
});

addVisualizeLeagueBtn.addEventListener('click', () => {
    addTool("./template/visualize-league.html",
        new VisualizerLeague());
});

addVisualizeRunValueBtn.addEventListener('click', () => {
    addTool("./template/visualize-run-value.html",
        new VisualizerRunValue());
});

addVisualize9REBtn.addEventListener('click', () => {
    addTool("./template/visualize-9RE.html",
        new Visualizer9RE());
});

addVisualizeRE24Btn.addEventListener('click', () => {
    addTool("./template/visualize-RE24.html",
        new VisualizerRE24());
});

let targetRet;
let targetSaber;

function apply(visualizer) {

    if (!targetRet) return;

    visualizer.setREValue(targetRet,
        targetSaber.weights, targetSaber.lgWobaRaw,
        targetSaber.wOBAScale, targetSaber.runPerPa);

}

export function visualize(ret, leagueBatter) {
    targetRet = ret;
    targetSaber = {}
    targetSaber.weights = Calc.calculateWeightedRunValue(
        leagueBatter, ret['runValue']);
    targetSaber.lgWobaRaw = Calc.calculateCustomWOBA(
        targetSaber.weights, leagueBatter);
    targetSaber.wOBAScale = 0.33 / targetSaber.lgWobaRaw;
    targetSaber.runPerPa = Calc.calculateLeagueRunPerPA(
        ret.RE_data[0][0], leagueBatter);

    for (let i = 0; i < visualizers.length; i++) {
        apply(visualizers[i]);
    }

}

addToolRaw("./template/visualize-9RE.html",
    new Visualizer9RE()).then(() => {

        addToolRaw("./template/visualize-RE24.html",
            new VisualizerRE24()).then(() => {
                addToolRaw("./template/visualize-league.html",
                    new VisualizerLeague()).then(() => {
                        const defaultVisualizePersonal
                            = new VisualizerPersonal();
                        defaultVisualizePersonal.bindBatterPopUp(
                            document.getElementById('batter-personal'));

                        addToolRaw("./template/visualize-personal.html",
                            defaultVisualizePersonal).then(() => {

                                addToolRaw("./template/visualize-run-value.html",
                                    new VisualizerRunValue());
                            });
                    });
            });
    });