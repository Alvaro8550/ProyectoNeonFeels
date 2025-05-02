const movies = [
    {
        title: "Blade Runner 2049",
        year: 2017,
        genre: "Ciencia Ficción",
        director: "Denis Villeneuve",
        actors: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
        duration: 164,
        country: "USA",
        releaseDate: "2017-10-06",
        releaseType: "cine",
        rating: 8.0,
        views: 1500
    },
    {
        title: "Drive",
        year: 2011,
        genre: "Acción",
        director: "Nicolas Winding Refn",
        actors: ["Ryan Gosling", "Carey Mulligan", "Bryan Cranston"],
        duration: 100,
        country: "USA",
        releaseDate: "2011-09-16",
        releaseType: "cine",
        rating: 7.8,
        views: 1200
    },
    {
        title: "The Neon Demon",
        year: 2016,
        genre: "Terror",
        director: "Nicolas Winding Refn",
        actors: ["Elle Fanning", "Jena Malone", "Bella Heathcote"],
        duration: 117,
        country: "USA",
        releaseDate: "2016-06-24",
        releaseType: "plataforma",
        rating: 7.0,
        views: 900
    },
    {
        title: "Tru: Legacy",
        year: 2010,
        genre: "Acción",
        director: "Joseph Kosinski",
        actors: ["Chris Hemsworth", "Miles Teller", "Olivia Wilde"],
        duration: 125,
        country: "USA",
        releaseDate: "2010-12-17",
        releaseType: "cine",
        rating: 7.5,
        views: 1100
    },
    {
        title: "Inception",
        year: 2010,
        genre: "Ciencia Ficción",
        director: "Christopher Nolan",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        duration: 148,
        country: "USA",
        releaseDate: "2010-07-16",
        releaseType: "cine",
        rating: 8.8,
        views: 2000
    },
    {
        title: "Interstellar",
        year: 2014,
        genre: "Ciencia Ficción",
        director: "Christopher Nolan",
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        duration: 169,
        country: "USA",
        releaseDate: "2014-11-07",
        releaseType: "cine",
        rating: 8.6,
        views: 1800
    },
    {
        title: "Parasite",
        year: 2019,
        genre: "Suspenso",
        director: "Bong Joon-ho",
        actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
        duration: 132,
        country: "South Korea",
        releaseDate: "2019-05-30",
        releaseType: "cine",
        rating: 8.6,
        views: 1700
    },
    {
        title: "The Witcher",
        year: 2019,
        genre: "Fantasía",
        director: "Alik Sakharov",
        actors: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
        duration: 60,
        country: "USA",
        releaseDate: "2019-12-20",
        releaseType: "plataforma",
        rating: 8.2,
        views: 1600
    }
];

// Función para mostrar recomendaciones personalizadas (mejorada)
function displayRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations-list');
    recommendationsContainer.innerHTML = '';

    // Obtener historial y preferencias del usuario desde localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    const dislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies')) || [];

    // Filtrar películas no vistas y no descartadas
    let recommended = movies.filter(movie => {
        return !historial.some(h => h.title === movie.title) &&
               !dislikedMovies.includes(movie.title);
    });

    // Si no hay recomendaciones (por ejemplo, historial vacío), mostrar top 5 por rating y vistas
    if (recommended.length === 0) {
        recommended = movies
            .filter(movie => movie.rating >= 7.0)
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
    }

    // Etiquetar como personalizado y mostrar recomendaciones variadas
    recommended.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'glitch');
        let imageSrc = `https://via.placeholder.com/400x600/9d00ff/ffffff?text=${movie.title}`;
        let imageClass = "movie-poster";
        if (movie.title === "Blade Runner 2049") {
            imageSrc = "Imagenes/PELICULA1.png";
            imageClass += " spaced-movie-poster";
        } else if (movie.title === "Drive") {
            imageSrc = "Imagenes/PELICULA2.png";
            imageClass += " spaced-movie-poster";
        } else if (movie.title === "The Neon Demon") {
            imageSrc = "Imagenes/PELICULA3.png";
            imageClass += " spaced-movie-poster";
        } else if (movie.title === "Tru: Legacy") {
            imageSrc = "Imagenes/PELICULA4.png";
            imageClass += " spaced-movie-poster";
        }
        movieCard.innerHTML = `
            <img src="${imageSrc}" alt="${movie.title}" class="${imageClass}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title} <span class="tag">Personalizado</span></h3>
                <p class="movie-year">${movie.year}</p>
                <p class="movie-genre">Género: ${movie.genre}</p>
                <p class="movie-director">Director: ${movie.director}</p>
                <p class="movie-duration">Duración: ${movie.duration} min</p>
                <p class="movie-country">País: ${movie.country}</p>
                <div class="recommendation-actions">
                    <button class="like-button" data-title="${movie.title}">Me gusta</button>
                    <button class="dislike-button" data-title="${movie.title}">No me interesa</button>
                </div>
            </div>
        `;
        recommendationsContainer.appendChild(movieCard);
    });

    // Añadir eventos a botones
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            addToLiked(title);
            displayRecommendations();
    });
});

// Modal elements
const modal = document.getElementById('movie-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalGenre = document.getElementById('modal-genre');
const modalDirector = document.getElementById('modal-director');
const modalDuration = document.getElementById('modal-duration');
const modalCountry = document.getElementById('modal-country');
const modalReleaseDate = document.getElementById('modal-releaseDate');
const modalRating = document.getElementById('modal-rating');

function showMovieModal(movie) {
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalGenre.textContent = movie.genre;
    modalDirector.textContent = movie.director;
    modalDuration.textContent = movie.duration;
    modalCountry.textContent = movie.country;
    modalReleaseDate.textContent = movie.releaseDate;
    modalRating.textContent = movie.rating;
    modal.style.display = 'block';
}

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

    document.querySelectorAll('.dislike-button').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            addToDisliked(title);
            displayRecommendations();
        });
    });
}

function addToLiked(title) {
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    if (!likedMovies.includes(title)) {
        likedMovies.push(title);
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }
}

function addToDisliked(title) {
    let dislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies')) || [];
    if (!dislikedMovies.includes(title)) {
        dislikedMovies.push(title);
        localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const filterButton = document.getElementById('filter-button');
    const clearFiltersButton = document.getElementById('clear-filters-button');
    const movieContainer = document.querySelector('.movie-grid');
    const searchInput = document.querySelector('.search-bar input');

    // Function to display movies
    function displayMovies(moviesToDisplay) {
        movieContainer.innerHTML = '';
        moviesToDisplay.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            let imageSrc = `https://via.placeholder.com/160x220/9d00ff/ffffff?text=${encodeURIComponent(movie.title)}`;
            if (movie.title === "Blade Runner 2049") {
                imageSrc = "Imagenes/PELICULA1.png";
            } else if (movie.title === "Drive") {
                imageSrc = "Imagenes/PELICULA2.png";
            } else if (movie.title === "The Neon Demon") {
                imageSrc = "Imagenes/PELICULA3.png";
            } else if (movie.title === "Tru: Legacy") {
                imageSrc = "Imagenes/PELICULA4.png";
            }
            movieCard.innerHTML = `
                <img src="${imageSrc}" alt="${movie.title}" class="movie-poster" style="cursor:pointer;">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre}</p>
                    <div class="rating">
                        <i>⭐</i> ${movie.rating}
                    </div>
                </div>
            `;
            movieContainer.appendChild(movieCard);

            // Add click event to show modal with movie details
            movieCard.querySelector('img').addEventListener('click', () => {
                showMovieModal(movie);
            });
        });
    }

    // Function to filter movies based on selected criteria
    function filterMovies() {
        const genre = document.getElementById('genre-filter').value;
        const year = document.getElementById('year-filter').value;
        const rating = parseFloat(document.getElementById('rating-filter').value);
        const searchQuery = searchInput.value.trim().toLowerCase();

        const filteredMovies = movies.filter(movie => {
            // Filter by genre
            const genreMatch = (genre === "All") || (movie.genre === genre);
            // Filter by year range
            let yearMatch = true;
            if (year === "2020-2023") {
                yearMatch = movie.year >= 2020 && movie.year <= 2023;
            } else if (year === "2010-2019") {
                yearMatch = movie.year >= 2010 && movie.year <= 2019;
            } else if (year === "Before 2010") {
                yearMatch = movie.year < 2010;
            } else if (year === "2024" || year === "2025") {
                yearMatch = movie.year == parseInt(year);
            } else if (year === "") {
                yearMatch = true;
            } else {
                yearMatch = true;
            }
            // Filter by rating
            const ratingMatch = movie.rating >= rating;

            // Filter by search query (title, director, actors)
            const searchMatch = searchQuery === "" || 
                movie.title.toLowerCase().includes(searchQuery) ||
                movie.director.toLowerCase().includes(searchQuery) ||
                movie.actors.some(actor => actor.toLowerCase().includes(searchQuery));

            return genreMatch && yearMatch && ratingMatch && searchMatch;
        });

        displayMovies(filteredMovies);
    }

    // Clear filters and show all movies
    function clearFilters() {
        filterForm.reset();
        displayMovies(movies);
    }

    // Event listeners
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterMovies();
    });

    clearFiltersButton.addEventListener('click', (e) => {
        e.preventDefault();
        clearFilters();
    });

    // Add event listener for search input
    searchInput.addEventListener('input', () => {
        filterMovies();
    });

    // Initial display of all movies
    displayMovies(movies);
});

document.addEventListener('DOMContentLoaded', () => {
    // Añadir cursor pointer a los elementos "see-all"
    document.querySelectorAll('.see-all').forEach(element => {
      element.style.cursor = 'pointer';
      element.addEventListener('click', () => {
        // Mostrar todas las películas en el contenedor principal
        const movieContainer = document.querySelector('.movie-grid');
        movieContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas películas
  
        movies.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
  
          // URL por defecto para la imagen
          let imageSrc = `https://via.placeholder.com/160x220/9d00ff/ffffff?text=${encodeURIComponent(movie.title)}`;
  
          // Cambiar la imagen si el título de la película coincide con alguno de los casos
          if (movie.title === "Blade Runner 2049") {
            imageSrc = "Imagenes/PELICULA1.png";
          } else if (movie.title === "Drive") {
            imageSrc = "Imagenes/PELICULA2.png";
          } else if (movie.title === "The Neon Demon") {
            imageSrc = "Imagenes/PELICULA3.png";
          } else if (movie.title === "Tru: Legacy") {
            imageSrc = "Imagenes/PELICULA4.png";
          }
  
          // Crear la estructura HTML de la tarjeta de película
          movieCard.innerHTML = `
            <img src="${imageSrc}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.genre}</p>
              <div class="rating">
                <i>⭐</i> ${movie.rating}
              </div>
            </div>
          `;
  
          // Agregar la tarjeta de la película al contenedor
          movieContainer.appendChild(movieCard);
        });
      });
    });
  
  // Añadir cursor pointer y funcionalidad al botón "Mis Listas"
  const misListasMenuItem = document.getElementById('mis-listas-menu');
  if (misListasMenuItem) {
    misListasMenuItem.style.cursor = 'pointer';
    // Se elimina el event listener para evitar redirección no deseada
    // misListasMenuItem.addEventListener('click', () => {
    //   window.location.href = 'profile2.html#listas';
    // });
  }

  // Funcionalidad para activar el ítem del menú clickeado y desactivar los demás
  const menuItems = document.querySelectorAll('.sidebar .menu-item');
  menuItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
  
const calendarViewSpans = document.querySelectorAll('.calendar-view span');
const calendarDaysContainer = document.querySelector('.calendar-days');
const calendarHeaderTitle = document.querySelector('.calendar-header h3');

let currentView = 'Semana'; // Default view
let selectedDate = new Date();

function clearCalendarDays() {
    calendarDaysContainer.innerHTML = '';
}

function renderWeekView(date) {
    clearCalendarDays();
    calendarHeaderTitle.textContent = 'Calendario de Próximos Estrenos - Semana';

    // Get start of the week (Monday)
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(date.setDate(diff));

    // Show days Mon-Sun with releases
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + i);

        const dayElem = document.createElement('div');
        dayElem.classList.add('calendar-day');
        dayElem.textContent = dayNames[i];

        calendarDaysContainer.appendChild(dayElem);
    }

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + i);

        const dayNumberElem = document.createElement('div');
        dayNumberElem.classList.add('calendar-day');
        dayNumberElem.textContent = dayDate.getDate();

        // Find releases on this day
        const releases = movies.filter(movie => {
            const releaseDate = new Date(movie.releaseDate);
            return releaseDate.getDate() === dayDate.getDate() &&
                   releaseDate.getMonth() === dayDate.getMonth() &&
                   releaseDate.getFullYear() === dayDate.getFullYear();
        });

        if (releases.length > 0) {
            releases.forEach(movie => {
                const releaseSpan = document.createElement('span');
                releaseSpan.textContent = movie.title + ' (' + (movie.releaseType === 'cine' ? 'Cine' : 'Plataforma') + ')';
                releaseSpan.style.display = 'block';
                releaseSpan.style.fontSize = '10px';
                releaseSpan.style.color = movie.releaseType === 'cine' ? '#f7d046' : '#39ff14';
                dayNumberElem.appendChild(releaseSpan);
            });
            dayNumberElem.classList.add('has-event');
        }

        calendarDaysContainer.appendChild(dayNumberElem);
    }
}

function renderMonthView(date) {
    clearCalendarDays();
    calendarHeaderTitle.textContent = 'Calendario de Próximos Estrenos - Mes';

    const year = date.getFullYear();
    const month = date.getMonth();

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Show day names header
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    dayNames.forEach(dayName => {
        const dayNameElem = document.createElement('div');
        dayNameElem.classList.add('calendar-day', 'day-name');
        dayNameElem.textContent = dayName;
        calendarDaysContainer.appendChild(dayNameElem);
    });

    // Calculate padding for first day (Monday as first day)
    let paddingDays = firstDay.getDay() - 1;
    if (paddingDays < 0) paddingDays = 6;

    // Add empty days for padding
    for (let i = 0; i < paddingDays; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarDaysContainer.appendChild(emptyDay);
    }

    // Add days of the month
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
        const dayDate = new Date(year, month, dayNum);

        const dayElem = document.createElement('div');
        dayElem.classList.add('calendar-day');
        dayElem.textContent = dayNum;

        // Find releases on this day
        const releases = movies.filter(movie => {
            const releaseDate = new Date(movie.releaseDate);
            return releaseDate.getDate() === dayNum &&
                   releaseDate.getMonth() === month &&
                   releaseDate.getFullYear() === year;
        });

        if (releases.length > 0) {
            releases.forEach(movie => {
                const releaseSpan = document.createElement('span');
                releaseSpan.textContent = movie.title + ' (' + (movie.releaseType === 'cine' ? 'Cine' : 'Plataforma') + ')';
                releaseSpan.style.display = 'block';
                releaseSpan.style.fontSize = '10px';
                releaseSpan.style.color = movie.releaseType === 'cine' ? '#f7d046' : '#39ff14';
                dayElem.appendChild(releaseSpan);
            });
            dayElem.classList.add('has-event');
        }

        calendarDaysContainer.appendChild(dayElem);
    }
}

function renderYearView(date) {
    clearCalendarDays();
    calendarHeaderTitle.textContent = 'Calendario de Próximos Estrenos - Año';

    const year = date.getFullYear();

    // Show months with number of releases
    for (let month = 0; month < 12; month++) {
        const monthElem = document.createElement('div');
        monthElem.classList.add('calendar-day', 'month-name');
        const monthName = new Date(year, month).toLocaleString('es-ES', { month: 'long' });
        monthElem.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

        // Count releases in this month
        const releasesCount = movies.filter(movie => {
            const releaseDate = new Date(movie.releaseDate);
            return releaseDate.getMonth() === month &&
                   releaseDate.getFullYear() === year;
        }).length;

        if (releasesCount > 0) {
            const countSpan = document.createElement('span');
            countSpan.textContent = ` (${releasesCount} estrenos)`;
            countSpan.style.fontSize = '10px';
            countSpan.style.color = '#39ff14';
            monthElem.appendChild(countSpan);
            monthElem.classList.add('has-event');
        }

        calendarDaysContainer.appendChild(monthElem);
    }
}

function setActiveView(view) {
    currentView = view;
    calendarViewSpans.forEach(span => {
        if (span.textContent === view) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });

    if (view === 'Semana') {
        renderWeekView(selectedDate);
    } else if (view === 'Mes') {
        renderMonthView(selectedDate);
    } else if (view === 'Año') {
        renderYearView(selectedDate);
    }
}

calendarViewSpans.forEach(span => {
    span.addEventListener('click', () => {
        setActiveView(span.textContent);
    });
});

setActiveView(currentView);

document.addEventListener('DOMContentLoaded', () => {
    // Función para manejar el cambio de pestañas
    function switchTab(tabId) {
        const tabs = {
            main: document.getElementById('tab-main-content'),
            reviews: document.getElementById('tab-reviews'),
            proximosEstrenos: document.getElementById('tab-proximos-estrenos'),
            misListas: document.getElementById('tab-mis-listas'),
            rankingsPopulares: document.getElementById('tab-rankings-populares'),
            comunidad: document.getElementById('tab-comunidad')
        };

        // Ocultar todas las pestañas
        Object.values(tabs).forEach(tab => {
            if (tab) tab.style.display = 'none';
        });

        // Mostrar la pestaña seleccionada
        switch (tabId) {
            case 'reviews':
                if (tabs.reviews) tabs.reviews.style.display = 'block';
                break;
            case 'proximosEstrenos':
                if (tabs.proximosEstrenos) tabs.proximosEstrenos.style.display = 'block';
                break;
            case 'misListas':
                if (tabs.misListas) tabs.misListas.style.display = 'block';
                break;
            case 'rankingsPopulares':
                if (tabs.rankingsPopulares) tabs.rankingsPopulares.style.display = 'block';
                break;
            case 'comunidad':
                if (tabs.comunidad) tabs.comunidad.style.display = 'block';
                break;
            default:
                if (tabs.main) tabs.main.style.display = 'block';
        }
    }

    // Añadir evento click a cada ítem del menú para cambiar pestaña
    const menuTabsMap = {
        'menu-reviews': 'reviews',
        'menu-proximos-estrenos': 'proximosEstrenos',
        'mis-listas-menu': 'misListas',
        'menu-rankings-populares': 'rankingsPopulares',
        'menu-comunidad': 'comunidad'
    };

    // Variable para almacenar el id del menú activo
    let activeMenuId = null;

    Object.entries(menuTabsMap).forEach(([menuId, tabId]) => {
        const menuItem = document.getElementById(menuId);
        if (menuItem) {
            menuItem.addEventListener('click', () => {
                if (activeMenuId === menuId) {
                    // Si se hace clic en el mismo menú activo, no hacer nada
                    return;
                }
                activeMenuId = menuId;
                switchTab(tabId);
                // Cambiar clase activa en el menú
                document.querySelectorAll('.sidebar .menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                menuItem.classList.add('active');
            });
        }
    });

    // Buscar el menú "Inicio" (primer .menu-item sin id)
    const sidebarMenuItems = document.querySelectorAll('.sidebar .menu-item');
    let inicioMenuItem = null;
    sidebarMenuItems.forEach(item => {
        if (!item.id && item.textContent.trim().startsWith('🏠')) {
            inicioMenuItem = item;
        }
    });

    if (inicioMenuItem) {
        inicioMenuItem.classList.add('active');
        // Añadir evento click para el menú "Inicio"
        inicioMenuItem.addEventListener('click', () => {
            if (activeMenuId === null) {
                return;
            }
            activeMenuId = null;
            switchTab('main');
            document.querySelectorAll('.sidebar .menu-item').forEach(item => {
                item.classList.remove('active');
            });
            inicioMenuItem.classList.add('active');
        });
    }

    // Mostrar contenido principal por defecto y establecer menú activo
    const defaultMenuId = null; // No id for "Inicio" menu item
    activeMenuId = defaultMenuId;

    switchTab('main');
});

