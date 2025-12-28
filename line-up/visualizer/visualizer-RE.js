export class VisualizerRE {

    constructor() {

    }

    bindElement(element) {
        this.element = element;
        this.startNumSelector = element.querySelector(".start-num");

        this.startNumSelector.addEventListener('change', ()=> {
            this.element.querySelector('.result-re').innerHTML =
                this.visualizeRE(this.ret);
        });

    }

    setREValue(ret) {

        if (!this.element) return;
        
        this.ret = ret;
        this.element.querySelector('.result-re').innerHTML =
            this.visualizeRE(ret);

    }

    visualizeRE(ret) {

        const idx = parseInt(this.startNumSelector.value);

        if (!ret['re'][idx]) {
            return "";
        }

        const runner_states = [
            "주자 없음", "1루", "2루", "3루",
            "1, 2루", "1, 3루", "2, 3루", "만루"
        ];

        let html = `
            <table class="re-table">
                <thead>
                    <tr>
                        <th>주자 상황</th>
                        <th>0 아웃</th>
                        <th>1 아웃</th>
                        <th>2 아웃</th>
                    </tr>
                </thead>
                <tbody>
    `;

        for (let j = 0; j < 8; j++) {
            const re_0_out = ret['re'][idx][j].toFixed(3);
            const re_1_out = ret['re'][idx][j + 8].toFixed(3);
            const re_2_out = ret['re'][idx][j + 16].toFixed(3);

            html += `
            <tr>
                <td class="runner-state">${runner_states[j]}</td>
                <td>${re_0_out}</td>
                <td>${re_1_out}</td>
                <td>${re_2_out}</td>
            </tr>
        `;
        }

        html += `
                </tbody>
            </table>
    `;



        return html;
    }

}