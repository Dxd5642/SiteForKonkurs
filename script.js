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


document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.nav-menu > div');
    const sections = document.querySelectorAll('section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
        sections.forEach(section => {
        observer.observe(section);
    });
    }

else{//Для мобилок
(() => {
    const menuItems = document.querySelectorAll('.nav-menu > div[data-target]');
    if (!menuItems.length) return;
    document.querySelectorAll('.nav-menu > div[data-target]').forEach(mi => mi.classList.remove('active'));
    const sections = Array.from(menuItems)
    .map(it => document.getElementById(it.dataset.target))
    .filter(Boolean);
    const header = document.querySelector('.header');
    const THRESHOLD = 0.1;
    const getHeaderOffset = () => (header ? header.offsetHeight : 0);
    let ticking = false;
    function updateActive() {
        ticking = false;
        const vh = window.innerHeight;
        const topViewport = getHeaderOffset(); 
        const bottomViewport = vh;
        let best = { id: null, ratio: 0 };
        for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, topViewport);
        const visibleBottom = Math.min(rect.bottom, bottomViewport);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight <= 0 || rect.height <= 0) continue;
        const ratio = visibleHeight / rect.height;
        if (ratio > best.ratio) {
            best = { id: s.id, ratio };
        }
        }
        if (best.id && best.ratio >= THRESHOLD) {
            menuItems.forEach(mi => mi.classList.remove('active'));
            menuItems.forEach(mi => mi.classList.toggle('active', mi.dataset.target === best.id));
        } else {
            menuItems.forEach(mi => mi.classList.remove('active'));
        }
    }
    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateActive);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActive();
    menuItems.forEach(mi => {
        mi.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(mi.dataset.target);
        if (!target) return;
        const headerOffset = getHeaderOffset();
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        });
    });
})();
}



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



window.addEventListener('scroll', function() {
    const backgroundImg = document.getElementById('background_img');
    const scrolled = window.pageYOffset;
    backgroundImg.style.transform = `translateY(${scrolled * -0.2}px)`;
});


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


function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  });
}




const ANIM_DURATION = 300;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (!isMobile()){
    const targetSection = document.getElementById('heroes');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');

  modal.classList.remove('closing');
  modal.classList.add('active', 'opening');

  clearTimeout(modal._openTimeout);
  modal._openTimeout = setTimeout(() => {
    modal.classList.remove('opening');
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }, ANIM_DURATION);
  
  modal.addEventListener('click', overlayClickHandler);
  document.addEventListener('keydown', escHandler);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('opening');
  modal.classList.add('closing');
  modal.classList.remove('active'); 

  clearTimeout(modal._closeTimeout);
  modal._closeTimeout = setTimeout(() => {
    modal.classList.remove('closing');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
    modal.removeEventListener('click', overlayClickHandler);
    document.removeEventListener('keydown', escHandler);
  }, ANIM_DURATION);
}

function overlayClickHandler(e){
  const overlay = e.currentTarget;
  const content = overlay.querySelector('.modal-content');
  if (!content) return;
  if (!content.contains(e.target)) {
    const id = overlay.id;
    closeModal(id);
  }
}

function escHandler(e){
  if (e.key === 'Escape' || e.key === 'Esc') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      closeModal(m.id);
    });
  }
}
