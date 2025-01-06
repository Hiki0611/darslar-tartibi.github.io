// Загрузка новостей
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const data = await response.json();
        
        if (!data.news || data.news.length === 0) {
            displayEmptyNews();
            return;
        }
        
        displayNews(data.news);
    } catch (error) {
        console.error('Error loading news:', error);
        displayEmptyNews();
    }
}

function displayEmptyNews() {
    const newsContainer = document.getElementById('newsList');
    newsContainer.innerHTML = `
        <div class="empty-message">
            <p>Новости пока не добавлены.</p>
            <p>Загляните позже!</p>
        </div>
    `;
}

function displayNews(news) {
    const newsContainer = document.getElementById('newsList');
    let html = '';

    news.forEach(item => {
        html += `
            <div class="news-item">
                <img src="${item.image}" alt="${item.title}" class="news-image">
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <p class="news-date">${new Date(item.date).toLocaleDateString()}</p>
                    <p>${item.content}</p>
                </div>
            </div>
        `;
    });

    newsContainer.innerHTML = html;
}

// Загружаем новости при открытии страницы новостей
document.querySelector('button[data-page="news"]').addEventListener('click', loadNews);