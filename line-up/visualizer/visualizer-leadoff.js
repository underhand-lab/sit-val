export class VisualizerLeadoff {

    constructor() {

    }

    bindElement(element) {
        this.element = element;
    }

    setREValue(ret) {

        if (!this.element) return;

        this.element.querySelector('.result-leadoff').innerHTML =
            this.visualizeLeadoff(ret);

    }

    visualizeLeadoff(ret) {

        // --- 리드오프 등장 확률 섹션 추가 ---
        let html = `
            <table class="leadoff-table">
                <thead>
                    <tr>
                        <th>타순</th>
                        <th>이닝 시작 확률</th>
                        <th>9이닝당 시작 횟수</th>
                    </tr>
                </thead>
                <tbody>
    `;

        for (let i = 0; i < 9; i++) {
            // 현재 선택된 타자(idx)의 행을 강조 표시

            html += `
            <tr>
                <td>${i + 1}번 타자</td>
                <td>
                    ${((ret['leadoff_vector'][i] / 9) * 100).toFixed(2)}%
                </td>
                <td>${ret['leadoff_vector'][i].toFixed(3)}회</td>
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