export class VisualizerRE24 {

    constructor() {

    }

    bindElement(element) {
        this.element = element;
    }

    setREValue(ret, weights, lgWobaRaw, wOBAScale, runPerPa) {
        
        if (!this.element) return;
        
        this.element.querySelector('.result-re24').innerHTML =
            this.visualizeRE24(ret.RE_data);

    }

    visualizeRE24(RE) {
    if (!RE) {
        // 오류 메시지는 solve_absorbing_chain_equation에서 이미 처리됨
        return "";
    }

    const runnserStates = [
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
        const re_0_out = RE[j][0].toFixed(3);
        const re_1_out = RE[j + 8][0].toFixed(3);
        const re_2_out = RE[j + 16][0].toFixed(3);

        html += `
            <tr>
                <td class="runner-state">${runnserStates[j]}</td>
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