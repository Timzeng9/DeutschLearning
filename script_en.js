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

const wordsData = `gut|schlecht|good|bad
schön|hässlich|beautiful/pretty|ugly
groß|klein|big/large|small
jung|alt|young|old
schnell|langsam|fast/quick|slow
dick|dünn|fat/thick|thin
hoch|niedrig|high/tall|low/short
weit|nah|far|near
hell|dunkel|bright/light|dark
warm|kalt|warm|cold
süß|sauer|sweet|sour
stark|schwach|strong|weak
früh|spät|early|late
teuer|billig|expensive|cheap
viel|wenig|much/many|little/few
hart|weich|hard|soft
sauber|schmutzig|clean|dirty
glücklich|traurig|happy/lucky|sad
interessant|langweilig|interesting|boring
einfach|schwierig|easy/simple|difficult/hard
wichtig|unwichtig|important|unimportant
wahr|falsch|true|false
richtig|falsch|correct/right|wrong
bekannt|unbekannt|known/familiar|unknown/unfamiliar
freundlich|unfreundlich|friendly|unfriendly
fleißig|faul|hardworking/diligent|lazy
geduldig|ungeduldig|patient|impatient
ehrlich|unehrlich|honest|dishonest
höflich|unhöflich|polite|impolite
lieb|böse|dear/nice/kind|mean/angry
schlau|dumm|smart/clever|stupid/dumb
mutig|feige|brave/courageous|cowardly
gesund|krank|healthy|sick/ill
stumm|laut|silent/mute|loud
voll|leer|full|empty
dunkel|hell|dark|bright/light
arm|reich|poor|rich/wealthy
besser|schlechter|better|worse
mehr|weniger|more|less
genug|zu wenig|enough|too little
oft|selten|often|rarely/seldom
immer|nie|always|never
froh|traurig|happy/joyful|sad
müde|fit|tired|fit
schüchtern|selbstbewusst|shy|confident
nervös|ruhig|nervous|calm/quiet
optimistisch|pessimistisch|optimistic|pessimistic
realistisch|unrealistisch|realistic|unrealistic
logisch|unlogisch|logical|illogical
aktiv|passiv|active|passive
kreativ|unkreativ|creative|uncreative
produktiv|unproduktiv|productive|unproductive
positiv|negativ|positive|negative
modern|altmodisch|modern|old-fashioned
traditionell|unkonventionell|traditional|unconventional
flexibel|unflexibel|flexible|inflexible
dynamisch|statisch|dynamic|static
komplex|einfach|complex|simple
global|lokal|global|local
öffentlich|privat|public|private
kostenlos|kostenpflichtig|free|paid
sozial|asozial|social|antisocial
ökologisch|unökologisch|ecological|unecological
nachhaltig|nicht nachhaltig|sustainable|unsustainable
frisch|alt|fresh|old
saftig|trocken|juicy|dry
süß|bitter|sweet|bitter
weich|hart|soft|hard
glatt|rau|smooth|rough
scharf|stumpf|sharp|blunt
hell|dunkel|light|dark
eng|weit|narrow|wide
dicht|locker|dense|loose
dumm|schlau|stupid/dumb|smart/clever
faul|fleißig|lazy|hardworking/diligent
feige|mutig|cowardly|brave/courageous
fein|grob|fine|coarse
fest|locker|firm/tight|loose
fett|mager|fat|lean
frech|artig|cheeky/impudent|well-behaved/good
fromm|gottlos|pious/devout|impious/godless
fröhlich|traurig|joyful/cheerful|sad
geduldig|ungeduldig|patient|impatient
gefährlich|sicher|dangerous|safe
geizig|großzügig|stingy/miserly|generous
geliebt|gehasst|loved|hated
gerecht|ungerecht|just/fair|unjust/unfair
gespannt|entspannt|excited/tense|relaxed
gesund|krank|healthy|sick/ill
getreu|untreu|loyal/faithful|unloyal/unfaithful
gewandt|ungeschickt|skilled/adept|unskilled/clumsy
glatt|holprig|smooth|bumpy
glücklich|unglücklich|happy/lucky|unhappy/unlucky
golden|silbern|golden|silver
großzügig|kleinlich|generous|petty/mean
gültig|ungültig|valid|invalid
gut|böse|good|evil
hart|weich|hard|soft
heftig|sanft|violent/fierce|gentle/soft
heiß|kalt|hot|cold
hell|dunkel|light|dark
hoch|tief|high/tall|low/deep
höflich|unhöflich|polite|impolite
hungrig|satt|hungry|full
interessiert|uninteressiert|interested|uninterested
jung|alt|young|old
kaputt|ganz|broken|whole
klar|unklar|clear|unclear
klug|dumm|clever/wise|stupid/foolish
komisch|ernst|funny/comical|serious
kurz|lang|short|long
langsam|schnell|slow|fast/quick
laut|leise|loud|quiet
leer|voll|empty|full
leicht|schwer|light|heavy
lieb|böse|dear/nice/kind|mean/angry
locker|fest|loose|tight
lustig|traurig|funny|sad
mager|fett|lean|fat
müde|wach|tired|awake
naiv|erfahren|naive|experienced
nass|trocken|wet|dry
nett|unfreundlich|nice|unfriendly
neugierig|uninteressiert|curious|uninterested
offen|geschlossen|open|closed
ordentlich|unordentlich|tidy/neat|untidy/messy
pünktlich|unpünktlich|punctual|unpunctual
ruhig|laut|quiet/calm|loud
sauber|schmutzig|clean|dirty
sauer|süß|sour|sweet
scharf|mild|spicy/hot|mild
schlau|dumm|smart/clever|stupid/dumb
schlicht|auffällig|simple/plain|showy/flashy
schnell|langsam|fast/quick|slow
schön|hässlich|beautiful/pretty|ugly
schwach|stark|weak|strong
schwarz|weiß|black|white
selten|oft|rarely/seldom|often
sicher|unsicher|safe/sure|unsure/unsafe
sonnig|wolkig|sunny|cloudy
spät|früh|late|early
stolz|demütig|proud|humble
stumm|redselig|silent/mute|talkative
tapfer|feige|brave/courageous|cowardly
teuer|billig|expensive|cheap
tief|hoch|deep|shallow
traurig|glücklich|sad|happy/lucky
treu|untreu|loyal/faithful|unloyal/unfaithful
trocken|nass|dry|wet
trüb|klar|cloudy/murky|clear
überrascht|unbeeindruckt|surprised|unimpressed
unabhängig|abhängig|independent|dependent
unbekannt|bekannt|unknown/unfamiliar|known/familiar
unendlich|endlich|infinite|finite
ungeduldig|geduldig|impatient|patient
unglaublich|glaubhaft|unbelievable|believable
unhöflich|höflich|impolite|polite
uninteressant|interessant|uninteresting|interesting
unlogisch|logisch|illogical|logical
unordentlich|ordentlich|untidy/messy|tidy/neat
unpünktlich|pünktlich|unpunctual|punctual
unrealistisch|realistisch|unrealistic|realistic
unsicher|sicher|unsure/uncertain|sure/certain
unwichtig|wichtig|unimportant|important
unzufrieden|zufrieden|unsatisfied|satisfied`
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
        showAntonymButton.textContent = 'show antonym';
        showAntonymButton.onclick = showAntonym;
        seenCount++;
        remainingCount--;
        updateProgress();
    } else {
        wordSpan.textContent = 'All done!';
        translationSpan.textContent = '';
        showAntonymButton.textContent = 'Reset';
        showAntonymButton.onclick = reset;
    }
}

function showAntonym() {
    const antonym = wordDict[currentWord].antonym;
    wordSpan.textContent = `${currentWord} (${wordDict[currentWord].wordTranslation}) - ${antonym} (${wordDict[currentWord].antonymTranslation})`;
    translationSpan.textContent = '';
    showAntonymButton.textContent = 'show next';
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