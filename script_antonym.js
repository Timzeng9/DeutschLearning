const wordContainer = document.getElementById('word-container');
const wordSpan = document.getElementById('word');
const translationSpan = document.getElementById('translation');
const showAntonymButton = document.getElementById('show-antonym');
const seenCountSpan = document.getElementById('seen-count');
const totalCountSpan = document.getElementById('total-count');
const languageSelect = document.getElementById('language-select');

let currentWord;
let seenCount = 0;
let remainingCount;
let wordList;
let currentLanguage = 'en'; // 默认语言
let wordDict;

function generateWordDict(data) {
    const dict = {};
    const lines = data.split('\n');
    lines.forEach(line => {
        const parts = line.split('|');
        if (parts.length === 4) {
            const word = parts[0];
            const antonym = parts[1];
            const wordTranslation = parts[2];
            const antonymTranslation = parts[3];
            dict[word] = { antonym, wordTranslation, antonymTranslation };
        }
    });
    return dict;
}

// 洗牌算法
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showWord() {
    if (remainingCount > 0) {
        currentWord = wordList[seenCount];
        wordSpan.textContent = currentWord;
        translationSpan.textContent = `(${wordDict[currentWord].wordTranslation})`;
        showAntonymButton.textContent = '🔍';
        showAntonymButton.onclick = showAntonym;
        seenCount++;
        remainingCount--;
        updateProgress();
    } else {
        wordSpan.textContent = '🎉🎉⭐⭐🏆🏆🏆🏆🏆⭐⭐🎉🎉';
        translationSpan.textContent = '';
        showAntonymButton.textContent = '↺';
        showAntonymButton.onclick = reset;
    }
}

function showAntonym() {
    const antonym = wordDict[currentWord].antonym;
    wordSpan.textContent = `${currentWord} (${wordDict[currentWord].wordTranslation}) - ${antonym} (${wordDict[currentWord].antonymTranslation})`;
    translationSpan.textContent = '';
    showAntonymButton.textContent = '➔';
    showAntonymButton.onclick = showWord;
}

function updateProgress() {
    seenCountSpan.textContent = seenCount;
    // totalCountSpan.textContent = remainingCount;
}

function reset() {
    seenCount = 0;
    remainingCount = wordList.length;
    shuffle(wordList);
    showWord();
}

async function fetchWords(language) {
    try {
        const response = await fetch(`words_${language}.txt`); // 根据选择的语言加载不同的文件
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return generateWordDict(data);
    } catch (error) {
        console.error("Error fetching words:", error);
        return null;
    }
}

// 语言选择事件监听器
languageSelect.addEventListener('change', async function () {
    currentLanguage = this.value; // 更新当前语言
    await initialize(currentLanguage); // 重新初始化
});


// showAntonymButton.addEventListener('click', showAntonym);

// 初始化
async function initialize(language) {
    wordDict = await fetchWords(language); // 根据当前语言获取单词
    if (wordDict) {
        wordList = Object.keys(wordDict);
        shuffle(wordList);
        seenCount = 0;
        totalCountSpan.textContent = wordList.length;
        remainingCount = wordList.length;
        showWord(); // 页面加载时显示第一个词
    }
}

// 页面加载时初始化
initialize(currentLanguage);
