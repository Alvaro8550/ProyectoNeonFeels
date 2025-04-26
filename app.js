const movies = [
    {
        title: "Blade Runner 2049",
        year: 2017,
        genre: "Ciencia Ficción",
        director: "Denis Villeneuve",
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
                <img src="${imageSrc}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre}</p>
                    <div class="rating">
                        <i>⭐</i> ${movie.rating}
                    </div>
                </div>
            `;
            movieContainer.appendChild(movieCard);
        });
    }

    // Function to filter movies based on selected criteria
    function filterMovies() {
        const genre = document.getElementById('genre-filter').value;
        const year = document.getElementById('year-filter').value;
        const rating = parseFloat(document.getElementById('rating-filter').value);

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

            return genreMatch && yearMatch && ratingMatch;
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
      misListasMenuItem.addEventListener('click', () => {
        window.location.href = 'profile2.html#listas';
      });
    }
  });
  
  calendarDays.forEach(dayElem => {
    const dayNumber = parseInt(dayElem.textContent);
    if (isNaN(dayNumber)) return;

    // Limpiar contenido previo
    dayElem.innerHTML = dayNumber;

    // Buscar películas que se estrenan en este día (mes y año actuales)
    const releases = movies.filter(movie => {
        const releaseDate = new Date(movie.releaseDate);
        return releaseDate.getDate() === dayNumber &&
               releaseDate.getMonth() + 1 === currentMonth &&
               releaseDate.getFullYear() === currentYear;
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
});

