'use strict';

/* =====================================================================
   حروفي - موقع لتعليم القراءة والكتابة ومهارات الحياة لذوي الهمم
   - الأقسام (SECTIONS): كل قسم له إعدادات وصعوبة مناسبة ومساراته.
   - المسارات (TRACKS): القراءة والكتابة / مهارات الحياة / السلوك الإيجابي.
   - أي مستوى جديد بتضيفه في مسار بيظهر تلقائيًا.
   - أول سؤالين في كل مستوى بيتستخدموا كمان في اختبار تحديد المستوى.
   ===================================================================== */

/* ---------------------------- المحتوى ---------------------------- */
const choice = (prompt, options, answer, big) => ({ t: 'choice', prompt, options, answer, big });
const build = (prompt, word, big) => ({ t: 'build', prompt, word, big });
const card = (big, label, emoji = '', speakText) => ({ big, label, emoji, speak: speakText || label });

/* ---- مسار القراءة والكتابة ---- */
const READING_LEVELS = [
  {
    id: 1, title: 'الحروف', subtitle: 'نتعرف على الحروف الأولى', emoji: '🔤', sticker: '🐰',
    cards: [
      { big: 'أ', label: 'أرنب', speak: 'أ، أرنب', emoji: '🐰' },
      { big: 'ب', label: 'بطة', speak: 'ب، بطة', emoji: '🦆' },
      { big: 'ت', label: 'تفاحة', speak: 'ت، تفاحة', emoji: '🍎' },
      { big: 'ج', label: 'جمل', speak: 'ج، جمل', emoji: '🐪' },
      { big: 'ح', label: 'حصان', speak: 'ح، حصان', emoji: '🐴' },
    ],
    questions: [
      choice('فين حرف الباء؟', ['ج', 'ب', 'أ'], 1),
      choice('فين حرف الجيم؟', ['ج', 'ح', 'ت'], 0),
      choice('أي حرف بيبدأ بيه «تفاحة»؟', ['أ', 'ت', 'ب'], 1, '🍎'),
      choice('أي حرف بيبدأ بيه «حصان»؟', ['ح', 'ج', 'أ'], 0, '🐴'),
    ],
  },
  {
    id: 2, title: 'الحركات', subtitle: 'فتحة وضمة وكسرة', emoji: '✨', sticker: '🌟',
    cards: [
      { big: 'بَ', label: 'فتحة: بَ', speak: 'بَ', emoji: '' },
      { big: 'بُ', label: 'ضمة: بُ', speak: 'بُ', emoji: '' },
      { big: 'بِ', label: 'كسرة: بِ', speak: 'بِ', emoji: '' },
    ],
    questions: [
      choice('أي حرف عليه فتحة؟', ['بِ', 'بَ', 'بُ'], 1),
      choice('أي حرف عليه ضمة؟', ['بُ', 'بَ', 'بِ'], 0),
      choice('أي حرف عليه كسرة؟', ['بُ', 'بَ', 'بِ'], 2),
      choice('أي حرف بيتنطق «تَ»؟', ['تِ', 'تُ', 'تَ'], 2),
    ],
  },
  {
    id: 3, title: 'الكلمات', subtitle: 'نقرأ كلمات بسيطة', emoji: '📖', sticker: '🦄',
    cards: [
      { big: 'بطة', label: 'بطة', speak: 'بطة', emoji: '🦆' },
      { big: 'جمل', label: 'جمل', speak: 'جمل', emoji: '🐪' },
      { big: 'تفاح', label: 'تفاح', speak: 'تفاح', emoji: '🍎' },
      { big: 'حصان', label: 'حصان', speak: 'حصان', emoji: '🐴' },
    ],
    questions: [
      choice('إيه الكلمة دي؟', ['جمل', 'بطة', 'حصان'], 1, '🦆'),
      choice('إيه الكلمة دي؟', ['جمل', 'تفاح', 'بطة'], 0, '🐪'),
      choice('إيه الكلمة دي؟', ['حصان', 'جمل', 'تفاح'], 2, '🍎'),
      choice('إيه الكلمة دي؟', ['حصان', 'بطة', 'تفاح'], 0, '🐴'),
    ],
  },
  {
    id: 4, title: 'الجمل', subtitle: 'نقرأ جمل قصيرة', emoji: '💬', sticker: '🚀',
    cards: [
      { big: 'هذه بطة', label: 'هذه بطة', speak: 'هذه بطة', emoji: '🦆' },
      { big: 'هذا جمل', label: 'هذا جمل', speak: 'هذا جمل', emoji: '🐪' },
      { big: 'أحب التفاح', label: 'أحب التفاح', speak: 'أحب التفاح', emoji: '🍎' },
    ],
    questions: [
      choice('اختار الجملة المناسبة', ['هذا جمل', 'هذه بطة', 'أحب التفاح'], 1, '🦆'),
      choice('اختار الجملة المناسبة', ['هذا جمل', 'هذه بطة', 'أحب التفاح'], 0, '🐪'),
      choice('اختار الجملة المناسبة', ['هذا جمل', 'أحب التفاح', 'هذه بطة'], 1, '🍎'),
    ],
  },
  {
    id: 5, title: 'الكتابة', subtitle: 'نرتب الحروف ونكتب الكلمة', emoji: '✏️', sticker: '👑',
    cards: [
      { big: 'ب ط ة', label: 'بطة', speak: 'بطة، ب، ط، ة', emoji: '🦆' },
      { big: 'ج م ل', label: 'جمل', speak: 'جمل، ج، م، ل', emoji: '🐪' },
    ],
    questions: [
      build('رتّب الحروف واكتب الكلمة', 'بطة', '🦆'),
      build('رتّب الحروف واكتب الكلمة', 'جمل', '🐪'),
      build('رتّب الحروف واكتب الكلمة', 'تفاح', '🍎'),
    ],
  },
];

/* ---- مسار مهارات الحياة (الاعتماد على النفس والتعامل مع الناس) ---- */
const LIFE_LEVELS = [
  {
    id: 1, title: 'التحية والتعامل', subtitle: 'نقول الكلام الحلو مع الناس', emoji: '👋', sticker: '🏅',
    cards: [
      card('مرحبًا', 'بقول مرحبًا لما أقابل حد', '👋', 'مرحبًا'),
      card('شكرًا', 'بقول شكرًا لما حد يساعدني', '🙏', 'شكرًا'),
      card('من فضلك', 'بقول من فضلك لما أطلب حاجة', '🤲', 'من فضلك'),
      card('اسمي', 'بقول اسمي لما حد يسألني', '😊', 'اسمي'),
    ],
    questions: [
      choice('لما أقابل حد بقول إيه؟', ['مرحبًا', 'ولا حاجة', 'امشي'], 0, '👋'),
      choice('حد ساعدني، بقول إيه؟', ['لا', 'شكرًا', 'ولا حاجة'], 1, '🙏'),
      choice('عايز حاجة، بطلبها إزاي؟', ['هاتها', 'من فضلك', 'بسرعة'], 1, '🤲'),
      choice('حد سألني: اسمك إيه؟ أعمل إيه؟', ['أقول اسمي', 'أجري', 'أسكت'], 0, '😊'),
    ],
  },
  {
    id: 2, title: 'الروتين اليومي', subtitle: 'أعمل أموري بنفسي', emoji: '🪥', sticker: '🧸',
    cards: [
      card('الإيدين', 'أغسل إيديا بالصابون', '🧼'),
      card('الأسنان', 'أنظف أسناني بالفرشة', '🪥'),
      card('الهدوم', 'ألبس هدومي بنفسي', '👕'),
      card('الأكل', 'آكل بنفسي بالملعقة', '🍽️'),
    ],
    questions: [
      choice('قبل الأكل بعمل إيه؟', ['أغسل إيديا', 'أنام', 'ألعب'], 0, '🧼'),
      choice('بنظف أسناني بـ إيه؟', ['ملعقة', 'فرشة ومعجون', 'كوباية'], 1, '🪥'),
      choice('ألبس إيه لما أخرج؟', ['هدومي', 'البطانية', 'المخدة'], 0, '👕'),
      choice('بالليل بعمل إيه؟', ['ألعب كورة', 'أخرج', 'أنام'], 2, '🌙'),
    ],
  },
  {
    id: 3, title: 'قراءة اللافتات', subtitle: 'نقرأ الكلمات اللي حوالينا', emoji: '🪧', sticker: '🎨',
    cards: [
      card('مدخل', 'مكان الدخول', '🚪'),
      card('مخرج', 'مكان الخروج', '🏃'),
      card('خطر', 'يعني أبعد، ممكن أتأذي', '⚠️'),
      card('دورة مياه', 'مكان الحمام', '🚻'),
      card('صيدلية', 'مكان الأدوية', '💊'),
    ],
    questions: [
      choice('إيه معنى «خطر»؟', ['أبعد وأخد بالي', 'ألعب', 'آكل'], 0, '⚠️'),
      choice('عايز أخرج، أدوّر على لافتة...', ['خطر', 'مخرج', 'صيدلية'], 1, '🏃'),
      choice('عايز دورة المياه، أدوّر على...', ['خطر', 'دورة مياه', 'مخرج'], 1, '🚻'),
      choice('إيه معنى «صيدلية»؟', ['مكان الأدوية', 'مكان اللعب', 'مكان النوم'], 0, '💊'),
    ],
  },
  {
    id: 4, title: 'الأرقام والتسوق', subtitle: 'نعد ونشتري', emoji: '🛒', sticker: '🎁',
    cards: [
      card('١', 'واحد', '🍎'),
      card('٢', 'اتنين', '🍎🍎'),
      card('٣', 'تلاتة', '🍎🍎🍎'),
      card('٤', 'أربعة', '🍎🍎🍎🍎'),
      card('٥', 'خمسة', '🍎🍎🍎🍎🍎'),
    ],
    questions: [
      choice('كام تفاحة؟', ['٢', '٣', '١'], 1, '🍎🍎🍎'),
      choice('كام بالونة؟', ['٤', '٣', '٥'], 0, '🎈🎈🎈🎈'),
      choice('كام نجمة؟', ['٥', '٢', '٣'], 1, '⭐⭐'),
      choice('في المحل، آخد الحاجة وبعدين...', ['أدفع تمنها', 'أجري', 'أرميها'], 0, '🛒'),
    ],
  },
];

/* ---- مسار السلوك الإيجابي ---- */
const BEHAVIOR_LEVELS = [
  {
    id: 1, title: 'الانتظار والدور', subtitle: 'أستنى دوري', emoji: '⏳', sticker: '🌈',
    cards: [
      card('أستنى دوري', 'لما فيه طابور بقف وأستنى', '⏳'),
      card('أرفع إيدي', 'لما عايز أتكلم أرفع إيدي', '✋'),
      card('أسمع كويس', 'لما حد بيتكلم أسمعه لحد ما يخلص', '👂'),
    ],
    questions: [
      choice('في طابور، أعمل إيه؟', ['أستنى دوري', 'أزق الناس', 'أجري'], 0, '🧍🧍🧍'),
      choice('عايز أتكلم في الفصل، أعمل إيه؟', ['أزعق', 'أرفع إيدي', 'أقوم أمشي'], 1, '✋'),
      choice('حد بيتكلم، أعمل إيه؟', ['أسمعه', 'أقاطعه', 'أجري'], 0, '👂'),
    ],
  },
  {
    id: 2, title: 'الكلمات الطيبة', subtitle: 'نتكلم بلطف', emoji: '💬', sticker: '🦋',
    cards: [
      card('آسف', 'لما أغلط أقول آسف', '🙇'),
      card('لو سمحت', 'أطلب بلطف', '🤲'),
      card('أساعدك؟', 'أعرض مساعدتي على صحابي', '🤝'),
    ],
    questions: [
      choice('غلطت في حد، أقول إيه؟', ['آسف', 'مش غلطتي', 'ولا حاجة'], 0, '🙇'),
      choice('عايز لعبة صاحبي، أقول إيه؟', ['هاتها', 'ممكن ألعب بيها؟', 'أخطفها'], 1, '🧸'),
      choice('الكلمة الطيبة هي...', ['اسكت', 'لو سمحت', 'غبي'], 1, '💬'),
    ],
  },
  {
    id: 3, title: 'أهدّى نفسي', subtitle: 'لما أزعل أعمل إيه', emoji: '🧘', sticker: '🌻',
    cards: [
      card('نفس عميق', 'لما أزعل آخد نفس عميق', '😮‍💨'),
      card('أعد لـ ٥', 'أعد ببطء لحد خمسة', '🖐️'),
      card('أطلب مساعدة', 'أقول لحد كبير إني زعلان', '🙋'),
    ],
    questions: [
      choice('زعلان جدًا، أعمل إيه الأول؟', ['أضرب', 'آخد نفس عميق', 'أرمي الحاجات'], 1, '😠'),
      choice('مش قادر أهدّى، أعمل إيه؟', ['أطلب مساعدة', 'أصرخ', 'أكسر حاجة'], 0, '🙋'),
      choice('لما أعد ببطء وآخد نفس، أحس إني...', ['أزعل أكتر', 'أهدى', 'أتعب'], 1, '🧘'),
    ],
  },
  {
    id: 4, title: 'التعاون والصداقة', subtitle: 'نلعب مع بعض', emoji: '🤝', sticker: '🏆',
    cards: [
      card('أشارك', 'أشارك لعبتي مع صحابي', '🧸'),
      card('أساعد', 'أساعد صاحبي لما يحتاج', '🤲'),
      card('ألعب بلطف', 'ألعب من غير ضرب', '🙌'),
    ],
    questions: [
      choice('صاحبي عايز يلعب معايا، أعمل إيه؟', ['أشاركه', 'أرفض وأزعق', 'أمشي'], 0, '🧸'),
      choice('صاحبي وقع، أعمل إيه؟', ['أضحك عليه', 'أساعده', 'أسيبه'], 1, '🤕'),
      choice('اللعب الحلو بيكون...', ['بالضرب', 'بالصريخ', 'بلطف'], 2, '🙌'),
    ],
  },
];

const TRACKS = {
  reading: { id: 'reading', title: 'القراءة والكتابة', subtitle: 'من الحروف لحد كتابة الكلمات', emoji: '📖', levels: READING_LEVELS },
  life: { id: 'life', title: 'مهارات الحياة', subtitle: 'نتعامل مع الناس ونعتمد على نفسنا', emoji: '🏠', levels: LIFE_LEVELS },
  behavior: { id: 'behavior', title: 'السلوك الإيجابي', subtitle: 'نتعلم التصرف الحلو في المواقف', emoji: '🌈', levels: BEHAVIOR_LEVELS },
};

/* ---- الأقسام: إعدادات كل قسم ----
   maxOptions: أقصى عدد اختيارات في السؤال (أقل = أسهل)
   pass: نسبة النجاح في اختبار نهاية المستوى
   rate: سرعة النطق (أقل = أبطأ)
   hint: إظهار الكلمة كمساعدة في أسئلة الكتابة
   feedbackMs: وقت ظهور النتيجة بعد كل إجابة */
const SECTIONS = [
  {
    id: 'delay', title: 'التأخر الذهني', emoji: '🌱',
    desc: 'خطوات صغيرة، اختيارين بس في كل سؤال، نطق أبطأ، وكلمة مساعدة وقت الكتابة.',
    tracks: ['reading', 'life'],
    opts: { maxOptions: 2, pass: 0.6, rate: 0.6, hint: true, feedbackMs: 1800 },
  },
  {
    id: 'down', title: 'متلازمة داون', emoji: '💛',
    desc: 'تعلّم بالصور والألوان، سرعة مريحة، وكلمة مساعدة وقت الكتابة.',
    tracks: ['reading', 'life'],
    opts: { maxOptions: 3, pass: 0.6, rate: 0.6, hint: true, feedbackMs: 1800 },
  },
  {
    id: 'behavior', title: 'تعديل السلوك', emoji: '🌈',
    desc: 'مسار للسلوك الإيجابي (الانتظار، الكلمات الطيبة، تهدئة النفس) مع القراءة ومهارات الحياة.',
    tracks: ['behavior', 'reading', 'life'],
    opts: { maxOptions: 3, pass: 0.7, rate: 0.75, hint: false, feedbackMs: 1500 },
  },
  {
    id: 'cognitive', title: 'صعوبات عقلية عامة', emoji: '🧩',
    desc: 'مسار متوازن يجمع القراءة والكتابة ومهارات الحياة والسلوك الإيجابي.',
    tracks: ['reading', 'life', 'behavior'],
    opts: { maxOptions: 3, pass: 0.7, rate: 0.75, hint: false, feedbackMs: 1500 },
  },
];

/* ---------------------------- حالة التطبيق ---------------------------- */
let SECTION = null;
const sectionById = (id) => SECTIONS.find((s) => s.id === id);
const tracksOf = (section) => section.tracks.map((id) => TRACKS[id]);

/* ------------------------- التخزين على الجهاز ------------------------- */
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('hurufi_' + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('hurufi_' + key, JSON.stringify(value)); } catch (e) { /* تجاهل */ }
  },
};

// كل قسم وكل مسار له تقدمه المنفصل
const K = (track, name) => `${SECTION.id}.${track.id}.${name}`;
const getUnlocked = (track) => store.get(K(track, 'unlocked'), 1);
const getStars = (track, id) => store.get(K(track, 'stars_' + id), 0);
const isPlaced = (track) => store.get(K(track, 'placed'), false);
const getStickers = () => store.get(SECTION.id + '.stickers', []);
const trackStars = (track) => track.levels.reduce((sum, l) => sum + getStars(track, l.id), 0);
const sectionStars = () => (SECTION ? tracksOf(SECTION).reduce((sum, t) => sum + trackStars(t), 0) : 0);
const doneLevels = (track) => track.levels.filter((l) => getStars(track, l.id) > 0).length;

function applyPlacement(track, level) {
  const target = Math.max(getUnlocked(track), Math.min(Math.max(level, 1), track.levels.length));
  store.set(K(track, 'unlocked'), target);
  store.set(K(track, 'placed'), true);
}

function completeLevel(track, level, stars) {
  if (stars > getStars(track, level.id)) store.set(K(track, 'stars_' + level.id), stars);
  if (level.id < track.levels.length && getUnlocked(track) <= level.id) store.set(K(track, 'unlocked'), level.id + 1);
  const owned = getStickers();
  if (!owned.includes(level.sticker)) store.set(SECTION.id + '.stickers', [...owned, level.sticker]);
}

/* مراعاة قدرات القسم: تقليل عدد الاختيارات في الأسئلة */
function prepare(questions) {
  const max = SECTION.opts.maxOptions;
  return questions.map((q) => {
    if (q.t !== 'choice' || q.options.length <= max) return q;
    const correct = q.options[q.answer];
    const options = q.options.filter((_, i) => i !== q.answer).slice(0, max - 1);
    const pos = q.answer % max;
    options.splice(pos, 0, correct);
    return { ...q, options, answer: pos };
  });
}

/* ----------------------------- الوضع الداكن ----------------------------- */
const currentTheme = () => document.documentElement.getAttribute('data-theme') || 'light';

function updateThemeButtons() {
  const dark = currentTheme() === 'dark';
  document.querySelectorAll('#themeBtn').forEach((b) => {
    b.textContent = dark ? '☀️' : '🌙';
    b.setAttribute('aria-label', dark ? 'الوضع الفاتح' : 'الوضع الداكن');
    b.title = dark ? 'الوضع الفاتح' : 'الوضع الداكن';
  });
}

function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  store.set('theme', next);
  updateThemeButtons();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('#themeBtn')) toggleTheme();
});

/* --------- النطق الصوتي: بس لما الطالب يضغط على زر 🔊 --------- */
function speak(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ar';
    u.rate = SECTION ? SECTION.opts.rate : 0.8;
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  } catch (e) { /* لو مفيش صوت عربي نكمل عادي */ }
}

/* ------- الاحتفال: بلالين بتطلع وحلويات وفشار بتنط على الشاشة ------- */
function celebrate(big) {
  const box = document.createElement('div');
  box.className = 'fx';
  box.setAttribute('aria-hidden', 'true');
  const treats = ['🍬', '🍭', '🍿', '🧁', '🍩', '🍫', '🍿'];
  const rand = (a, b) => a + Math.random() * (b - a);

  for (let n = 0; n < (big ? 14 : 7); n++) {
    const s = document.createElement('span');
    s.className = 'fx-balloon';
    s.textContent = '🎈';
    s.style.left = rand(2, 92) + '%';
    s.style.fontSize = rand(2.6, 3.8) + 'rem';
    s.style.setProperty('--dur', rand(2.2, 3.4) + 's');
    s.style.setProperty('--delay', rand(0, 0.5) + 's');
    s.style.setProperty('--sway', rand(-40, 40) + 'px');
    box.appendChild(s);
  }
  for (let n = 0; n < (big ? 18 : 9); n++) {
    const s = document.createElement('span');
    s.className = 'fx-treat';
    s.textContent = treats[n % treats.length];
    s.style.left = rand(4, 90) + '%';
    s.style.fontSize = rand(2, 3) + 'rem';
    s.style.setProperty('--dur', rand(1.8, 2.6) + 's');
    s.style.setProperty('--delay', rand(0, 0.6) + 's');
    s.style.setProperty('--h', rand(0.7, 1.1));
    box.appendChild(s);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4500);
}

function clearFx() {
  document.querySelectorAll('.fx').forEach((c) => c.remove());
}

/* ------------------------------ أدوات عرض ------------------------------ */
const app = document.getElementById('app');

const starsHtml = (n, total = 3) =>
  Array.from({ length: total }, (_, i) => `<span class="${i < n ? 'on' : 'off'}">★</span>`).join('');

function header(title) {
  return `<header class="topbar">
    <button class="icon-btn" id="themeBtn" aria-label="تبديل الوضع"></button>
    <h1>${title}</h1>
    ${SECTION ? `<div class="stars-chip" aria-label="مجموع النجوم">⭐ ${sectionStars()}</div>` : '<span></span>'}
  </header>`;
}

function render(html) {
  app.innerHTML = html;
  updateThemeButtons();
  window.scrollTo(0, 0);
}

function shuffled(list, avoid) {
  const arr = [...list];
  for (let tries = 0; tries < 10; tries++) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.join('') !== avoid) break;
  }
  return arr;
}

/* ------------------------------ الترحيب والأقسام ------------------------------ */
function showWelcome() {
  render(`${header('حروفي')}
    <main class="center-screen">
      <div class="huge">📚</div>
      <h2>أهلًا بيك في حروفي!</h2>
      <p>نتعلم القراءة والكتابة ومهارات الحياة، خطوة بخطوة وبالسرعة اللي تناسبك.</p>
      <button class="btn" id="start">يلا نختار القسم</button>
    </main>`);
  document.getElementById('start').onclick = showSections;
}

function showSections() {
  render(`${header('اختار القسم')}
    <main>
      ${SECTION ? '<button class="back-btn" id="back">→ رجوع</button>' : ''}
      <p class="lead">كل قسم فيه صعوبة وسرعة مناسبة، وتقدمه محفوظ لوحده.</p>
      <div class="levels">
        ${SECTIONS.map((s) => `<button class="card level" data-section="${s.id}">
          <span class="lvl-icon">${s.emoji}</span>
          <span class="lvl-text"><strong>${s.title}</strong><small>${s.desc}</small></span>
          <span class="chev" aria-hidden="true">‹</span>
        </button>`).join('')}
      </div>
    </main>`);
  if (SECTION) document.getElementById('back').onclick = showSectionHome;
  app.querySelectorAll('[data-section]').forEach((b) => {
    b.onclick = () => {
      SECTION = sectionById(b.dataset.section);
      store.set('section', SECTION.id);
      showSectionHome();
    };
  });
}

function showSectionHome() {
  const stickers = getStickers();
  render(`${header(SECTION.title)}
    <main>
      <button class="back-btn" id="change">→ تغيير القسم</button>
      <h2 class="hello">${SECTION.emoji} يلا نتعلم! 🚀</h2>
      <div class="levels">
        ${tracksOf(SECTION).map((t) => `<button class="card level" data-track="${t.id}">
          <span class="lvl-icon">${t.emoji}</span>
          <span class="lvl-text">
            <strong>${t.title}</strong>
            <small>${t.subtitle}</small>
            <small>${doneLevels(t)} من ${t.levels.length} مستويات</small>
          </span>
          <span class="chev" aria-hidden="true">‹</span>
        </button>`).join('')}
      </div>
      <h3>مجموعة هداياي 🎁</h3>
      <div class="card gifts">
        ${stickers.length
          ? stickers.map((s) => `<span>${s}</span>`).join('')
          : '<span class="empty">عدّي أول مستوى وهتلاقي هدية هنا</span>'}
      </div>
    </main>`);
  document.getElementById('change').onclick = showSections;
  app.querySelectorAll('[data-track]').forEach((b) => {
    b.onclick = () => openTrack(TRACKS[b.dataset.track]);
  });
}

function openTrack(track) {
  if (isPlaced(track)) showLevels(track);
  else showTrackIntro(track);
}

function showTrackIntro(track) {
  render(`${header(track.title)}
    <main class="center-screen">
      <div class="huge">${track.emoji}</div>
      <h2>نحدد مستواك</h2>
      <p>اختبار صغير في ${track.title} علشان نبدأ من المكان المناسب ليك.</p>
      <button class="btn" id="go">يلا نبدأ</button>
      <button class="btn ghost" id="back">رجوع</button>
    </main>`);
  document.getElementById('go').onclick = () => showPlacement({ track, firstRun: true });
  document.getElementById('back').onclick = showSectionHome;
}

/* -------------------------------- مستويات المسار -------------------------------- */
function showLevels(track) {
  const unlocked = getUnlocked(track);
  render(`${header(track.title)}
    <main>
      <button class="back-btn" id="back">→ رجوع</button>
      <div class="levels">
        ${track.levels.map((l) => {
          const locked = l.id > unlocked;
          const s = getStars(track, l.id);
          return `<button class="card level ${locked ? 'locked' : ''}" data-level="${l.id}">
            <span class="lvl-icon">${locked ? '🔒' : l.emoji}</span>
            <span class="lvl-text">
              <strong>المستوى ${l.id}: ${l.title}</strong>
              <small>${l.subtitle}</small>
              <span class="stars" aria-label="${s} من 3 نجوم">${starsHtml(s)}</span>
            </span>
            <span class="chev" aria-hidden="true">‹</span>
          </button>`;
        }).join('')}
      </div>
    </main>`);
  document.getElementById('back').onclick = showSectionHome;
  app.querySelectorAll('[data-level]').forEach((b) => {
    b.onclick = () => openLevel(track, Number(b.dataset.level));
  });
}

function openLevel(track, id) {
  if (id <= getUnlocked(track)) {
    showLesson(track, track.levels[id - 1]);
    return;
  }
  // مستوى مقفول: نعرض اختبار تخطي
  const dlg = document.createElement('dialog');
  dlg.innerHTML = `<h2>المستوى مقفول 🔒</h2>
    <p>تحب تجرب اختبار تخطي علشان تفتحه على طول؟</p>
    <div class="row">
      <button class="btn ghost" value="no">لاحقًا</button>
      <button class="btn" value="yes">جرّب</button>
    </div>`;
  document.body.appendChild(dlg);
  dlg.querySelectorAll('button').forEach((b) => {
    b.onclick = () => {
      const yes = b.value === 'yes';
      dlg.close();
      dlg.remove();
      if (yes) showPlacement({ track, from: getUnlocked(track), to: id, firstRun: false });
    };
  });
  dlg.addEventListener('cancel', () => dlg.remove());
  dlg.showModal();
}

/* --------------------------------- الدرس --------------------------------- */
function showLesson(track, level) {
  let page = 0;
  const draw = () => {
    const c = level.cards[page];
    const last = page === level.cards.length - 1;
    render(`${header(level.title)}
      <main>
        <button class="back-btn" id="back">→ رجوع</button>
        <div class="card lesson-card" id="card" tabindex="0" role="button" aria-label="اضغط لسماع ${c.label}">
          ${c.emoji ? `<div class="emoji">${c.emoji}</div>` : ''}
          <div class="big ${c.big.length > 5 ? 'long' : ''}">${c.big}</div>
          <div class="label">${c.label}</div>
          <button class="speak-btn" id="speak" aria-label="اسمع">🔊</button>
        </div>
        <div class="dots" aria-hidden="true">
          ${level.cards.map((_, i) => `<span class="${i === page ? 'on' : ''}"></span>`).join('')}
        </div>
        <div class="nav">
          <button class="btn ghost" id="prev" ${page === 0 ? 'disabled' : ''}>السابق</button>
          <button class="btn ${last ? 'success' : ''}" id="next">${last ? 'ابدأ الاختبار 🎯' : 'التالي'}</button>
        </div>
      </main>`);
    document.getElementById('back').onclick = () => showLevels(track);
    document.getElementById('card').onclick = () => speak(c.speak);
    document.getElementById('speak').onclick = (e) => { e.stopPropagation(); speak(c.speak); };
    document.getElementById('prev').onclick = () => { page--; draw(); };
    document.getElementById('next').onclick = () => {
      if (last) startFinalQuiz(track, level);
      else { page++; draw(); }
    };
  };
  draw();
}

function startFinalQuiz(track, level) {
  const questions = prepare(level.questions);
  runQuiz(questions, {
    title: `اختبار ${level.title}`,
    onBack: () => showLesson(track, level),
    onFinish: (correct) => {
      const total = questions.length;
      const passed = correct >= Math.ceil(total * SECTION.opts.pass);
      const stars = correct === total ? 3 : correct >= total - 1 ? 2 : 1;
      if (passed) completeLevel(track, level, stars);
      showReward(track, level, passed, passed ? stars : 0, correct, total);
    },
  });
}

/* ----------------------- الأسئلة (اختيار + كتابة) ----------------------- */
function runQuiz(questions, opts) {
  let i = 0;
  let correct = 0;
  let locked = false;

  const draw = () => {
    const q = questions[i];
    locked = false;
    render(`${header(opts.title)}
      <main>
        ${opts.onBack ? '<button class="back-btn" id="back">→ رجوع</button>' : ''}
        ${opts.sub ? `<p class="sub">${opts.sub}</p>` : ''}
        <div class="progress" role="progressbar" aria-valuemin="1" aria-valuenow="${i + 1}" aria-valuemax="${questions.length}">
          <span style="width:${((i + 1) / questions.length) * 100}%"></span>
        </div>
        <div class="card prompt">
          <div class="prompt-row">
            <h2>${q.prompt}</h2>
            <button class="speak-btn small" id="sayQ" aria-label="اسمع السؤال">🔊</button>
          </div>
          ${q.big ? `<div class="emoji">${q.big}</div>` : ''}
        </div>
        <div id="answers"></div>
        <p class="feedback" id="feedback" aria-live="polite"></p>
      </main>`);

    if (opts.onBack) document.getElementById('back').onclick = opts.onBack;
    document.getElementById('sayQ').onclick = () => speak(q.prompt);

    const feedback = document.getElementById('feedback');
    const submit = (ok) => {
      if (locked) return;
      locked = true;
      if (ok) {
        correct++;
        celebrate(false); // بلالين وحلويات وفشار بدل الصوت
      }
      feedback.textContent = ok ? 'برافو! 🎉' : 'حاول تاني 💪';
      feedback.className = 'feedback show ' + (ok ? 'good' : 'bad');
      setTimeout(() => {
        i++;
        if (i < questions.length) draw();
        else opts.onFinish(correct);
      }, SECTION.opts.feedbackMs);
    };

    const answers = document.getElementById('answers');
    if (q.t === 'choice') drawChoice(q, answers, submit);
    else drawBuild(q, answers, submit, () => locked);
  };

  draw();
}

function drawChoice(q, root, submit) {
  root.innerHTML = `<div class="options">${q.options
    .map((o, idx) => `<button class="option" data-i="${idx}">${o}</button>`)
    .join('')}</div>`;
  const buttons = [...root.querySelectorAll('.option')];
  buttons.forEach((b) => {
    b.onclick = () => {
      const idx = Number(b.dataset.i);
      const ok = idx === q.answer;
      buttons.forEach((x) => (x.disabled = true));
      buttons[q.answer].classList.add('right');
      if (!ok) b.classList.add('wrong');
      submit(ok);
    };
  });
}

function drawBuild(q, root, submit, isLocked) {
  const letters = shuffled(q.word.split(''), q.word);
  const chosen = [];
  root.innerHTML = `${SECTION.opts.hint ? `<div class="ghost-word" aria-label="الكلمة المطلوبة">${q.word}</div>` : ''}
    <div class="slots" id="slots" aria-label="الكلمة اللي كتبتها"></div>
    <div class="letters" id="letters">
      ${letters.map((l, idx) => `<button class="letter" data-i="${idx}">${l}</button>`).join('')}
    </div>
    <div class="build-actions"><button class="btn ghost" id="clear">امسح وابدأ تاني</button></div>`;

  const slots = root.querySelector('#slots');
  const buttons = [...root.querySelectorAll('.letter')];

  const refresh = () => {
    slots.innerHTML = chosen.map((c) => `<span>${letters[c]}</span>`).join('');
    buttons.forEach((b, idx) => (b.disabled = chosen.includes(idx) || isLocked()));
  };

  buttons.forEach((b) => {
    b.onclick = () => {
      const idx = Number(b.dataset.i);
      if (isLocked() || chosen.includes(idx)) return;
      chosen.push(idx);
      refresh();
      if (chosen.length === letters.length) {
        const built = chosen.map((c) => letters[c]).join('');
        const ok = built === q.word;
        slots.style.borderColor = ok ? 'var(--secondary)' : 'var(--coral)';
        if (!ok) slots.classList.add('bad');
        submit(ok);
        refresh();
      }
    };
  });

  root.querySelector('#clear').onclick = () => {
    if (isLocked()) return;
    chosen.length = 0;
    refresh();
  };
  refresh();
}

/* ------------------------ اختبار تحديد المستوى ------------------------ */
/* firstRun: من المستوى 1 لآخر مستوى في المسار.
   اختبار تخطي: من أول مستوى مفتوح لحد المستوى المطلوب.
   لازم الطالب يجاوب سؤالين صح علشان يعدّي كل مستوى. */
function showPlacement({ track, from = 1, to = track.levels.length + 1, firstRun = false }) {
  let current = from;
  const step = () => {
    const level = track.levels[current - 1];
    runQuiz(prepare(level.questions.slice(0, 2)), {
      title: firstRun ? 'نحدد مستواك' : 'اختبار تخطي',
      sub: `${level.emoji} ${level.title}`,
      onBack: () => showLevelsOrHome(track),
      onFinish: (correct) => {
        const passed = correct === 2;
        if (passed && current + 1 < to) {
          current++;
          step();
          return;
        }
        const unlock = passed ? to : current;
        applyPlacement(track, unlock);
        showPlacementResult(track, Math.min(Math.max(unlock, 1), track.levels.length));
      },
    });
  };
  step();
}

function showLevelsOrHome(track) {
  if (isPlaced(track)) showLevels(track);
  else showSectionHome();
}

function showPlacementResult(track, levelId) {
  const level = track.levels[levelId - 1];
  render(`${header(track.title)}
    <main class="center-screen">
      <div class="huge">${level.emoji}</div>
      <p>مستواك المناسب</p>
      <h2 class="good">المستوى ${level.id}: ${level.title}</h2>
      <button class="btn" id="go">يلا نبدأ</button>
    </main>`);
  document.getElementById('go').onclick = () => showLevels(track);
}

/* ------------------------- النتيجة والهدية ------------------------- */
function showReward(track, level, passed, stars, correct, total) {
  render(`<main class="center-screen">
      <div class="huge">${passed ? level.sticker : '💪'}</div>
      <h2 class="${passed ? 'good' : 'bad'}">${passed ? 'مبروك! 🎉' : 'قربت جدًا!'}</h2>
      <p>${passed ? 'كسبت هدية جديدة في مجموعتك' : `جاوبت ${correct} من ${total}. جرّب تاني وهتنجح`}</p>
      ${passed ? `<div class="reward-stars" aria-label="${stars} من 3 نجوم">${starsHtml(stars)}</div>` : ''}
      <button class="btn ${passed ? 'success' : ''}" id="next">${passed ? 'كمّل' : 'حاول تاني'}</button>
    </main>`);
  if (passed) celebrate(true);
  document.getElementById('next').onclick = () => {
    clearFx();
    if (passed) showLevels(track);
    else showLesson(track, level);
  };
}

/* ------------------------------- البداية ------------------------------- */
const savedSection = sectionById(store.get('section', ''));
if (savedSection) {
  SECTION = savedSection;
  showSectionHome();
} else {
  showWelcome();
}
