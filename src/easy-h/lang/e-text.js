const dictdict = {};

// 사전과 관찰 대상을 정적 자산으로 관리
export let dictionary = {};
let langKey = 'en';
const defaultKey = 'en';

let observers = new Set(); // 배열보다 중복 제거가 쉬운 Set 권장

function notify() {
    observers.forEach(obs => obs.onChange());
}

export function addDictionary(key, dict) {
    const keys = key.split(" ");

    for (let i = 0; i < keys.length; i++) {
        dictdict[keys[i]] = dict;
    }
    
    if (langKey in dictdict) {
        dictionary = dictdict[langKey];
    }
    else {
        dictionary = dictdict[defaultKey];
    }
    notify();
}

export function setKey(key) {
    langKey = key;
    if (langKey in dictdict) {
        dictionary = dictdict[langKey];
    }
    else {
        dictionary = dictdict[defaultKey];
    }
    notify();
}

export function addObserver(observer) {
    observers.add(observer);
    observer.onChange();     // 최초 실행 (이미 사전이 로드되어 있을 수 있음)
}

export function removeObserver() {
    observers.delete(this); // 메모리 누수 방지: 요소 삭제 시 관찰 제거

}

const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');

if (urlLang)
    setKey(urlLang);
else {
    const lang = navigator.language;
    setKey(lang);
}
