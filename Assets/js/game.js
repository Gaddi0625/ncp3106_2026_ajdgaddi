/**
 * game.js - Isolated five-letter word game
 */
(() => {
  const game = document.querySelector('.wordle-game');
  if (!game) return;

  const WORDS = [
    'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
    'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
    'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
    'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD',
    'AWARE', 'BADLY', 'BAKER', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW',
    'BENCH', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST', 'BLEND', 'BLESS', 'BLIND',
    'BLOCK', 'BLOOD', 'BOARD', 'BOAST', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND',
    'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD',
    'BROKE', 'BROWN', 'BRUSH', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CARRY', 'CATCH',
    'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST',
    'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK',
    'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER',
    'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE',
    'CYCLE', 'DAILY', 'DANCE', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOUBT', 'DOZEN',
    'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS', 'DRIED', 'DRIVE', 'DROVE', 'EAGER',
    'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL',
    'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER',
    'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR',
    'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD',
    'FRESH', 'FRONT', 'FROST', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE',
    'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP',
    'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARSH', 'HEART', 'HEAVY', 'HELLO',
    'HENCE', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT',
    'ISSUE', 'JOINT', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
    'LEARN', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIGHT', 'LIMIT', 'LOCAL', 'LOGIC', 'LOOSE',
    'LOWER', 'LUCKY', 'LUNCH', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MATCH', 'MAYOR', 'MEANT',
    'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL',
    'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NERVE', 'NEVER', 'NEWLY', 'NIGHT',
    'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER',
    'OTHER', 'OUGHT', 'OUTER', 'OWNER', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE',
    'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT',
    'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR',
    'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'QUOTE', 'RADIO',
    'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RELAX', 'REPLY', 'RIGHT',
    'RIGID', 'RIVER', 'ROBOT', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SAUCE', 'SCALE',
    'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP',
    'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN',
    'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLICE', 'SLIDE', 'SMALL',
    'SMART', 'SMILE', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE',
    'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE',
    'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STICK', 'STILL', 'STOCK',
    'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE',
    'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH',
    'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
    'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC',
    'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL',
    'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE',
    'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL',
    'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER',
    'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD',
    'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG'
  ];
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  const STATUS_RANK = { absent: 0, present: 1, correct: 2 };
  const KEYBOARD_ROWS = [
    [...'QWERTYUIOP'],
    [...'ASDFGHJKL'],
    ['ENTER', ...'ZXCVBNM', 'BACK']
  ];

  const board = document.getElementById('wordle-board');
  const keyboard = document.getElementById('wordle-keyboard');
  const status = document.getElementById('wordle-status');
  const toast = document.getElementById('wordle-toast');
  const newButton = document.getElementById('wordle-new');
  const copyButton = document.getElementById('wordle-copy');
  if (!board || !keyboard || !status || !toast || !newButton || !copyButton) return;

  let answer = '';
  let guesses = [];
  let currentGuess = '';
  let gameOver = false;
  let won = false;
  let gameRound = 0;
  let statusMessage = { key: 'game.status.ready', fallback: 'Enter a five-letter word.', values: {} };
  let toastMessage = null;
  let toastTimer = 0;
  const animationTimers = new Set();
  const keyStatus = {};

  const translate = (key, fallback, values = {}) => {
    const dictionary = typeof I18n !== 'undefined' ? I18n.dict() : {};
    let text = dictionary[key] || fallback;
    Object.entries(values).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, value);
    });
    return text;
  };

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(() => {
      animationTimers.delete(timer);
      callback();
    }, delay);
    animationTimers.add(timer);
  };

  const clearAnimationTimers = () => {
    animationTimers.forEach(timer => window.clearTimeout(timer));
    animationTimers.clear();
  };

  const setStatus = (key, fallback, values = {}) => {
    statusMessage = { key, fallback, values };
    status.textContent = translate(key, fallback, values);
  };

  const showToast = (key, fallback) => {
    window.clearTimeout(toastTimer);
    toastMessage = { key, fallback };
    toast.textContent = translate(key, fallback);
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  };

  const stateLabel = state => {
    const labels = {
      correct: ['game.legend.correct', 'correct position'],
      present: ['game.legend.present', 'in the word, wrong position'],
      absent: ['game.legend.absent', 'not in the word']
    };
    return translate(...labels[state]);
  };

  const tileLabel = (row, column, letter, result) => {
    if (!letter) {
      return translate('game.tile.empty', 'Row {row}, column {column}, empty', { row, column });
    }
    if (!result) {
      return translate('game.tile.letter', 'Row {row}, column {column}, {letter}', { row, column, letter });
    }
    return translate('game.tile.result', 'Row {row}, column {column}, {letter}: {state}', {
      row,
      column,
      letter,
      state: stateLabel(result)
    });
  };

  const renderBoard = () => {
    board.replaceChildren();
    for (let rowIndex = 0; rowIndex < MAX_GUESSES; rowIndex += 1) {
      const row = document.createElement('div');
      row.className = 'wordle-row';
      row.id = `wordle-row-${rowIndex}`;
      row.setAttribute('role', 'row');
      const submitted = guesses[rowIndex];
      const word = submitted?.word || (rowIndex === guesses.length ? currentGuess : '');
      const result = submitted?.result;

      for (let columnIndex = 0; columnIndex < WORD_LENGTH; columnIndex += 1) {
        const tile = document.createElement('div');
        const letter = word[columnIndex] || '';
        const tileResult = result?.[columnIndex];
        tile.className = 'wordle-tile';
        tile.setAttribute('role', 'gridcell');
        tile.setAttribute('aria-label', tileLabel(rowIndex + 1, columnIndex + 1, letter, tileResult));
        tile.textContent = letter;
        if (letter) tile.classList.add('wordle-is-filled');
        if (tileResult) tile.classList.add(`wordle-is-${tileResult}`);
        row.append(tile);
      }
      board.append(row);
    }
  };

  const renderKeyboard = () => {
    const focusedKey = document.activeElement?.closest('.wordle-key')?.dataset.wordleKey;
    keyboard.replaceChildren();
    KEYBOARD_ROWS.forEach(keys => {
      const row = document.createElement('div');
      row.className = 'wordle-keyboard-row';
      keys.forEach(key => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'wordle-key';
        button.dataset.wordleKey = key;
        button.disabled = gameOver;
        if (key === 'ENTER' || key === 'BACK') button.classList.add('wordle-key--wide');
        if (keyStatus[key]) button.classList.add(`wordle-is-${keyStatus[key]}`);
        if (key === 'ENTER') {
          button.textContent = translate('game.key.enter', 'Enter');
          button.setAttribute('aria-label', translate('game.key.enter', 'Enter'));
        } else if (key === 'BACK') {
          button.textContent = '⌫';
          button.setAttribute('aria-label', translate('game.key.backspace', 'Backspace'));
        } else {
          button.textContent = key;
          const keyState = keyStatus[key] ? `, ${stateLabel(keyStatus[key])}` : '';
          button.setAttribute('aria-label', `${key}${keyState}`);
        }
        button.addEventListener('click', () => handleKey(key));
        row.append(button);
      });
      keyboard.append(row);
    });
    if (focusedKey) keyboard.querySelector(`[data-wordle-key="${focusedKey}"]`)?.focus();
  };

  const evaluateGuess = guess => {
    const result = new Array(WORD_LENGTH).fill('absent');
    const answerLetters = [...answer];
    const used = new Array(WORD_LENGTH).fill(false);
    for (let index = 0; index < WORD_LENGTH; index += 1) {
      if (guess[index] === answerLetters[index]) {
        result[index] = 'correct';
        used[index] = true;
      }
    }
    for (let index = 0; index < WORD_LENGTH; index += 1) {
      if (result[index] === 'correct') continue;
      const match = answerLetters.findIndex((letter, answerIndex) => letter === guess[index] && !used[answerIndex]);
      if (match !== -1) {
        result[index] = 'present';
        used[match] = true;
      }
    }
    return result;
  };

  const updateKeyStatus = (guess, result) => {
    [...guess].forEach((letter, index) => {
      const next = result[index];
      if (!keyStatus[letter] || STATUS_RANK[next] > STATUS_RANK[keyStatus[letter]]) keyStatus[letter] = next;
    });
  };

  const animateRow = rowIndex => {
    const row = document.getElementById(`wordle-row-${rowIndex}`);
    if (!row) return;
    row.querySelectorAll('.wordle-tile').forEach((tile, index) => {
      schedule(() => tile.classList.add('wordle-flip'), index * 100);
    });
  };

  const shakeCurrentRow = () => {
    const row = document.getElementById(`wordle-row-${guesses.length}`);
    if (!row) return;
    row.classList.add('wordle-shake');
    schedule(() => row.classList.remove('wordle-shake'), 350);
  };

  const submitGuess = () => {
    if (gameOver) return;
    if (currentGuess.length !== WORD_LENGTH) {
      setStatus('game.status.notEnough', 'Enter five letters before submitting.');
      shakeCurrentRow();
      return;
    }

    const submittedWord = currentGuess;
    const result = evaluateGuess(submittedWord);
    guesses.push({ word: submittedWord, result });
    updateKeyStatus(submittedWord, result);
    currentGuess = '';
    won = submittedWord === answer;
    gameOver = won || guesses.length >= MAX_GUESSES;
    renderBoard();
    renderKeyboard();
    animateRow(guesses.length - 1);

    if (won) {
      const attempt = Math.min(guesses.length, MAX_GUESSES);
      setStatus(`game.status.win${attempt}`, ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'][attempt - 1]);
    } else if (gameOver) {
      setStatus('game.status.loss', 'The word was {answer}.', { answer });
    } else {
      setStatus('game.status.keepGoing', 'Keep going.');
    }
    copyButton.classList.toggle('wordle-is-hidden', !gameOver);
  };

  const handleKey = key => {
    if (gameOver) return;
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK') {
      currentGuess = currentGuess.slice(0, -1);
      renderBoard();
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      currentGuess += key;
      renderBoard();
      const row = document.getElementById(`wordle-row-${guesses.length}`);
      const tile = row?.querySelectorAll('.wordle-tile')[currentGuess.length - 1];
      if (tile) {
        tile.classList.add('wordle-pop');
        schedule(() => tile.classList.remove('wordle-pop'), 150);
      }
    }
  };

  const newGame = () => {
    clearAnimationTimers();
    gameRound += 1;
    const previousAnswer = answer;
    do {
      answer = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (WORDS.length > 1 && answer === previousAnswer);
    guesses = [];
    currentGuess = '';
    gameOver = false;
    won = false;
    Object.keys(keyStatus).forEach(key => delete keyStatus[key]);
    copyButton.classList.add('wordle-is-hidden');
    toast.hidden = true;
    toastMessage = null;
    window.clearTimeout(toastTimer);
    setStatus('game.status.ready', 'Enter a five-letter word.');
    renderBoard();
    renderKeyboard();
  };

  const copyResult = async () => {
    const round = gameRound;
    const symbols = { correct: '🟩', present: '🟨', absent: '⬜' };
    const rows = guesses.map(guess => guess.result.map(state => symbols[state]).join(''));
    const score = won ? guesses.length : 'X';
    const result = `UE CpE Word Game ${score}/${MAX_GUESSES}\n\n${rows.join('\n')}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(result);
      if (round !== gameRound) return;
      showToast('game.toast.copied', 'Result copied to clipboard.');
    } catch (error) {
      if (round !== gameRound) return;
      console.warn('[game] Result could not be copied:', error);
      showToast('game.toast.copyFailed', 'Result could not be copied.');
    }
  };

  document.addEventListener('keydown', event => {
    const target = event.target;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (target instanceof HTMLElement) {
      if (target.matches('input, textarea, select, a, button:not(.wordle-key)') || target.isContentEditable) return;
      if (target.matches('.wordle-key') && ['Enter', ' '].includes(event.key)) return;
    }
    const key = event.key.toUpperCase();
    if (key === 'ENTER') {
      event.preventDefault();
      handleKey('ENTER');
    } else if (key === 'BACKSPACE') {
      event.preventDefault();
      handleKey('BACK');
    } else if (/^[A-Z]$/.test(key)) {
      handleKey(key);
    }
  });

  newButton.addEventListener('click', newGame);
  copyButton.addEventListener('click', copyResult);
  document.addEventListener('i18n:changed', () => {
    status.textContent = translate(statusMessage.key, statusMessage.fallback, statusMessage.values);
    if (!toast.hidden && toastMessage) toast.textContent = translate(toastMessage.key, toastMessage.fallback);
    renderBoard();
    renderKeyboard();
  });
  newGame();
})();
