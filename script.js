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


const scrollContainer = document.getElementById('horizontalScroll');

scrollContainer.addEventListener('wheel', (event) => {
  // Проверяем, что курсор над контейнером
  if (event.target.closest('.gallery-container')) {
    event.preventDefault();
    
    // Настройка скорости скролла (можно регулировать)
    const scrollSpeed = 2;
    scrollContainer.scrollLeft += event.deltaY * scrollSpeed;
  }
});

// Добавляем визуальную обратную связь
scrollContainer.addEventListener('mouseenter', () => {
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousedown', () => {
  scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseup', () => {
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseleave', () => {
  scrollContainer.style.cursor = 'default';
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



