// Загрузка списка учебников
async function loadBooks() {
    try {
        const response = await fetch('data/books.json');
        const data = await response.json();
        
        if (!data.books || data.books.length === 0) {
            displayEmptyBooks();
            return;
        }
        
        displayBooks(data.books);
    } catch (error) {
        console.error('Error loading books:', error);
        displayEmptyBooks();
    }
}

function displayEmptyBooks() {
    const booksContainer = document.getElementById('booksList');
    booksContainer.innerHTML = `
        <div class="empty-message">
            <p>Учебные материалы пока не загружены.</p>
            <p>Пожалуйста, проверьте позже.</p>
        </div>
    `;
}

function displayBooks(books) {
    const booksContainer = document.getElementById('booksList');
    const booksByCategory = groupBooksByCategory(books);
    let html = '';

    for (const [category, categoryBooks] of Object.entries(booksByCategory)) {
        html += `
            <div class="book-category">
                <h3>${category}</h3>
                <div class="book-grid">
                    ${categoryBooks.map(book => createBookCard(book)).join('')}
                </div>
            </div>
        `;
    }

    booksContainer.innerHTML = html;
    setupDownloadHandlers();
}

function groupBooksByCategory(books) {
    return books.reduce((acc, book) => {
        if (!acc[book.category]) {
            acc[book.category] = [];
        }
        acc[book.category].push(book);
        return acc;
    }, {});
}

function createBookCard(book) {
    return `
        <div class="book-item">
            <h4>${book.title}</h4>
            <p>Kitob muallifi: ${book.author}</p>
            <p>Qaysi kurs uchun: ${book.course}</p>
            <a href="${book.file}" class="book-download" target="_blank">
                Yuklab olish
            </a>
        </div>
    `;
}


function setupDownloadHandlers() {
    document.querySelectorAll('.book-download').forEach(button => {
        button.addEventListener('click', async (e) => {
            const fileUrl = e.target.dataset.file;
            try {
                const response = await fetch(fileUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileUrl.split('/').pop();
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            } catch (error) {
                console.error('Error downloading file:', error);
                alert('Ошибка при скачивании файла');
            }
        });
    });
}

// Загружаем книги при открытии страницы учебников
document.querySelector('button[data-page="books"]').addEventListener('click', loadBooks);
