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

  // Обработчик для кнопки "Показать расписание"
  document.getElementById('show-schedule').addEventListener('click', function() {
    const course = courseSelect.value;
    const group = groupSelect.value;
    const day = document.getElementById('day').value;

    // Загружаем JSON файл с расписанием
    fetch(`courses/${course}/${group}.json`)
      .then(response => response.json())
      .then(data => {
        // Обрабатываем расписание для выбранного дня
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
