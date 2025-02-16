const wordContainer = document.getElementById('word-container');
const wordSpan = document.getElementById('word');
const translationSpan = document.getElementById('translation');
const showAntonymButton = document.getElementById('show-antonym');
const seenCountSpan = document.getElementById('seen-count');
const remainingCountSpan = document.getElementById('remaining-count');

let currentWord;
let seenCount = 0;
let remainingCount;
let wordList;

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

const wordsData = `gut|schlecht|好|坏
schön|hässlich|漂亮|丑陋
groß|klein|大|小
jung|alt|年轻|老
schnell|langsam|快|慢
dick|dünn|胖|瘦
hoch|niedrig|高|低
weit|nah|远|近
hell|dunkel|亮|暗
warm|kalt|暖|冷
süß|sauer|甜|酸
stark|schwach|强|弱
früh|spät|早|晚
teuer|billig|贵|便宜
viel|wenig|多|少
hart|weich|硬|软
sauber|schmutzig|干净|脏
glücklich|traurig|快乐|悲伤
interessant|langweilig|有趣|无聊
einfach|schwierig|简单|难
wichtig|unwichtig|重要|不重要
wahr|falsch|真|假
richtig|falsch|正确|错误
bekannt|unbekannt|熟悉|陌生
freundlich|unfreundlich|友好|不友好
fleißig|faul|勤奋|懒惰
geduldig|ungeduldig|耐心|不耐烦
ehrlich|unehrlich|诚实|不诚实
höflich|unhöflich|礼貌|不礼貌
lieb|böse|亲爱|讨厌
schlau|dumm|聪明|愚蠢
mutig|feige|勇敢|胆怯
gesund|krank|健康|生病
stumm|laut|沉默|吵闹
voll|leer|满|空
dunkel|hell|暗|亮
arm|reich|穷|富
besser|schlechter|好|差
mehr|weniger|更多|更少
genug|zu wenig|足够|不足
oft|selten|经常|偶尔
immer|nie|总是|从不
froh|traurig|快乐|悲伤
müde|fit|累|精神
schüchtern|selbstbewusst|害羞|自信
nervös|ruhig|紧张|平静
optimistisch|pessimistisch|乐观|悲观
realistisch|unrealistisch|现实|不现实
logisch|unlogisch|逻辑|不合逻辑
aktiv|passiv|积极|消极
kreativ|unkreativ|创造力|缺乏创造力
produktiv|unproduktiv|生产力|缺乏生产力
positiv|negativ|积极|消极
modern|altmodisch|现代|老式
traditionell|unkonventionell|传统|非传统
flexibel|unflexibel|灵活|不灵活
dynamisch|statisch|动态|静态
komplex|einfach|复杂|简单
global|lokal|全球|本地
öffentlich|privat|公开|私密
kostenlos|kostenpflichtig|免费|收费
sozial|asozial|社会|反社会
ökologisch|unökologisch|生态|非生态
nachhaltig|nicht nachhaltig|可持续|不可持续
frisch|alt|新鲜|旧
saftig|trocken|多汁|干燥
süß|bitter|甜|苦
weich|hart|软|硬
glatt|rau|光滑|粗糙
scharf|stumpf|锋利|钝
hell|dunkel|亮|暗
eng|weit|窄|宽
dicht|locker|密集|稀疏
dumm|schlau|蠢|聪明
faul|fleißig|懒惰|勤奋
feige|mutig|胆怯|勇敢
fein|grob|细腻|粗糙
fest|locker|坚固|松动
fett|mager|肥|瘦
frech|artig|厚颜无耻|乖巧
fromm|gottlos|虔诚|不虔诚
fröhlich|traurig|快乐|悲伤
geduldig|ungeduldig|耐心|不耐烦
gefährlich|sicher|危险|安全
geizig|großzügig|吝啬|慷慨
geliebt|gehasst|爱|恨
gerecht|ungerecht|公正|不公正
gespannt|entspannt|兴奋|放松
gesund|krank|健康|生病
getreu|untreu|忠诚|不忠诚
gewandt|ungeschickt|熟练|笨拙
glatt|holprig|光滑|坎坷
glücklich|unglücklich|幸福|不幸
golden|silbern|金|银
großzügig|kleinlich|慷慨|吝啬
gültig|ungültig|有效|无效
gut|böse|好|坏
hart|weich|硬|软
heftig|sanft|剧烈|温柔
heiß|kalt|热|冷
hell|dunkel|亮|暗
hoch|tief|高|低
höflich|unhöflich|礼貌|不礼貌
hungrig|satt|饥饿|饱
interessiert|uninteressiert|感兴趣|不感兴趣
jung|alt|年轻|老
kaputt|ganz|坏|好
klar|unklar|清晰|模糊
klug|dumm|聪明|愚蠢
komisch|ernst|滑稽|严肃
kurz|lang|短|长
langsam|schnell|慢|快
laut|leise|响亮|安静
leer|voll|空|满
leicht|schwer|轻|重
lieb|böse|亲爱|讨厌
locker|fest|松动|紧固
lustig|traurig|有趣|悲伤
mager|fett|瘦|肥
müde|wach|累|清醒
naiv|erfahren|天真|老练
nass|trocken|湿|干
nett|unfreundlich|好|不好
neugierig|uninteressiert|好奇|不感兴趣
offen|geschlossen|开放|关闭
ordentlich|unordentlich|整洁|凌乱
pünktlich|unpünktlich|准时|迟到
ruhig|laut|安静|吵闹
sauber|schmutzig|干净|脏
sauer|süß|酸|甜
scharf|mild|辣|温和
schlau|dumm|聪明|愚蠢
schlicht|auffällig|朴素|花哨
schnell|langsam|快|慢
schön|hässlich|漂亮|丑陋
schwach|stark|弱|强
schwarz|weiß|黑|白
selten|oft|罕见|经常
sicher|unsicher|安全|不安全
sonnig|wolkig|晴朗|多云
spät|früh|晚|早
stolz|demütig|骄傲|谦逊
stumm|redselig|沉默|健谈
tapfer|feige|勇敢|胆怯
teuer|billig|贵|便宜
tief|hoch|深|浅
traurig|glücklich|悲伤|快乐
treu|untreu|忠诚|不忠
trocken|nass|干燥|潮湿
trüb|klar|阴沉|晴朗
überrascht|unbeeindruckt|惊讶|不感兴趣
unabhängig|abhängig|独立|依赖
unbekannt|bekannt|未知|已知
unendlich|endlich|无限|有限
ungeduldig|geduldig|不耐烦|耐心
unglaublich|glaubhaft|难以置信|可信
unhöflich|höflich|不礼貌|礼貌
uninteressant|interessant|无趣|有趣
unlogisch|logisch|不合逻辑|逻辑
unordentlich|ordentlich|不整洁|整洁
unpünktlich|pünktlich|不准时|准时
unrealistisch|realistisch|不现实|现实
unsicher|sicher|不确定|确定
unwichtig|wichtig|不重要|重要
unzufrieden|zufrieden|不满意|满意
viel|wenig|多|少
warm|kalt|暖|冷
weich|hart|软|硬
wertvoll|wertlos|有价值|无价值
wichtig|unwichtig|重要|不重要
wahr|falsch|真|假
wunderschön|hässlich|极好|丑陋
zufrieden|unzufrieden|满意|不满意
blind|sehend|瞎|视
blöd|gescheit|愚蠢|聪明
breit|schmal|宽|窄
bunt|einfarbig|五彩缤纷|单色
deutlich|undeutlich|清楚|模糊`
const wordDict = generateWordDict(wordsData);
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
        showAntonymButton.textContent = '显示反义词';
        showAntonymButton.onclick = showAntonym;
        seenCount++;
        remainingCount--;
        updateProgress();
    } else {
        wordSpan.textContent = '已看完!';
        translationSpan.textContent = '';
        showAntonymButton.textContent = '重新开始';
        showAntonymButton.onclick = reset;
    }
}

function showAntonym() {
    const antonym = wordDict[currentWord].antonym;
    wordSpan.textContent = `${currentWord} (${wordDict[currentWord].wordTranslation}) - ${antonym} (${wordDict[currentWord].antonymTranslation})`;
    translationSpan.textContent = '';
    showAntonymButton.textContent = '显示下一个';
    showAntonymButton.onclick = showWord;
}

function updateProgress() {
    seenCountSpan.textContent = seenCount;
    remainingCountSpan.textContent = remainingCount;
}

function reset() {
    seenCount = 0;
    remainingCount = wordList.length;
    shuffle(wordList);
    showWord();
}

// 初始化
wordList = Object.keys(wordDict);
shuffle(wordList);
remainingCount = wordList.length;
showWord(); // 页面加载时显示第一个词