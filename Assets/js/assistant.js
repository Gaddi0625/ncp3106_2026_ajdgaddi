/**
 * assistant.js - Deterministic local guide for approved website content
 */
(() => {
  if (document.querySelector('.cpe-assistant')) return;

  const TEXT = {
    'assistant.launcher': 'Open CpE Assistant',
    'assistant.title': 'CpE Assistant',
    'assistant.source': 'Answers from information available on this website.',
    'assistant.close': 'Close CpE Assistant',
    'assistant.messagesLabel': 'Conversation with CpE Assistant',
    'assistant.inputLabel': 'Ask CpE Assistant a question',
    'assistant.placeholder': 'Ask a question...',
    'assistant.send': 'Send',
    'assistant.suggestions': 'Suggested questions',
    'assistant.role.user': 'You',
    'assistant.role.assistant': 'CpE Assistant',
    'assistant.suggestion.whatIs': 'What is Computer Engineering?',
    'assistant.suggestion.careers': 'What careers can I pursue?',
    'assistant.suggestion.licensure': 'Does CpE have a board exam?',
    'assistant.suggestion.contact': 'How can I contact UE Manila?',
    'assistant.answer.greeting': 'Hello! I can help you find information available on this website.',
    'assistant.answer.whatIs': 'Computer Engineering combines principles from electrical engineering and computer science to develop computing systems that integrate hardware and software.',
    'assistant.answer.cpeAtUe': 'This website represents the Bachelor of Science in Computer Engineering program at the University of the East - Manila. Use the program page for the approved overview.',
    'assistant.answer.specializations': 'General areas include embedded systems, computer architecture, networks, cybersecurity, robotics, software development, and hardware design. These are general fields, not official UE Manila tracks or course requirements.',
    'assistant.answer.careers': 'Graduates may explore roles involving embedded systems, hardware, software, networks, cybersecurity, systems integration, data, cloud computing, robotics, technical support, and research. These are general examples, not employment guarantees or UE Manila outcome statistics.',
    'assistant.answer.faculty': 'The four verified current UE Manila Computer Engineering faculty profiles are Errol John M. Antonio, Onofre F. Corpuz, Mary Ann L. Limkian, and Joemhel Jhon D. Coral.',
    'assistant.answer.scpes': 'SCPES is the Society of Computer Engineering Students at the University of the East - Manila. Its page presents officer profiles and community activity images; names, positions, and event details are included only when verified.',
    'assistant.answer.projects': 'The Student Projects page presents five records using available project images. Additional verified information will be added when available.',
    'assistant.answer.accreditation': 'UE Manila BS Computer Engineering holds PACUCOA Level II Reaccredited Status, valid until November 2027.',
    'assistant.answer.licensure': 'No. BS Computer Engineering does not have its own dedicated Professional Regulation Commission licensure examination.',
    'assistant.answer.contact': "The site provides verified contact details for the UE College of Engineering - Manila Dean's Office, not a separate Computer Engineering department office. Trunkline: (632) 8735-54-71 local 397; direct line: (632) 8735-13-54; email: jasmin.salazar@ue.edu.ph.",
    'assistant.answer.faq': 'The FAQ provides concise answers about Computer Engineering, the UE Manila program, careers, accreditation, licensure, and where to confirm current information.',
    'assistant.answer.game': 'The Computer Engineering Word Game asks you to guess a five-letter Computer Engineering or technology-related word in six attempts. It supports physical and onscreen keyboards.',
    'assistant.answer.navigation': 'Use the website navigation to find the program overview, specializations, careers, faculty, SCPES, student projects, FAQ, contact details, and game.',
    'assistant.answer.fallback': "I don't have information about that in this website yet. You can check the FAQ or contact the UE College of Engineering - Manila for official information."
  };

  const INTENTS = [
    {
      id: 'accreditation',
      phrases: ['accreditation status', 'is the program accredited', 'pacucoa status', 'antas ng akreditasyon', 'akreditado ba'],
      keywords: ['accreditation', 'accredited', 'reaccredited', 'pacucoa', 'akreditasyon', 'akreditado'],
      answer: 'assistant.answer.accreditation',
      links: [['cpe-at-ue.html', 'nav.cpeAtUe']]
    },
    {
      id: 'licensure',
      phrases: ['board exam', 'licensure exam', 'prc exam', 'may board exam ba', 'may licensure exam ba'],
      keywords: ['licensure', 'prc', 'license', 'lisensya', 'eksamen'],
      answer: 'assistant.answer.licensure',
      links: [['faq.html', 'nav.faq']]
    },
    {
      id: 'what_is_cpe',
      phrases: ['what is computer engineering', 'what is cpe', 'ano ang computer engineering', 'ano ang cpe'],
      keywords: ['definition', 'meaning', 'kahulugan'],
      answer: 'assistant.answer.whatIs',
      links: [['what-is-cpe.html', 'nav.whatIs']]
    },
    {
      id: 'cpe_at_ue',
      phrases: ['cpe at ue', 'what is cpe at ue', 'computer engineering at ue', 'ue computer engineering', 'ue manila program', 'program at ue', 'programa sa ue', 'cpe sa ue'],
      keywords: ['programa', 'program'],
      answer: 'assistant.answer.cpeAtUe',
      links: [['cpe-at-ue.html', 'nav.cpeAtUe']]
    },
    {
      id: 'specializations',
      phrases: ['major fields', 'areas of computer engineering', 'mga larangan', 'anong fields'],
      keywords: ['specialization', 'specializations', 'fields', 'tracks', 'majors', 'larangan', 'espesyalisasyon'],
      answer: 'assistant.answer.specializations',
      links: [['specializations.html', 'nav.specializations']]
    },
    {
      id: 'careers',
      phrases: ['career paths', 'what jobs can i get', 'anong careers sa cpe', 'anong trabaho'],
      keywords: ['career', 'careers', 'job', 'jobs', 'work', 'profession', 'employment', 'trabaho', 'karera', 'hanapbuhay'],
      answer: 'assistant.answer.careers',
      links: [['careers.html', 'nav.careers']]
    },
    {
      id: 'faculty',
      phrases: ['who are the faculty', 'sino ang faculty', 'sino ang mga guro'],
      keywords: ['faculty', 'teacher', 'teachers', 'professor', 'instructor', 'guro'],
      answer: 'assistant.answer.faculty',
      links: [['faculty.html', 'nav.faculty']]
    },
    {
      id: 'scpes',
      phrases: ['student organization', 'student society', 'samahan ng estudyante'],
      keywords: ['scpes', 'society', 'organization', 'organisasyon'],
      answer: 'assistant.answer.scpes',
      links: [['scpes.html', 'nav.scpes']]
    },
    {
      id: 'projects',
      phrases: ['student projects', 'student work', 'mga proyekto'],
      keywords: ['project', 'projects', 'proyekto', 'thesis'],
      answer: 'assistant.answer.projects',
      links: [['projects.html', 'nav.projects']]
    },
    {
      id: 'contact',
      phrases: ['contact ue', 'contact ue manila', 'how can i contact', 'where can i contact', 'makipag ugnayan', 'makikipag ugnayan', 'saan kokontak', 'contact details'],
      keywords: ['contact', 'email', 'phone', 'telephone', 'address', 'location', 'office', 'ugnayan', 'tawag', 'numero'],
      answer: 'assistant.answer.contact',
      links: [['contact.html', 'nav.contact']]
    },
    {
      id: 'faq',
      phrases: ['frequently asked questions', 'common questions', 'mga tanong'],
      keywords: ['faq', 'question', 'questions', 'tanong'],
      answer: 'assistant.answer.faq',
      links: [['faq.html', 'nav.faq']]
    },
    {
      id: 'game',
      phrases: ['word game', 'where is the game', 'nasaan ang laro', 'computer engineering game'],
      keywords: ['game', 'play', 'wordle', 'laro', 'maglaro'],
      answer: 'assistant.answer.game',
      links: [['game.html', 'nav.game']]
    },
    {
      id: 'navigation_help',
      phrases: ['where can i find', 'help me find', 'saan makikita', 'hanapin ang page', 'which page'],
      keywords: ['navigate', 'navigation', 'pahina'],
      answer: 'assistant.answer.navigation',
      links: [['index.html', 'nav.home'], ['faq.html', 'nav.faq']]
    },
    {
      id: 'greeting',
      phrases: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'kumusta', 'magandang araw', 'magandang umaga'],
      keywords: [],
      answer: 'assistant.answer.greeting',
      links: []
    }
  ];

  const FALLBACK = {
    id: 'fallback',
    answer: 'assistant.answer.fallback',
    links: [['faq.html', 'nav.faq'], ['contact.html', 'nav.contact']]
  };

  const t = key => {
    const dictionary = typeof I18n !== 'undefined' ? I18n.dict() : {};
    return dictionary[key] || TEXT[key] || key;
  };

  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const root = create('div', 'cpe-assistant');
  const launcher = create('button', 'cpe-assistant__launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'cpe-assistant-panel');

  const launcherIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  launcherIcon.setAttribute('viewBox', '0 0 24 24');
  launcherIcon.setAttribute('width', '24');
  launcherIcon.setAttribute('height', '24');
  launcherIcon.setAttribute('fill', 'none');
  launcherIcon.setAttribute('stroke', 'currentColor');
  launcherIcon.setAttribute('stroke-width', '2');
  launcherIcon.setAttribute('stroke-linecap', 'round');
  launcherIcon.setAttribute('stroke-linejoin', 'round');
  launcherIcon.setAttribute('aria-hidden', 'true');
  const bubblePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bubblePath.setAttribute('d', 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z');
  launcherIcon.append(bubblePath);
  launcher.append(launcherIcon);

  const panel = create('section', 'cpe-assistant__panel');
  panel.id = 'cpe-assistant-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'cpe-assistant-title');
  panel.hidden = true;

  const header = create('header', 'cpe-assistant__header');
  const headingGroup = create('div');
  const title = create('h2', 'cpe-assistant__title');
  title.id = 'cpe-assistant-title';
  const source = create('p', 'cpe-assistant__source');
  headingGroup.append(title, source);
  const closeButton = create('button', 'cpe-assistant__close', '\u00d7');
  closeButton.type = 'button';
  header.append(headingGroup, closeButton);

  const messages = create('div', 'cpe-assistant__messages');
  messages.setAttribute('role', 'log');
  messages.setAttribute('aria-live', 'polite');
  messages.setAttribute('aria-relevant', 'additions');

  const suggestions = create('div', 'cpe-assistant__suggestions');
  const suggestionsLabel = create('span', 'cpe-assistant__suggestions-label');
  const chips = create('div', 'cpe-assistant__chips');
  const suggestionKeys = [
    'assistant.suggestion.whatIs',
    'assistant.suggestion.careers',
    'assistant.suggestion.licensure',
    'assistant.suggestion.contact'
  ];
  const chipButtons = suggestionKeys.map(key => {
    const button = create('button', 'cpe-assistant__chip');
    button.type = 'button';
    button.dataset.assistantSuggestion = key;
    chips.append(button);
    return button;
  });
  suggestions.append(suggestionsLabel, chips);

  const form = create('form', 'cpe-assistant__form');
  const inputLabel = create('label', 'visually-hidden');
  inputLabel.htmlFor = 'cpe-assistant-input';
  const input = create('input', 'form-control cpe-assistant__input');
  input.id = 'cpe-assistant-input';
  input.type = 'text';
  input.maxLength = 240;
  input.autocomplete = 'off';
  const sendButton = create('button', 'btn btn-primary cpe-assistant__send');
  sendButton.type = 'submit';
  form.append(inputLabel, input, sendButton);
  panel.append(header, messages, suggestions, form);
  root.append(launcher, panel);
  document.body.append(root);

  let isOpen = false;
  let hasWelcome = false;

  const normalize = value => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  const matchIntent = question => {
    const normalized = normalize(question);
    const words = new Set(normalized.split(' ').filter(Boolean));
    let best = FALLBACK;
    let bestScore = 0;
    INTENTS.forEach(intent => {
      let score = 0;
      intent.phrases.forEach(phrase => {
        const normalizedPhrase = normalize(phrase);
        if (normalized === normalizedPhrase) score += 10;
        else if (` ${normalized} `.includes(` ${normalizedPhrase} `)) {
          score += ['greeting', 'navigation_help'].includes(intent.id) ? 1 : 4;
        }
      });
      intent.keywords.forEach(keyword => {
        const normalizedKeyword = normalize(keyword);
        if (normalizedKeyword.includes(' ')) {
          if (normalized.includes(normalizedKeyword)) score += 3;
        } else if (words.has(normalizedKeyword)) {
          score += intent.id === 'navigation_help' ? 1 : 2;
        }
      });
      if (score > bestScore) {
        best = intent;
        bestScore = score;
      }
    });
    return best;
  };

  const appendMessage = (role, text, links = []) => {
    const message = create('article', `cpe-assistant__message cpe-assistant__message--${role}`);
    message.setAttribute('aria-label', t(role === 'user' ? 'assistant.role.user' : 'assistant.role.assistant'));
    message.append(create('p', '', text));
    if (links.length) {
      const linkGroup = create('div', 'cpe-assistant__links');
      links.forEach(([href, labelKey]) => {
        const link = create('a', '', t(labelKey));
        link.href = href;
        linkGroup.append(link);
      });
      message.append(linkGroup);
    }
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const ensureWelcome = () => {
    if (hasWelcome) return;
    appendMessage('assistant', t('assistant.answer.greeting'));
    hasWelcome = true;
  };

  const ask = question => {
    const trimmed = question.trim();
    if (!trimmed) return;
    ensureWelcome();
    appendMessage('user', trimmed);
    const intent = matchIntent(trimmed);
    appendMessage('assistant', t(intent.answer), intent.links);
    input.value = '';
    input.focus();
  };

  const renderInterface = () => {
    launcher.setAttribute('aria-label', t('assistant.launcher'));
    title.textContent = t('assistant.title');
    source.textContent = t('assistant.source');
    closeButton.setAttribute('aria-label', t('assistant.close'));
    messages.setAttribute('aria-label', t('assistant.messagesLabel'));
    inputLabel.textContent = t('assistant.inputLabel');
    input.placeholder = t('assistant.placeholder');
    sendButton.textContent = t('assistant.send');
    suggestionsLabel.textContent = t('assistant.suggestions');
    chipButtons.forEach(button => {
      button.textContent = t(button.dataset.assistantSuggestion);
    });
  };

  const open = () => {
    if (isOpen) return;
    isOpen = true;
    root.classList.add('cpe-assistant--open');
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    ensureWelcome();
    input.focus();
  };

  const close = (restoreFocus = true) => {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('cpe-assistant--open');
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    if (restoreFocus) launcher.focus();
  };

  launcher.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  form.addEventListener('submit', event => {
    event.preventDefault();
    ask(input.value);
  });
  chipButtons.forEach(button => {
    button.addEventListener('click', () => ask(button.textContent));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      close();
    }
  });
  document.addEventListener('i18n:changed', () => {
    renderInterface();
    if (!hasWelcome) ensureWelcome();
  });

  const drawer = document.querySelector('.navbar-collapse');
  drawer?.addEventListener('show.bs.collapse', () => {
    close(false);
    root.classList.add('cpe-assistant--behind-nav');
  });
  drawer?.addEventListener('hidden.bs.collapse', () => {
    root.classList.remove('cpe-assistant--behind-nav');
  });

  renderInterface();
})();
