/* ===================== MENU BAR LINE MOVEMENT WITH SCROLL ===================================== */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar .navbar-nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar .navbar-nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};


// Home Banner words transitioning

// Select all words and split them into letters for animation
let words = document.querySelectorAll(".word");
words.forEach(word => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
    // Set initial opacity to 0 for all words except the first one
    word.style.opacity = "0";
});

// Set initial opacity to 1 for the first word ("Solutions Architect")
words[0].style.opacity = "1";

// Initialize variables for tracking current word index and maximum index
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Function to transition between words
let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    let nextWord = words[nextWordIndex];

    // Fade out current word
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    // After fade out, fade in next word
    setTimeout(() => {
        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 120);
        });
    }, 80 * currentWord.textContent.length); // Wait for all letters to fade out

    // Update currentWordIndex to the next word index
    currentWordIndex = nextWordIndex;
};

// Initial call to start the animation after 3000ms (3 seconds)
setTimeout(() => {
    changeText();
    // Set interval to repeat the animation every 8 seconds (8000 milliseconds)
    setInterval(changeText, 6000);
}, 2000); // Wait for 3000 milliseconds (3 seconds) before starting the animation


// Activate on scrolling

document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.querySelector('.skills');
    const bars = document.querySelectorAll('.bar span');
    const circles = document.querySelectorAll('.circle');

    // Function to check if element is in viewport
    const isInViewport = (elem) => {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to animate bars
    const animateSkillsBars = () => {
        bars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = "0"; // Set initial width to 0
            setTimeout(() => {
                bar.style.width = width; // Animate to the full width
            }, 100);
        });
    };

    // Function to animate circles
    const animateSkillsCircles = () => {
        circles.forEach(elem => {
            const dots = parseInt(elem.getAttribute("data-dots"), 10);
            const marked = parseInt(elem.getAttribute("data-percent"), 10);
            const percent = Math.floor(dots * marked / 100);
            let points = "";
            const rotate = 360 / dots;

            for (let i = 0; i < dots; i++) {
                points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
            }

            elem.innerHTML = points;
            const pointsMarked = elem.querySelectorAll('.points');
            for (let i = 0; i < percent; i++) {
                pointsMarked[i].classList.add('marked');
            }
        });
    };

    // Function to handle scroll event
    const handleScroll = () => {
        if (isInViewport(skillsSection)) {
            animateSkillsBars();
            animateSkillsCircles();
            window.removeEventListener('scroll', handleScroll); // Remove listener after animation triggered
        }
    };

    // Initial check on page load
    handleScroll();

    // Event listener for scroll
    window.addEventListener('scroll', handleScroll);
});

//////////////////////// CIRCLE SKILLS ///////////////////////////
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    const dots = parseInt(elem.getAttribute("data-dots"), 10);
    const marked = parseInt(elem.getAttribute("data-percent"), 10);
    const percent = Math.floor(dots * marked / 100);
    let points = "";
    const rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML = points;
    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(skillsSection);

    function animateSkills() {
        const circles = document.querySelectorAll('.circle');
        circles.forEach(elem => {
            const dots = parseInt(elem.getAttribute("data-dots"), 10);
            const marked = parseInt(elem.getAttribute("data-percent"), 10);
            const percent = Math.floor(dots * marked / 100);
            let points = "";
            const rotate = 360 / dots;

            for (let i = 0; i < dots; i++) {
                points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
            }

            elem.innerHTML = points;
            const pointsMarked = elem.querySelectorAll('.points');
            for (let i = 0; i < percent; i++) {
                pointsMarked[i].classList.add('marked');
            }
        });

        const bars = document.querySelectorAll('.bar span');
        bars.forEach(bar => {
            bar.style.width = "0";
            setTimeout(() => {
                bar.style.width = bar.getAttribute("data-width");
            }, 100);
        });
    }
});

//  mix it up portfolio section
var mixer = mixitup('.portfolio-gallery');

//Active Button for portfolio section

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.filter-buttons .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});


// ============================================ SWIPER JS ===================================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});
