// Проверка первого посещения
function checkFirstVisit() {
    if (!localStorage.getItem('visitedBefore')) {
        showWelcomeModal();
        localStorage.setItem('visitedBefore', 'true');
    }
}

function showWelcomeModal() {
    const modal = document.createElement('div');
    modal.className = 'welcome-modal';
    modal.innerHTML = `
        <div class="welcome-content">
            <h2>Добро пожаловать!</h2>
            <p>Добро пожаловать на сайт нашего колледжа.</p>
            <p>Здесь вы найдете:</p>
            <ul>
                <li>Расписание занятий</li>
                <li>Новости колледжа</li>
                <li>Учебные материалы</li>
            </ul>
            <button onclick="closeWelcomeModal(this)">Начать работу</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeWelcomeModal(button) {
    button.closest('.welcome-modal').remove();
}

// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', checkFirstVisit);