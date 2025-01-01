/* Сброс стилей */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Навигационная панель */
header {
  background-color: #2f8f8f; /* Тёмный бирюзовый */
  padding: 15px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .logo h1 {
  color: white;
  font-size: 1.5rem;
}

.navbar-links {
  display: flex;
  align-items: center;
}

.navbar-links form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  color: #fff;
}

select {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #f0f4f8;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #028482; /* Призмариновый */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #017367;
}

/* Стили для основного контента */
.container {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 900px;
  margin: 30px auto;
  flex: 1;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #e0f4f4; /* Светлый бирюзовый */
  color: #028482;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #e9ecef;
}

/* Стиль кнопки "Muallif haqida" */
#author-btn {
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  background-color: #028482;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

#author-btn:hover {
  background-color: #017367;
}

/* Модальные окна */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Адаптивность для мобильных устройств */
@media screen and (max-width: 768px) {
  .navbar-links form {
    flex-direction: column;
    align-items: center;
  }

  .form-group {
    width: 100%;
  }

  .navbar-links button {
    width: 100%;
    margin-top: 15px;
  }

  .container {
    width: 90%;
    margin-top: 15px;
    padding: 20px;
  }

  h2 {
    font-size: 1.5rem;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 10px;
  }
}
