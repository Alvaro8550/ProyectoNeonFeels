// Sample movie data structure
const movies = [
    {
        title: "Blade Runner 2049",
        year: 2017,
        genre: "Sci-Fi",
        director: "Denis Villeneuve",
        duration: 164,
        country: "USA"
    },
    {
        title: "Drive",
        year: 2011,
        genre: "Action",
        director: "Nicolas Winding Refn",
        duration: 100,
        country: "USA"
    },
    {
        title: "The Neon Demon",
        year: 2016,
        genre: "Horror",
        director: "Nicolas Winding Refn",
        duration: 117,
        country: "USA"
    },
    {
        title: "Trun: Legacy",
        year: 2010,
        genre: "Accion",
        director: "Joseph Kosinski",
        duration: 125,
        country: "USA"
    }
];

// Function to filter movies based on selected criteria
function filterMovies() {
    const genre = document.getElementById('genre-filter').value;
    const year = document.getElementById('year-filter').value;
    const director = document.getElementById('director-filter').value;
    const duration = document.getElementById('duration-filter').value;
    const country = document.getElementById('country-filter').value;

    const filteredMovies = movies.filter(movie => {
        return (genre === "All" || movie.genre === genre) &&
               (year === "" || movie.year == year) &&
               (director === "" || movie.director.toLowerCase().includes(director.toLowerCase())) &&
               (duration === "" || movie.duration <= duration) &&
               (country === "" || movie.country.toLowerCase().includes(country.toLowerCase()));
    });

    displayMovies(filteredMovies);
}

// Function to display movies on the page
function displayMovies(moviesToDisplay) {
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = ''; // Clear existing movies

    moviesToDisplay.forEach(movie => {
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
        }else if (movie.title === "Trun: Legacy") {
            imageSrc = "Imagenes/PELICULA4.png";
            imageClass += " spaced-movie-poster";
        }
        movieCard.innerHTML = `
            <img src="${imageSrc}" alt="${movie.title}" class="${imageClass}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
                <p class="movie-genre">Género: ${movie.genre}</p>
                <p class="movie-director">Director: ${movie.director}</p>
                <p class="movie-duration">Duración: ${movie.duration} min</p>
                <p class="movie-country">País: ${movie.country}</p>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}

// Initialize movie display when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayMovies(movies);
    document.getElementById('filter-button').addEventListener('click', filterMovies);
    
    // Toggle filter controls when clicking search input
    document.querySelector('.search-input').addEventListener('click', function() {
        const filters = document.querySelector('.filters');
        filters.style.display = filters.style.display === 'none' ? 'flex' : 'none';
    });
});
