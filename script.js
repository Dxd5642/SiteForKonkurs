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


// Универсальные функции
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  document.body.style.overflow = '';
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
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Проверяем, какая секция сейчас в области видимости
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        // Обновляем активный пункт меню
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === current) {
                item.classList.add('active');
            }
        });
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