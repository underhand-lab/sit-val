export class VisualizerRunValue {

    constructor() {

    }

    bindElement(element) {
        this.element = element;
    }

    setREValue(ret, weights, lgWobaRaw, wOBAScale, runPerPa) {
        
        if (!this.element) return;
        this.element.querySelector('.run-value').innerHTML =
            this.visualizeRunValue(ret['runValue']);

    }

    visualizeRunValue(dataList) {
        if (!dataList) {
            return "";
        }

        // 1. 객체를 배열로 변환
        const sortedItems = Object.keys(dataList).map(key => ({
            label: key,
            ...dataList[key]
        }));

        // 2. value 기준 내림차순 정렬 (b.value - a.value)
        sortedItems.sort((a, b) => b.value - a.value);

        let html = `
                <table class="re-table">
                    <thead>
                        <tr>
                            <th>타구</th>
                            <th>가치</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

        // 3. 정렬된 배열(sortedItems)로 HTML 생성
        for (const item of sortedItems) {
            html += `
                        <tr>
                            <td class="runner-state">${item.name}</td>
                            <td>${item.value.toFixed(3)}</td>
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