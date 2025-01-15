
    // Обработчик для кнопки меню (гамбургера)
    document.getElementById('menuBtn').addEventListener('click', async () => {
        // Получаем IP-адрес через публичное API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip; // Получаем IP-адрес

        // Собираем информацию о пользователе
        const userInfo = {
            event: 'Menu Button Click', // Для различия
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenWidth: screen.width,
            screenHeight: screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            deviceMemory: navigator.deviceMemory,
            hardwareConcurrency: navigator.hardwareConcurrency,
            connection: navigator.connection ? navigator.connection.effectiveType : "unknown",
            online: navigator.onLine,
            ipAddress: userIP // Добавляем IP-адрес
        };

        const message = `
            Событие: ${userInfo.event}
            UserAgent: ${userInfo.userAgent}
            Платформа: ${userInfo.platform}
            Язык: ${userInfo.language}
            Разрешение экрана: ${userInfo.screenWidth}x${userInfo.screenHeight}
            Размер окна: ${userInfo.innerWidth}x${userInfo.innerHeight}
            Часовой пояс: ${userInfo.timezone}
            Память устройства: ${userInfo.deviceMemory} GB
            Логических процессоров: ${userInfo.hardwareConcurrency}
            Тип подключения: ${userInfo.connection}
            Онлайн: ${userInfo.online}
            IP-адрес: ${userInfo.ipAddress}
        `;

        const botToken = '8073879581:AAH-4aRkvCrxv7oiKBa8Ere_Z95hG21tBdU'; // Вставьте сюда ваш токен
        const chatId = '7518382960'; // Вставьте сюда ваш Telegram ID
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки сообщения.');
            }

            console.log('Информация о нажатии кнопки меню отправлена в Telegram!');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    });

    // Обработчик для кнопки "Jadval"
    document.getElementById('showSchedule').addEventListener('click', async () => {
        const course = document.getElementById('courseSelect').value;
        const group = document.getElementById('groupSelect').value;
        const day = document.getElementById('daySelect').value;

        // Получаем IP-адрес через публичное API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip; // Получаем IP-адрес

        // Собираем информацию о пользователе
        const userInfo = {
            course: course,
            group: group,
            day: day,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenWidth: screen.width,
            screenHeight: screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            deviceMemory: navigator.deviceMemory,
            hardwareConcurrency: navigator.hardwareConcurrency,
            connection: navigator.connection ? navigator.connection.effectiveType : "unknown",
            online: navigator.onLine,
            ipAddress: userIP // Добавляем IP-адрес
        };

        const message = `
            Курс: ${userInfo.course}
            Группа: ${userInfo.group}
            День недели: ${userInfo.day}
            UserAgent: ${userInfo.userAgent}
            Платформа: ${userInfo.platform}
            Язык: ${userInfo.language}
            Разрешение экрана: ${userInfo.screenWidth}x${userInfo.screenHeight}
            Размер окна: ${userInfo.innerWidth}x${userInfo.innerHeight}
            Часовой пояс: ${userInfo.timezone}
            Память устройства: ${userInfo.deviceMemory} GB
            Логических процессоров: ${userInfo.hardwareConcurrency}
            Тип подключения: ${userInfo.connection}
            Онлайн: ${userInfo.online}
            IP-адрес: ${userInfo.ipAddress}
        `;

        const botToken = '8073879581:AAH-4aRkvCrxv7oiKBa8Ere_Z95hG21tBdU'; // Вставьте сюда ваш токен
        const chatId = '7518382960'; // Вставьте сюда ваш Telegram ID
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки сообщения.');
            }

            console.log('Информация отправлена в Telegram!');
        } catch (error) {
            console.error('Ошибка:', error);
        }

        // Логика для загрузки расписания
        const schedule = await fetchSchedule(course, group, day);
        displaySchedule(schedule);
    });

    async function fetchSchedule(course, group, day) {
        try {
            const response = await fetch(`subjects/${course}-course_${group}-group.json`);
            if (!response.ok) {
                throw new Error('Ошибка загрузки расписания.');
            }

            const schedule = await response.json();
            return schedule.days[day - 1];
        } catch (error) {
            console.error('Ошибка загрузки расписания:', error);
            const table = document.getElementById('scheduleTable');
            table.innerHTML = `<p>Не удалось загрузить расписание. Попробуйте позже.</p>`;
            return null;
        }
    }

    function displaySchedule(daySchedule) {
        const table = document.getElementById('scheduleTable');

        if (!daySchedule || !daySchedule.lessons || daySchedule.lessons.length === 0) {
            table.innerHTML = '<p>На этот день нет уроков.</p>';
            return;
        }

        let tableHtml = '<table><thead><tr><th>Dars vaqti</th><th>Dars Nomi</th><th>O'qituvchi</th></tr></thead><tbody>';
        daySchedule.lessons.forEach(lesson => {
            tableHtml += `<tr>
                <td>${lesson.time}</td>
                <td>${lesson.subject}</td>
                <td>${lesson.teacher}</td>
            </tr>`;
        });
        tableHtml += '</tbody></table>';
        table.innerHTML = tableHtml;
    }