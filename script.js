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
        // Проверяем, поддерживает ли устройство горизонтальную прокрутку
        const canScrollHorizontally = 
            scrollContainer.scrollWidth > scrollContainer.clientWidth;
        
        if (canScrollHorizontally && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            // Если вертикального скролла больше - это likely колесо мыши
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY * 2;
        }
        // В противном случае позволяем стандартное поведение (тачпад)
    });
});


function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches && 
           ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

// Универсальные функции
function openModal(modalId) {
    if (!isMobile()){
    const targetSection = document.getElementById('heroes');
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });}
            
            // Обновляем активный пункт меню
            
            const modal = document.getElementById(modalId);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            //  updateActiveMenuItem('heroes');

}



function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');});
  
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
}
// Закрытие по клику на фон
document.querySelector('.modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeAllModals;
  }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


    // Функция для плавной прокрутки к секции по ID

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.nav-menu > div');
    const sections = document.querySelectorAll('section');
    
    // Обработчик клика по пунктам меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Плавная прокрутка к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Убираем активный класс у всех пунктов
                menuItems.forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
                
                // Добавляем активный класс к текущему пункту
                this.classList.add('active');
            }
        });
    });
    
    // Отслеживание скролла для подсветки активного пункта
    // Отслеживание скролла для подсветки активного пункта
   // Замените обработчик скролла на этот код
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // 50% видимости секции
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

// Наблюдаем за всеми секциями
sections.forEach(section => {
    observer.observe(section);
});

    
    // Плавная прокрутка для якорных ссылок
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
        
        // Позиция нижней границы меню относительно верха целевого div
        const menuBottomInTarget = scrollPosition + headerHeight - targetTop;
        
        // Первые 25% дива - полностью прозрачный (opacity = 0)
        // Следующие 75% - плавно становится непрозрачным (opacity от 0 до 1)
        let opacity = 0;
        
        if (menuBottomInTarget > targetHeight * 0.25) {
            // Вычисляем прогресс после первых 25%
            const progress = (menuBottomInTarget - targetHeight * 0.25) / (targetHeight * 0.75);
            opacity = Math.max(0, Math.min(1, progress)); // Ограничиваем от 0 до 1
        }
        
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        // header.style.backdropFilter = `blur(${5 * (1 - opacity)}px)`;
    });
});



// ----------------------------------------------------------------------------------

window.addEventListener('scroll', function() {
    const backgroundImg = document.getElementById('background_img');
    const scrolled = window.pageYOffset;
    
    // Двигаем фон медленнее, чем основной контент
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
            
            // Элемент виден если его верхняя часть выше низа экрана 
            // и нижняя часть ниже верха экрана
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
    checkScroll(); // Проверить при загрузке
});