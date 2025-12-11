// Quiz data for Ponorogo culture
const quizData = [
    {
        question: "Apa nama tarian tradisional yang paling terkenal dari Ponorogo?",
        options: ["Tari Kecak", "Tari Reog", "Tari Legong", "Tari Pendet"],
        answer: 1
    },
    {
        question: "Apa asal usul nama 'Ponorogo' menurut legenda?",
        options: ["Dari nama raja", "Dari kata 'Pana Rogo' yang berarti api menyala", "Dari nama sungai", "Dari nama gunung"],
        answer: 1
    },
    {
        question: "Apa instrumen musik tradisional yang menjadi bagian dari gamelan Ponorogo?",
        options: ["Gitar", "Kenong", "Piano", "Drum"],
        answer: 1
    },
    {
        question: "Apa kuliner khas Ponorogo yang terbuat dari daging ayam dengan bumbu kacang?",
        options: ["Rendang", "Sate Ayam", "Gudeg", "Rawon"],
        answer: 1
    },
    {
        question: "Apa nama kerajinan khas Ponorogo yang melambangkan keindahan dan keberanian?",
        options: ["Wayang Kulit", "Merak Nogo", "Batik", "Tenun"],
        answer: 1
    },
    {
        question: "Apa gunung yang menjadi ikon Ponorogo?",
        options: ["Gunung Bromo", "Gunung Semeru", "Gunung Wilis", "Gunung Arjuno"],
        answer: 2
    },
    {
        question: "Apa festival tahunan yang menampilkan pertunjukan Reog dari berbagai daerah?",
        options: ["Festival Kecak", "Festival Reog", "Festival Tari", "Festival Musik"],
        answer: 1
    },
    {
        question: "Siapa tokoh terkenal dari Ponorogo yang dikenal sebagai pahlawan nasional?",
        options: ["Ki Ageng Suryomentaram", "R.A. Kartini", "Soekarno", "Ki Hajar Dewantara"],
        answer: 0
    },
    {
        question: "Apa nama museum khusus yang menyimpan koleksi artefak Reog di Ponorogo?",
        options: ["Museum Nasional", "Museum Reog", "Museum Seni", "Museum Budaya"],
        answer: 1
    },
    {
        question: "Apa air terjun indah yang terletak di kaki Gunung Wilis?",
        options: ["Air Terjun Madakaripura", "Air Terjun Coban Rondo", "Air Terjun Nglirip", "Air Terjun Tumpak Sewu"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const currentQText = document.getElementById('current-q');
const totalQText = document.getElementById('total-q');
const quizScoreText = document.getElementById('quiz-score');
const progressBarFill = document.getElementById('progress-bar-fill');

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBarFill.style.width = progress + '%';
    currentQText.textContent = currentQuestion + 1;
    quizScoreText.textContent = score;
}

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    optionsElement.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });

    selectedOption = null;
    nextBtn.disabled = true;
    updateProgress();
}

function selectOption(index) {
    if (selectedOption !== null) return; // Prevent changing answer
    
    const options = document.querySelectorAll('.option');
    const correctIndex = quizData[currentQuestion].answer;
    
    selectedOption = index;
    
    // Add visual feedback
    options.forEach((opt, i) => {
        opt.style.pointerEvents = 'none'; // Disable further clicks
    });
    
    if (index === correctIndex) {
        options[index].classList.add('correct');
        const feedbackSpan = document.createElement('span');
        feedbackSpan.className = 'feedback';
        feedbackSpan.textContent = '✓ Benar! +10 poin';
        options[index].appendChild(feedbackSpan);
    } else {
        options[index].classList.add('incorrect');
        const feedbackSpan = document.createElement('span');
        feedbackSpan.className = 'feedback';
        feedbackSpan.textContent = '✗ Salah';
        options[index].appendChild(feedbackSpan);
        
        options[correctIndex].classList.add('correct');
        const correctFeedback = document.createElement('span');
        correctFeedback.className = 'feedback';
        correctFeedback.textContent = '✓ Jawaban yang benar';
        options[correctIndex].appendChild(correctFeedback);
    }

    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
}

function nextQuestion() {
    if (selectedOption === quizData[currentQuestion].answer) {
        score += 10; // 10 points per correct answer
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    resultElement.innerHTML = `
        <h3>Quiz Selesai!</h3>
        <p>Skor Anda: ${score} dari ${quizData.length}</p>
        <p>${score >= 7 ? 'Luar biasa! Anda sangat mengenal budaya Ponorogo.' : score >= 5 ? 'Bagus! Anda cukup mengenal budaya Ponorogo.' : 'Coba lagi! Pelajari lebih banyak tentang budaya Ponorogo.'}</p>
        <button onclick="restartQuiz()">Coba Lagi</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block';
    resultElement.innerHTML = '';
    loadQuestion();
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize quiz
loadQuestion();

// Add event listener for next button
nextBtn.addEventListener('click', nextQuestion);

// ----- Mobile nav toggle -----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    // close menu when a link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });
}

// ----- Subtle parallax for decorative ornaments -----
const ornaments = document.querySelectorAll('.ponorogo-bg .ornament');
if (ornaments.length) {
    document.addEventListener('mousemove', (e) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const x = (e.clientX / w - 0.5) * 20; // range -10..10
        const y = (e.clientY / h - 0.5) * 14;
        ornaments.forEach((el, i) => {
            const depth = i === 0 ? 1.2 : -1.2;
            el.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${(x + y) * depth}deg)`;
        });
    });
    // gentle idle motion for when user isn't moving mouse
    ornaments.forEach((el, i) => {
        el.style.transition = 'transform 0.9s ease-out';
    });
}

// ----- Gallery Lightbox -----
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCategory = document.querySelector('.lightbox-category');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentGalleryIndex = 0;
const galleryData = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    title: item.dataset.title,
    category: item.dataset.category
}));

function openLightbox(index) {
    currentGalleryIndex = index;
    const data = galleryData[index];
    lightboxImage.src = data.src;
    lightboxImage.alt = data.alt;
    lightboxTitle.textContent = data.title;
    lightboxCategory.textContent = data.category;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function showPrev() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentGalleryIndex);
}

function showNext() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    openLightbox(currentGalleryIndex);
}

// Event listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

