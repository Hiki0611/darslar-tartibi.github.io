document.addEventListener('DOMContentLoaded', function() {
  // Работа с выбором группы
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  const showScheduleBtn = document.getElementById('show-schedule');

  const groups = {
    '1-course': ['1-24', '2-24', '3-24', '4-24', '6-24', '7-24', '8-24', '9-24'],
    '2-course': ['1-23', '2-23', '3-23', '4-23', '5-23', '6-23', '7-23', '8-23', '9-23']
  };

  // Обработчик изменения курса
  courseSelect.addEventListener('change', function() {
    const selectedCourse = courseSelect.value;
    groupSelect.innerHTML = '';  // Сбросить текущие опции
    groups[selectedCourse].forEach(function(group) {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      groupSelect.appendChild(option);
    });
  });

  // Отображение расписания
  showScheduleBtn.addEventListener('click', function() {
    const selectedGroup = groupSelect.value;
    const selectedDay = document.getElementById('day').value;

    const scheduleTable = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
    scheduleTable.innerHTML = ''; // Очистка текущей таблицы

    // Пример расписания
    const scheduleData = {
      '1-24': {
        'Monday': [['Matematika', '9:00-10:30'], ['Informatika', '10:45-12:15']],
        'Tuesday': [['Kimyo', '9:00-10:30'], ['Biologiya', '10:45-12:15']],
      },
      '2-24': {
        'Monday': [['Fizika', '9:00-10:30'], ['Matematika', '10:45-12:15']],
        'Tuesday': [['Informatika', '9:00-10:30'], ['Kimyo', '10:45-12:15']],
      },
      '1-23': {
        'Monday': [['Informatika', '9:00-10:30'], ['Fizika', '10:45-12:15']],
        'Tuesday': [['Biologiya', '9:00-10:30'], ['Matematika', '10:45-12:15']],
      }
    };

    const selectedSchedule = scheduleData[selectedGroup] ? scheduleData[selectedGroup][selectedDay] : [];

    selectedSchedule.forEach(function(session) {
      const row = scheduleTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell1.textContent = session[0];
      cell2.textContent = session[1];
    });
  });

  // Открытие и закрытие модального окна "Muallif haqida"
  const authorBtn = document.getElementById('author-btn');
  const authorModal = document.getElementById('author-modal');
  const closeBtn = document.getElementById('close-btn');

  authorBtn.addEventListener('click', function() {
    authorModal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    authorModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === authorModal) {
      authorModal.style.display = 'none';
    }
  });

  // Открытие и закрытие модального окна "Muallif-ga yozish"
  const contactBtn = document.getElementById('contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const closeContactBtn = document.getElementById('close-contact-btn');

  contactBtn.addEventListener('click', function() {
    contactModal.style.display = 'block';
  });

  closeContactBtn.addEventListener('click', function() {
    contactModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });

  // Обработчик отправки сообщения через Telegram бота
  const sendMessageBtn = document.getElementById('send-message-btn');

  sendMessageBtn.addEventListener('click', function() {
    const name = document.getElementById('author-name').value.trim();
    const phone = document.getElementById('author-phone').value.trim();
    const telegram = document.getElementById('author-telegram').value.trim();
    const message = document.getElementById('author-message').value.trim();

    // Проверка на обязательные поля
    if (name && phone && telegram && message) {
      // Формирование сообщения для отправки в Telegram
      const telegramMessage = `
        Yangi xabar:
        Ism: ${name}
        Telefon: ${phone}
        Telegram: ${telegram}
        Xabar: ${message}
      `;

      // URL для отправки сообщения через Telegram бота
      const botToken = 'YOUR_BOT_TOKEN';
      const chatId = 'YOUR_CHAT_ID';
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(telegramMessage)}`;

      // Отправка запроса к Telegram API
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            alert('Xabar muvaffaqiyatli yuborildi!');
            contactModal.style.display = 'none'; // Закрыть модальное окно после отправки
          } else {
            alert('Xabar yuborishda xatolik yuz berdi.');
          }
        })
        .catch(error => {
          console.error('Xatolik:', error);
          alert('Xabar yuborishda xatolik yuz berdi.');
        });
    } else {
      alert('Iltimos, barcha maydonlarni to\'ldiring.');
    }
  });
});
