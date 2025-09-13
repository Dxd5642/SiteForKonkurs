function getCorrectForm(number, forms) {
            if (number % 10 === 1 && number % 100 !== 11) {
                return forms[0];
            } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                return forms[1];
            } else {
                return forms[2];
            }
        }
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearDate = new Date(`May 09, 2026 00:00:00`);
    const difference = newYearDate - now;
            
    if (difference <= 0) {
        document.querySelector(".frag_1_reverse_time_div_time_text_days").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_hours").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_minuts").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_secs").textContent = '0';
        return;
    }
            
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
    document.querySelector(".frag_1_reverse_time_div_time_text_days").textContent = days;
    document.querySelector(".frag_1_reverse_time_div_time_text_hours").textContent = hours < 10 ? '0' + hours : hours;
    document.querySelector(".frag_1_reverse_time_div_time_text_minuts").textContent = minutes < 10 ? '0' + minutes : minutes;
    document.querySelector(".frag_1_reverse_time_div_time_text_secs").textContent = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('frag_1_reverse_time_div_time_text_down_d').textContent = getCorrectForm(days, ['день', 'дня', 'дней']);
            document.getElementById('frag_1_reverse_time_div_time_text_down_h').textContent = getCorrectForm(hours, ['час', 'часа', 'часов']);
            document.getElementById('frag_1_reverse_time_div_time_text_down_m').textContent = getCorrectForm(minutes, ['минута', 'минуты', 'минут']);
            document.getElementById('frag_1_reverse_time_div_time_text_down_s').textContent = getCorrectForm(seconds, ['секунда', 'секунды', 'секунд']);
}     
updateCountdown();
setInterval(updateCountdown, 1000);


document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('horizontalScroll');
    if (!scrollContainer) return;
    scrollContainer.addEventListener('wheel', (event) => {
        const canScrollHorizontally = 
            scrollContainer.scrollWidth > scrollContainer.clientWidth;
        if (canScrollHorizontally && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY * 2;
        }
    });
});


function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches && 
           ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

function openModal(modalId) {
    if (!isMobile()){
        const targetSection = document.getElementById('heroes');
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    ;}            
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
}


function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');});
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  });
}

document.querySelector('.modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeAllModals;
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.nav-menu > div');
    const sections = document.querySelectorAll('section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                menuItems.forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
                
                this.classList.add('active');
            }
        });
    });
    
if(!isMobile()){//Для пк
    const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const current = entry.target.getAttribute('id');
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-target') === current) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
}
else{//Для мобилок
    const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const current = entry.target.getAttribute('id');
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-target') === current) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
}

sections.forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
        });
        }
    });
});
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const targetDiv = document.getElementById('special-section');
    
    window.addEventListener('scroll', function() {
        const targetTop = targetDiv.offsetTop;
        const targetHeight = targetDiv.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        const menuBottomInTarget = scrollPosition + headerHeight - targetTop;
        
        let opacity = 0;
        
        if (menuBottomInTarget > targetHeight * 0.25) {
            const progress = (menuBottomInTarget - targetHeight * 0.25) / (targetHeight * 0.75);
            opacity = Math.max(0, Math.min(1, progress));
        }
        
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    });
});



// ----------------------------------------------------------------------------------

window.addEventListener('scroll', function() {
    const backgroundImg = document.getElementById('background_img');
    const scrolled = window.pageYOffset;
    
    backgroundImg.style.transform = `translateY(${scrolled * -0.2}px)`;
});


// ---------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;
            
            const isVisible = elementTop < window.innerHeight && elementBottom > 40;
            
            if (isVisible) {
                element.classList.add('animate-in');
                element.classList.remove('animate-out');
            } else {
                element.classList.add('animate-out');
                element.classList.remove('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});