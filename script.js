document.addEventListener("DOMContentLoaded", function() {
  // Получаем элементы
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  const showScheduleButton = document.getElementById('show-schedule');
  const authorModal = document.getElementById('author-modal');
  const contactModal = document.getElementById('contact-modal');
  const authorBtn = document.getElementById('author-btn');
  const contactBtn = document.getElementById('send-message');
  const closeAuthorModal = document.getElementById('close-btn');
  const closeContactModal = document.getElementById('contact-close-btn');

  // Функция для обновления списка групп в зависимости от курса
  function updateGroups(course) {
    let groups = [];
    if (course === "1-course") {
      groups = ["1--24", "2--24", "3--24", "4--24", "5--24", "6--24"];
    } else if (course === "2-course") {
      groups = ["1--23", "2--23", "3--23", "4--23", "5--23"];
    }

    groupSelect.innerHTML = "";
    groups.forEach(group => {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group.replace("--", " ");
      groupSelect.appendChild(option);
    });
  }

  // Обработчик для кнопки "Jadvalni ko'rsatish"
  showScheduleButton.addEventListener('click', function() {
    const course = courseSelect.value;
    const group = groupSelect.value;
    const day = document.getElementById('day').value;

    fetch(`courses/${course}/${group}.json`)
      .then(response => response.json())
      .then(data => {
        const schedule = data[day];
        const tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = "";

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
        console.error('Error:', error);
        alert('Xatolik yuz berdi.');
      });
  });

  // Открытие модального окна "Muallif haqida"
  authorBtn.addEventListener('click', function() {
    authorModal.style.display = "block";
  });

  // Закрытие модального окна "Muallif haqida"
  closeAuthorModal.addEventListener('click', function() {
    authorModal.style.display = "none";
  });

  // Закрытие модального окна при клике вне окна
  window.addEventListener('click', function(event) {
    if (event.target === authorModal) {
      authorModal.style.display = "none";
    }
  });

  // Открытие модального окна "Muallif-ga yozish"
  contactBtn.addEventListener('click', function() {
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const telegram = document.getElementById('contact-telegram').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !phone || !telegram || !message) {
      alert('Iltimos, barcha maydonlarni to\'ldiring!');
      return;
    }

    const messageText = `Yangi xabar muallifga:\nIsm: ${name}\nTelefon: ${phone}\nTelegram: ${telegram}\nXabar: ${message}`;

    fetch('https://api.telegram.org/bot<YOUR_BOT_API_KEY>/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '<YOUR_CHAT_ID>',
        text: messageText,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent:', data);
        alert('Xabar yuborildi!');
        contactModal.style.display = "none";
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  });

  // Закрытие модального окна "Muallif-ga yozish"
  closeContactModal.addEventListener('click', function() {
    contactModal.style.display = "none";
  });

  // Закрытие модального окна при клике вне окна
  window.addEventListener('click', function(event) {
    if (event.target === contactModal) {
      contactModal.style.display = "none";
    }
  });

  // Инициализация списка групп при загрузке
  updateGroups(courseSelect.value);
  courseSelect.addEventListener('change', function() {
    updateGroups(courseSelect.value);
  });
});
