// ==========================================================================
// Site Navigation Scripts
// ==========================================================================
const nav = document.getElementById('siteNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  });
}

// ==========================================================================
// Wordle Game Scripts
// ==========================================================================
const WORDS = [
  "ABOUT","ABOVE","ABUSE","ACTOR","ACUTE","ADMIT","ADOPT","ADULT","AFTER","AGAIN",
  "AGENT","AGREE","AHEAD","ALARM","ALBUM","ALERT","ALIEN","ALIGN","ALIKE","ALIVE",
  "ALLOW","ALONE","ALONG","ALTER","AMONG","ANGER","ANGLE","ANGRY","APART","APPLE",
  "APPLY","ARENA","ARGUE","ARISE","ARRAY","ASIDE","ASSET","AVOID","AWAKE","AWARD",
  "AWARE","BADLY","BAKER","BASIC","BEACH","BEGAN","BEGIN","BEGUN","BEING","BELOW",
  "BENCH","BIRTH","BLACK","BLADE","BLAME","BLANK","BLAST","BLEND","BLESS","BLIND",
  "BLOCK","BLOOD","BOARD","BOAST","BOOST","BOOTH","BOUND","BRAIN","BRAND",
  "BRASS","BRAVE","BREAD","BREAK","BREED","BRICK","BRIDE","BRIEF","BRING","BROAD",
  "BROKE","BROWN","BRUSH","BUILD","BUILT","BUYER","CABLE","CARRY","CATCH",
  "CAUSE","CHAIN","CHAIR","CHAOS","CHARM","CHART","CHASE","CHEAP","CHECK","CHEST",
  "CHIEF","CHILD","CHINA","CHOSE","CIVIL","CLAIM","CLASS","CLEAN","CLEAR","CLICK",
  "CLIMB","CLOCK","CLOSE","CLOUD","COACH","COAST","COULD","COUNT","COURT","COVER",
  "CRAFT","CRASH","CRAZY","CREAM","CRIME","CROSS","CROWD","CROWN","CRUDE","CURVE",
  "CYCLE","DAILY","DANCE","DEALT","DEATH","DEBUT","DELAY","DEPTH","DOUBT","DOZEN",
  "DRAFT","DRAMA","DRANK","DRAWN","DREAM","DRESS","DRIED","DRIVE","DROVE","EAGER",
  "EARLY","EARTH","EIGHT","ELITE","EMPTY","ENEMY","ENJOY","ENTER","ENTRY","EQUAL",
  "ERROR","EVENT","EVERY","EXACT","EXIST","EXTRA","FAITH","FALSE","FAULT","FIBER",
  "FIELD","FIFTH","FIFTY","FIGHT","FINAL","FIRST","FIXED","FLASH","FLEET","FLOOR",
  "FLUID","FOCUS","FORCE","FORTH","FORTY","FORUM","FOUND","FRAME","FRANK","FRAUD",
  "FRESH","FRONT","FROST","FRUIT","FULLY","FUNNY","GIANT","GIVEN","GLASS","GLOBE",
  "GOING","GRACE","GRADE","GRAND","GRANT","GRASS","GREAT","GREEN","GROSS","GROUP",
  "GROWN","GUARD","GUESS","GUEST","GUIDE","HAPPY","HARSH","HEART","HEAVY","HELLO",
  "HENCE","HORSE","HOTEL","HOUSE","HUMAN","IDEAL","IMAGE","INDEX","INNER","INPUT",
  "ISSUE","JOINT","JUDGE","KNOWN","LABEL","LARGE","LASER","LATER","LAUGH","LAYER",
  "LEARN","LEAST","LEAVE","LEGAL","LEVEL","LIGHT","LIMIT","LOCAL","LOGIC","LOOSE",
  "LOWER","LUCKY","LUNCH","MAGIC","MAJOR","MAKER","MARCH","MATCH","MAYOR","MEANT",
  "MEDIA","METAL","MIGHT","MINOR","MINUS","MIXED","MODEL","MONEY","MONTH","MORAL",
  "MOTOR","MOUNT","MOUSE","MOUTH","MOVIE","MUSIC","NERVE","NEVER","NEWLY","NIGHT",
  "NOISE","NORTH","NOTED","NOVEL","NURSE","OCCUR","OCEAN","OFFER","OFTEN","ORDER",
  "OTHER","OUGHT","OUTER","OWNER","PAINT","PANEL","PAPER","PARTY","PEACE","PHASE",
  "PHONE","PHOTO","PIANO","PIECE","PILOT","PITCH","PLACE","PLAIN","PLANE","PLANT",
  "PLATE","POINT","POUND","POWER","PRESS","PRICE","PRIDE","PRIME","PRINT","PRIOR",
  "PRIZE","PROOF","PROUD","PROVE","QUEEN","QUICK","QUIET","QUITE","QUOTE","RADIO",
  "RAISE","RANGE","RAPID","RATIO","REACH","READY","REFER","RELAX","REPLY","RIGHT",
  "RIGID","RIVER","ROBOT","ROUGH","ROUND","ROUTE","ROYAL","RURAL","SAUCE","SCALE",
  "SCENE","SCOPE","SCORE","SENSE","SERVE","SEVEN","SHALL","SHAPE","SHARE","SHARP",
  "SHEET","SHELF","SHELL","SHIFT","SHINE","SHIRT","SHOCK","SHOOT","SHORT","SHOWN",
  "SIGHT","SINCE","SIXTH","SIXTY","SIZED","SKILL","SLEEP","SLICE","SLIDE","SMALL",
  "SMART","SMILE","SMOKE","SOLID","SOLVE","SORRY","SOUND","SOUTH","SPACE","SPARE",
  "SPEAK","SPEED","SPEND","SPENT","SPLIT","SPOKE","SPORT","STAFF","STAGE","STAKE",
  "STAND","START","STATE","STEAM","STEEL","STEEP","STEER","STICK","STILL","STOCK",
  "STONE","STOOD","STORE","STORM","STORY","STRIP","STUCK","STUDY","STUFF","STYLE",
  "SUGAR","SUITE","SUPER","SWEET","TABLE","TAKEN","TASTE","TAXES","TEACH","TEETH",
  "THANK","THEFT","THEIR","THEME","THERE","THESE","THICK","THING","THINK","THIRD",
  "THOSE","THREE","THREW","THROW","TIGHT","TIMES","TIRED","TITLE","TODAY","TOPIC",
  "TOTAL","TOUCH","TOUGH","TOWER","TRACK","TRADE","TRAIN","TREAT","TREND","TRIAL",
  "TRIBE","TRICK","TRIED","TRIES","TRUCK","TRULY","TRUNK","TRUST","TRUTH","TWICE",
  "UNDER","UNDUE","UNION","UNITY","UNTIL","UPPER","UPSET","URBAN","USAGE","USUAL",
  "VALID","VALUE","VIDEO","VIRUS","VISIT","VITAL","VOICE","WASTE","WATCH","WATER",
  "WHEEL","WHERE","WHICH","WHILE","WHITE","WHOLE","WHOSE","WOMAN","WOMEN","WORLD",
  "WORRY","WORSE","WORST","WORTH","WOULD","WOUND","WRITE","WRONG","WROTE","YIELD","YOUNG"
];

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

let answer, guesses, currentGuess, gameOver;
const keyStatus = {};

function pickAnswer() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function newGame() {
  answer = pickAnswer();
  guesses = [];
  currentGuess = '';
  gameOver = false;
  Object.keys(keyStatus).forEach(k => delete keyStatus[k]);
  
  const msgEl = document.getElementById('msg');
  const btnShare = document.getElementById('btnShare');
  if (msgEl) msgEl.textContent = '';
  if (btnShare) btnShare.style.display = 'none';
  
  renderBoard();
  renderKeyboard();
}

function renderBoard() {
  const boardEl = document.getElementById('board');
  if (!boardEl) return;
  
  boardEl.innerHTML = '';
  for (let r = 0; r < MAX_GUESSES; r++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    rowEl.id = 'row-' + r;
    const word = guesses[r] ? guesses[r].word : (r === guesses.length ? currentGuess : '');
    const result = guesses[r] ? guesses[r].result : null;
    
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      const letter = word[c] || '';
      tile.textContent = letter;
      if (letter) tile.classList.add('filled');
      if (result) tile.classList.add(result[c]);
      rowEl.appendChild(tile);
    }
    boardEl.appendChild(rowEl);
  }
}

function evaluateGuess(guess) {
  const result = new Array(WORD_LENGTH).fill('absent');
  const answerLetters = answer.split('');
  const used = new Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answerLetters[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    const idx = answerLetters.findIndex((l, j) => l === guess[i] && !used[j]);
    if (idx !== -1) {
      result[i] = 'present';
      used[idx] = true;
    }
  }
  return result;
}

function updateKeyStatus(guess, result) {
  const rank = { absent: 0, present: 1, correct: 2 };
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const status = result[i];
    if (!keyStatus[letter] || rank[status] > rank[keyStatus[letter]]) {
      keyStatus[letter] = status;
    }
  }
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

function shakeRow(r) {
  const rowEl = document.getElementById('row-' + r);
  if (!rowEl) return;
  rowEl.classList.add('shake');
  setTimeout(() => rowEl.classList.remove('shake'), 400);
}

function submitGuess() {
  if (gameOver) return;
  if (currentGuess.length !== WORD_LENGTH) {
    showToast('Not enough letters');
    shakeRow(guesses.length);
    return;
  }
  const result = evaluateGuess(currentGuess);
  guesses.push({ word: currentGuess, result });
  updateKeyStatus(currentGuess, result);

  const rowIndex = guesses.length - 1;
  renderBoard();
  animateFlip(rowIndex, result);

  const won = currentGuess === answer;
  currentGuess = '';

  setTimeout(() => {
    const msgEl = document.getElementById('msg');
    const btnShare = document.getElementById('btnShare');
    if (won) {
      gameOver = true;
      const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
      if (msgEl) msgEl.textContent = messages[guesses.length - 1] || 'You got it!';
      if (btnShare) btnShare.style.display = 'inline-block';
    } else if (guesses.length >= MAX_GUESSES) {
      gameOver = true;
      if (msgEl) msgEl.textContent = `The word was ${answer}.`;
      if (btnShare) btnShare.style.display = 'inline-block';
    }
    renderKeyboard();
  }, WORD_LENGTH * 100 + 200);
}

function animateFlip(rowIndex, result) {
  const rowEl = document.getElementById('row-' + rowIndex);
  if (!rowEl) return;
  const tiles = rowEl.querySelectorAll('.tile');
  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add('flip');
      setTimeout(() => tile.classList.add(result[i]), 250);
    }, i * 250);
  });
}

function handleKey(key) {
  if (gameOver) return;
  if (key === 'ENTER') {
    submitGuess();
  } else if (key === 'BACK') {
    currentGuess = currentGuess.slice(0, -1);
    renderBoard();
  } else if (/^[A-Z]$/.test(key)) {
    if (currentGuess.length < WORD_LENGTH) {
      currentGuess += key;
      renderBoard();
      const rowEl = document.getElementById('row-' + guesses.length);
      if (rowEl) {
        const tiles = rowEl.querySelectorAll('.tile');
        const last = tiles[currentGuess.length - 1];
        if (last) {
          last.classList.add('pop');
          setTimeout(() => last.classList.remove('pop'), 150);
        }
      }
    }
  }
}

function renderKeyboard() {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', ...'ZXCVBNM'.split(''), 'BACK']
  ];
  const kb = document.getElementById('keyboard');
  if (!kb) return;
  
  kb.innerHTML = '';
  rows.forEach(rowKeys => {
    const rowEl = document.createElement('div');
    rowEl.className = 'krow';
    rowKeys.forEach(k => {
      const btn = document.createElement('button');
      btn.className = 'key';
      if (k === 'ENTER' || k === 'BACK') btn.classList.add('wide');
      btn.textContent = k === 'BACK' ? '⌫' : (k === 'ENTER' ? 'Enter' : k);
      if (keyStatus[k]) btn.classList.add(keyStatus[k]);
      btn.addEventListener('click', () => handleKey(k));
      rowEl.appendChild(btn);
    });
    kb.appendChild(rowEl);
  });
}

// Global keydown event (Prevents capturing keyboard events when typing inside form inputs)
document.addEventListener('keydown', (e) => {
  const targetTag = e.target.tagName;
  if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || e.target.isContentEditable) {
    return;
  }

  const key = e.key.toUpperCase();
  if (key === 'ENTER') handleKey('ENTER');
  else if (key === 'BACKSPACE') handleKey('BACK');
  else if (/^[A-Z]$/.test(key)) handleKey(key);
});

// Event listeners for game action buttons
const btnNew = document.getElementById('btnNew');
if (btnNew) btnNew.addEventListener('click', newGame);

const btnShare = document.getElementById('btnShare');
if (btnShare) {
  btnShare.addEventListener('click', () => {
    const emojiMap = { correct: '🟩', present: '🟨', absent: '⬜' };
    const lines = guesses.map(g => g.result.map(r => emojiMap[r]).join(''));
    const text = `Wordle Clone ${guesses.length}/${MAX_GUESSES}\n\n${lines.join('\n')}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'))
        .catch(() => showToast(text));
    } else {
      showToast('Copy not supported here');
    }
  });
}

// Start game instance
newGame();