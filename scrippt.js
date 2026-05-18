document.addEventListener('DOMContentLoaded', () => {
  // Массив фильмов
  const initialMovies = [
    {
      title: 'Дюна: Часть вторая',
      year: 2024,
      img: './images/image1.png',
      link: 'https://www.kinopoisk.ru/film/1298744/'
    },
    {
      title: 'Оппенгеймер',
      year: 2023,
      img: './images/image2.png',
      link: 'https://www.kinopoisk.ru/film/4664634/'
    },
    {
      title: 'Трансформеры',
      year: 2007,
      img: './images/image3.png',
      link: 'https://www.kinopoisk.ru/film/81288/'
    },
    {
      title: 'Убийцы цветочной луны',
      year: 2023,
      img: './images/image4.png',
      link: 'https://www.kinopoisk.ru/film/1188529/'
    },
    {
      title: 'Джон Уик 4',
      year: 2023,
      img: './images/image6.png',
      link: 'https://www.kinopoisk.ru/film/1267348/'
    },
  ];

  const additionalMovies = [
    {
      title: 'Аватар: Путь воды',
      year: 2022,
      img: './images/image5.png',
      link: 'https://www.kinopoisk.ru/film/843649/'
    },
    {
      title: 'Бамблби',
      year: 2018,
      img: './images/image7.png',
      link: 'https://www.kinopoisk.ru/film/952241/'
    },
    {
      title: 'Топ Ган: Мэверик',
      year: 2022,
      img: './images/image8.png',
      link: 'https://www.kinopoisk.ru/film/572032/'
    },
    {
      title: 'Кот в сапогах 2',
      year: 2022,
      img: './images/image9.png',
      link: 'https://www.kinopoisk.ru/film/840883/'
    },
  ];

  let currentMovies = [...initialMovies];
  let loadMoreUsed = false;

  const movieGrid = document.getElementById('movie-grid');
  const loadMoreBtn = document.getElementById('load-more');

  function renderMovies(movies) {
    movieGrid.innerHTML = movies.map(movie => `
      <a href="${movie.link}" target="_blank" class="movie-card" rel="noopener noreferrer">
        <img class="movie-card__img" src="${movie.img}" alt="${movie.title}" loading="lazy">
        <div class="movie-card__info">
          <h3 class="movie-card__title">${movie.title}</h3>
          <p class="movie-card__year">${movie.year}</p>
        </div>
      </a>
    `).join('');
  }

  // Загрузка начальных карточек
  renderMovies(currentMovies);

  // "Показать еще"
  loadMoreBtn.addEventListener('click', () => {
    if (!loadMoreUsed) {
      currentMovies = [...currentMovies, ...additionalMovies];
      renderMovies(currentMovies);
      loadMoreBtn.textContent = 'Все фильмы загружены';
      loadMoreBtn.disabled = true;
      loadMoreUsed = true;
    }
  });

  // Переключение темы с сохранением
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Валидация и отправка формы
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function showError(input, message) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    errorSpan.textContent = message;
  }

  function clearError(input) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    errorSpan.textContent = '';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Имя должно содержать минимум 2 символа');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Введите корректный email');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Сообщение должно быть не менее 10 символов');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };
      console.log('Данные формы:', formData);
      alert('Спасибо! Ваше сообщение отправлено (данные в консоли).');
      form.reset();
    }
  });
});