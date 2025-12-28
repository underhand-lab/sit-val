import { VisualizerLeadoff } from "./visualizer/visualizer-leadoff.js";
import { Visualizer9RE } from "./visualizer/visualizer-9RE.js";
import { VisualizerRE } from "./visualizer/visualizer-RE.js";

import { BoxList } from "../src/ui/box-list.js"

let targetRet;
let visualizers = [];

function apply(visualizer) {

    if (!targetRet) return;

    visualizer.setREValue(targetRet);

}

const boxList = new BoxList(document.getElementById('boxes'));
const toolSelect = document.querySelector('#tool-select');


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

const addVisualizeLeadoff =
    document.querySelector('#add-visualizer-leadoff');
const addVisualize9RE =
    document.querySelector('#add-visualizer-9RE');
const addVisualizeRE =
    document.querySelector('#add-visualizer-RE');

addVisualizeLeadoff.addEventListener('click', () => {
    addTool("./template/visualizer-leadoff.html",
        new VisualizerLeadoff());
});

addVisualize9RE.addEventListener('click', () => {
    addTool("./template/visualizer-9RE.html",
        new Visualizer9RE());
});

addVisualizeRE.addEventListener('click', () => {
    addTool("./template/visualizer-RE.html",
        new VisualizerRE());
});

export function visualize(ret) {

    targetRet = ret;

    for (let i = 0; i < visualizers.length; i++) {
        apply(visualizers[i]);
    }
}

addToolRaw("./template/visualizer-9RE.html",
    new Visualizer9RE()).then(() => {

        addToolRaw("./template/visualizer-RE.html",
            new VisualizerRE()).then(() => {

                addToolRaw("./template/visualizer-leadoff.html",
                    new VisualizerLeadoff());
                    
            });
    });