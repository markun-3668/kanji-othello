// 難問オセロ - ゲームロジック
// Author: 大橋眞士

const board = document.getElementById('board');
const status = document.getElementById('status');
const score = document.getElementById('score');
const kanjiReading = document.getElementById('kanji-reading');
const submitReading = document.getElementById('submit-reading');
let currentPlayer = 'black';
let gameBoard = [];
let selectedCell = null;
let currentDifficulty = 'medium';
const BOARD_SIZE = 6;

const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
];

// 漢字データセット
let EasyKanjiList1 = [
    { kanji: '綺麗', reading: 'きれい' },
    { kanji: '漆', reading: 'うるし' },
    { kanji: '噛む', reading: 'かむ' },
    { kanji: '縫う', reading: 'ぬう' },
    { kanji: '蹴る', reading: 'ける' },
    { kanji: '壁', reading: 'かべ' },
    { kanji: '穫る', reading: 'とる' },
    { kanji: '脇', reading: 'わき' },
    { kanji: '鼠', reading: 'ねずみ' },
    { kanji: '嘘', reading: 'うそ' },
    { kanji: '喉', reading: 'のど' },
    { kanji: '葱', reading: 'ねぎ' },
    { kanji: '鏡', reading: 'かがみ' },
    { kanji: '苺', reading: 'いちご' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '頬', reading: 'ほお' },
    { kanji: '椅子', reading: 'いす' },
    { kanji: '痒い', reading: 'かゆい' },
    { kanji: '躾', reading: 'しつけ' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '苺', reading: 'いちご' },
    { kanji: '蜂', reading: 'はち' },
    { kanji: '鮭', reading: 'さけ' },
    { kanji: '蛙', reading: 'かえる' },
    { kanji: '鳩', reading: 'はと' },
    { kanji: '橙', reading: 'だいだい' },
    { kanji: '鷹', reading: 'たか' },
    { kanji: '蝶', reading: 'ちょう' },
    { kanji: '蟹', reading: 'かに' },
    { kanji: '鰐', reading: 'わに' },
    { kanji: '泳ぐ', reading: 'およぐ' },
    { kanji: '急ぐ', reading: 'いそぐ' },
    { kanji: '通る', reading: 'とおる' },
    { kanji: '桃', reading: 'もも' }
];

let EasyKanjiList2 = [
    { kanji: "星", reading: "ほし" },
    { kanji: "空", reading: "そら" },
    { kanji: "海", reading: "うみ" },
    { kanji: "花", reading: "はな" },
    { kanji: "山", reading: "やま" },
    { kanji: "川", reading: "かわ" },
    { kanji: "木", reading: "き" },
    { kanji: "石", reading: "いし" },
    { kanji: "火", reading: "ひ" },
    { kanji: "水", reading: "みず" },
    { kanji: "月", reading: "つき" },
    { kanji: "日", reading: "ひ" },
    { kanji: "金", reading: "かね" },
    { kanji: "土", reading: "つち" },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: "雨", reading: "あめ" },
    { kanji: "風", reading: "かぜ" },
    { kanji: "雪", reading: "ゆき" },
    { kanji: "雷", reading: "かみなり" },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: "雲", reading: "くも" },
    { kanji: "森", reading: "もり" },
    { kanji: "犬", reading: "いぬ" },
    { kanji: "猫", reading: "ねこ" },
    { kanji: "鳥", reading: "とり" },
    { kanji: "魚", reading: "さかな" },
    { kanji: "虫", reading: "むし" },
    { kanji: "牛", reading: "うし" },
    { kanji: "羊", reading: "ひつじ" },
    { kanji: "猿", reading: "さる" },
    { kanji: "亀", reading: "かめ" },
    { kanji: "象", reading: "ぞう" },
    { kanji: "狼", reading: "おおかみ" },
    { kanji: "鹿", reading: "しか" }
];

let MediumKanjiList1 = [
    { kanji: '憂鬱', reading: 'ゆううつ' },
    { kanji: '遡及', reading: 'そきゅう' },
    { kanji: '凝固', reading: 'ぎょうこ' },
    { kanji: '詭弁', reading: 'きべん' },
    { kanji: '煩悩', reading: 'ぼんのう' },
    { kanji: '躊躇', reading: 'ちゅうちょ' },
    { kanji: '謙虚', reading: 'けんきょ' },
    { kanji: '憤慨', reading: 'ふんがい' },
    { kanji: '暗喩', reading: 'あんゆ' },
    { kanji: '斬新', reading: 'ざんしん' },
    { kanji: '跪く', reading: 'ひざまずく' },
    { kanji: '傲慢', reading: 'ごうまん' },
    { kanji: '懇願', reading: 'こんがん' },
    { kanji: '閑散', reading: 'かんさん' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '慄然', reading: 'りつぜん' },
    { kanji: '払拭', reading: 'ふっしょく' },
    { kanji: '閃く', reading: 'ひらめく' },
    { kanji: '憔悴', reading: 'しょうすい' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '萎縮', reading: 'いしゅく' },
    { kanji: '楼閣', reading: 'ろうかく' },
    { kanji: '拘束', reading: 'こうそく' },
    { kanji: '僅少', reading: 'きんしょう' },
    { kanji: '顕著', reading: 'けんちょ' },
    { kanji: '頓挫', reading: 'とんざ' },
    { kanji: '虚栄', reading: 'きょえい' },
    { kanji: '惰性', reading: 'だせい' },
    { kanji: '窮屈', reading: 'きゅうくつ' },
    { kanji: '薄弱', reading: 'はくじゃく' },
    { kanji: '饒舌', reading: 'じょうぜつ' },
    { kanji: '掻く', reading: 'かく' },
    { kanji: '粛々', reading: 'しゅくしゅく' },
    { kanji: '囁く', reading: 'ささやく' }
];

let HardKanjiList1 = [
    { kanji: '浚う', reading: 'さらう' },
    { kanji: '嘖', reading: 'さく' },
    { kanji: '齟齬', reading: 'そご' },
    { kanji: '韜晦', reading: 'とうかい' },
    { kanji: '鬮', reading: 'くじ' },
    { kanji: '屠腑', reading: 'とふ' },
    { kanji: '殷賑', reading: 'いんしん' },
    { kanji: '檳榔', reading: 'びんろう' },
    { kanji: '鸚鵡', reading: 'おうむ' },
    { kanji: '驢馬', reading: 'ろば' },
    { kanji: '蹇', reading: 'けん' },
    { kanji: '隘路', reading: 'あいろ' },
    { kanji: '倨傲', reading: 'きょごう' },
    { kanji: '髀', reading: 'もも' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '躙', reading: 'にじる' },
    { kanji: '憑', reading: 'つく' },
    { kanji: '罌粟', reading: 'けし' },
    { kanji: '蠣', reading: 'かき' },
    { kanji: '', reading: '' },
    { kanji: '', reading: '' },
    { kanji: '濺', reading: 'そそぐ' },
    { kanji: '筌', reading: 'うえ' },
    { kanji: '窶', reading: 'やつれる' },
    { kanji: '斃', reading: 'たおれる' },
    { kanji: '孕', reading: 'はらむ' },
    { kanji: '禊', reading: 'みそぎ' },
    { kanji: '狃', reading: 'なれる' },
    { kanji: '樟', reading: 'くすのき' },
    { kanji: '檜', reading: 'ひのき' },
    { kanji: '蒙', reading: 'おおう' },
    { kanji: '轗軻', reading: 'かんか' },
    { kanji: '髑髏', reading: 'どくろ' },
    { kanji: '皹', reading: 'あかぎれ' },
    { kanji: '膃肭臍', reading: 'おっとせい' }
];

let kanjiList = MediumKanjiList1;

// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 全ボタンのアクティブ状態をリセット
            difficultyBtns.forEach(b => b.classList.remove('active'));
            // クリックされたボタンをアクティブに
            e.target.classList.add('active');
            
            const difficulty = e.target.getAttribute('data-difficulty');
            setDifficulty(difficulty);
        });
    });

    // 初期難易度を設定（普通を選択状態に）
    document.querySelector('[data-difficulty="medium"]').classList.add('active');
    setDifficulty('medium');
});

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    const random = Math.random();
    
    switch (difficulty) {
        case 'easy':
            kanjiList = random < 0.5 ? EasyKanjiList1 : EasyKanjiList2;
            break;
        case 'medium':
            kanjiList = MediumKanjiList1;
            break;
        case 'hard':
            kanjiList = HardKanjiList1;
            break;
        default:
            kanjiList = MediumKanjiList1;
    }
    initializeGame();
}

function initializeGame() {
    board.innerHTML = '';
    gameBoard = [];
    currentPlayer = 'black';
    let kanjiIndex = 0;
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            gameBoard[i][j] = '';
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);

            const kanji = kanjiList[kanjiIndex % kanjiList.length];
            cell.textContent = kanji.kanji;
            cell.dataset.reading = kanji.reading;
            board.appendChild(cell);

            kanjiIndex++;
        }
    }
    
    setInitialDiscs();
    updateStatus();
    highlightValidMoves();
    
    // 入力エリアを表示
    document.getElementById('input-area').style.display = 'block';
}

function setInitialDiscs() {
    setDisc(2, 2, 'white');
    setDisc(2, 3, 'black');
    setDisc(3, 2, 'black');
    setDisc(3, 3, 'white');
}

function setDisc(row, col, color) {
    gameBoard[row][col] = color;
    const cell = board.children[row * BOARD_SIZE + col];
    let disc = cell.querySelector('.disc');
    if (!disc) {
        disc = document.createElement('div');
        disc.className = 'disc';
        cell.appendChild(disc);
    }
    disc.className = `disc ${color}`;
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (isValidMove(row, col)) {
        selectedCell = { row, col };
        kanjiReading.focus();
        showPopup('漢字の読みを入力してください');
    }
}

function checkReading() {
    if (selectedCell) {
        const cell = board.children[selectedCell.row * BOARD_SIZE + selectedCell.col];
        const userInput = kanjiReading.value.toLowerCase().trim();
        const correctReading = cell.dataset.reading.toLowerCase();
        
        if (userInput === correctReading) {
            showPopup('正解！', 'success');
            makeMove(selectedCell.row, selectedCell.col);
            switchPlayer();
            updateStatus();
            highlightValidMoves();

            if (!hasValidMove()) {
                switchPlayer();
                if (!hasValidMove()) {
                    endGame();
                } else {
                    updateStatus();
                    highlightValidMoves();
                }
            }
        } else {
            showPopup(`不正解！正解は「${cell.dataset.reading}」です`, 'error');
        }
        kanjiReading.value = '';
        selectedCell = null;
    }
}

// Enterキーでの回答機能
if (kanjiReading) {
    kanjiReading.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkReading();
        }
    });
}

function isValidMove(row, col) {
    if (gameBoard[row][col] !== '') return false;

    for (const [dx, dy] of directions) {
        if (wouldFlip(row, col, dx, dy)) {
            return true;
        }
    }
    return false;
}

function wouldFlip(row, col, dx, dy) {
    let x = row + dx;
    let y = col + dy;

    if (!isOnBoard(x, y) || gameBoard[x][y] !== getOpponentColor()) {
        return false;
    }

    while (isOnBoard(x, y) && gameBoard[x][y] === getOpponentColor()) {
        x += dx;
        y += dy;
    }

    return isOnBoard(x, y) && gameBoard[x][y] === currentPlayer;
}

function isOnBoard(row, col) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function getOpponentColor() {
    return currentPlayer === 'black' ? 'white' : 'black';
}

function makeMove(row, col) {
    setDisc(row, col, currentPlayer);

    for (const [dx, dy] of directions) {
        if (wouldFlip(row, col, dx, dy)) {
            flipDirection(row, col, dx, dy);
        }
    }
}

function flipDirection(row, col, dx, dy) {
    let x = row + dx;
    let y = col + dy;

    while (gameBoard[x][y] === getOpponentColor()) {
        setDisc(x, y, currentPlayer);
        x += dx;
        y += dy;
    }
}

function switchPlayer() {
    currentPlayer = getOpponentColor();
}

function hasValidMove() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (isValidMove(i, j)) {
                return true;
            }
        }
    }
    return false;
}

function updateStatus() {
    const blackCount = countDiscs('black');
    const whiteCount = countDiscs('white');
    status.textContent = `${currentPlayer === 'black' ? '黒' : '白'}の番です`;
    score.textContent = `黒: ${blackCount} 白: ${whiteCount}`;
}

function countDiscs(color) {
    return gameBoard.flat().filter(cell => cell === color).length;
}

function endGame() {
    const blackCount = countDiscs('black');
    const whiteCount = countDiscs('white');
    let result;

    if (blackCount > whiteCount) {
        result = '黒の勝ち！';
    } else if (whiteCount > blackCount) {
        result = '白の勝ち！';
    } else {
        result = '引き分け！';
    }

    status.textContent = `ゲーム終了 - ${result}`;
    showPopup(`${result} 黒:${blackCount} 白:${whiteCount}`, 'game-end');

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    
    document.getElementById('input-area').style.display = 'none';
}

function highlightValidMoves() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('valid-move'));

    if (currentDifficulty === 'easy') {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (isValidMove(i, j)) {
                    const cell = board.children[i * BOARD_SIZE + j];
                    cell.classList.add('valid-move');
                }
            }
        }
    }
}

function showPopup(message, type = 'info') {
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, type === 'game-end' ? 3000 : 1500);
}

// 回答ボタンのイベントリスナー
if (submitReading) {
    submitReading.addEventListener('click', checkReading);
}
