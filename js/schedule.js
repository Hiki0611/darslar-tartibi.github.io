document.getElementById('showSchedule').addEventListener('click', async () => {
    const course = document.getElementById('courseSelect').value;
    const group = document.getElementById('groupSelect').value;
    const day = document.getElementById('daySelect').value;

    try {
        // Загружаем JSON с расписанием
        const response = await fetch(`subjects/${course}-course_${group}-group.json`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла расписания.');
        }

        const schedule = await response.json();

        // Получаем расписание для выбранного дня
        const daySchedule = schedule.days[day - 1];
        displaySchedule(daySchedule);
    } catch (error) {
        console.error('Ошибка загрузки расписания:', error);
        const table = document.getElementById('scheduleTable');
        table.innerHTML = `<p>Не удалось загрузить расписание. Попробуйте позже.</p>`;
    }
});

function displaySchedule(daySchedule) {
    const table = document.getElementById('scheduleTable');

    // Если уроков нет
    if (!daySchedule || !daySchedule.lessons || daySchedule.lessons.length === 0) {
        table.innerHTML = '<p>На этот день нет уроков.</p>';
        return;
    }

    // Генерация HTML для таблицы
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Время</th>
                    <th>Предмет</th>
                    <th>Преподаватель</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Добавляем строки для каждого урока
    daySchedule.lessons.forEach(lesson => {
        html += `
            <tr>
                <td>${lesson.time}</td>
                <td>${lesson.subject}</td>
                <td>${lesson.teacher}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}
