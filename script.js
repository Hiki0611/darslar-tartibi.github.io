document.addEventListener("DOMContentLoaded", function() {
  // Сначала наполняем список групп для выбранного курса
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  
  // Функция для обновления списка групп в зависимости от курса
  function updateGroups(course) {
    let groups = [];
    if (course === "1-course") {
      groups = ["group-1", "group-2", "group-3", "group-4", "group-5", "group-6", "group-7", "group-8", "group-9", "group-10"];
    } else if (course === "2-course") {
      groups = ["group-1", "group-2", "group-3", "group-4", "group-5", "group-6", "group-7", "group-8", "group-9", "group-10"];
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
          noLessonsCell.textContent = "Уроков нет в этот день";
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки расписания:', error);
        alert('Ошибка загрузки расписания. Проверьте, что путь к файлу правильный.');
      });
  });
});

