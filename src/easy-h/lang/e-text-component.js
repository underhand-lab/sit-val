import { loadFile } from "../load-file.js";
import * as lang from "./e-text.js"

// 사전과 관찰 대상을 정적 자산으로 관리
let dictionary = {};
let observers = new Set(); // 배열보다 중복 제거가 쉬운 Set 권장

class LangSet extends HTMLElement {
    static get observedAttributes() { return ['src', 'key']; }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'key' && newVal) {
            this.key = newVal;
            this.addDictionary();
            return;
        }
        if (attrName === 'src' && newVal) {
            loadFile(newVal).then(text => {
                this.dictionary = JSON.parse(text);
                this.addDictionary();
            }).catch((e) => {
                console.error("언어 파일 로드 실패:", e);
            });
        }
    }

    addDictionary() {
        if (!this.key) return;
        if (!this.dictionary) return;
        lang.addDictionary(this.key, this.dictionary);

    }
}

class Lang extends HTMLElement {
    constructor() {
        super();
        this.content = this;
        this._key = "";
    }

    static get observedAttributes() { return ['tag', 'key']; }

    onChange() {
        if (!this._key) return;
        // 사전 확인 및 값 교체
        const translated = (lang.dictionary && this._key in lang.dictionary)
            ? lang.dictionary[this._key]
            : this.content.innerHTML;

        if (this.content) {
            this.content.innerHTML = translated;
        }
    }

    connectedCallback() {
        lang.addObserver(this); // 관찰자 등록
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) return;

        if (attrName === "key") {
            this._key = newVal;
            this.onChange();
        } else if (attrName === 'tag') {
            this.renderTag(newVal);
        }
    }

    renderTag(tagName) {
        const currentHTML = this.content ? this.content.innerHTML : this.innerHTML;

        if (!tagName) {
            this.content = this;
            this.innerHTML = currentHTML;
        } else {
            const newElement = document.createElement(tagName);
            this.innerHTML = '';
            this.appendChild(newElement);
            this.content = newElement;
            this.content.innerHTML = currentHTML;
        }
        this.onChange();
    }
}

customElements.define('e-text-set', LangSet);
customElements.define('e-text', Lang);