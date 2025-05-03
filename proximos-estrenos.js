// JavaScript for proximos-estrenos.html

document.addEventListener('DOMContentLoaded', () => {
    const upcomingContainer = document.getElementById('upcoming-container');

    // Example upcoming movies data
    const upcomingMovies = [
        {
            title: "Galactic Odyssey",
            releaseDate: "15 mayo 2024",
            genre: "Ciencia Ficción, Aventura",
            poster: "Imagenes/Galactic Odyssey.png"
        },
        {
            title: "Shadow's Edge",
            releaseDate: "30 junio 2024",
            genre: "Suspenso, Thriller",
            poster: "Imagenes/PELICULA9.jpg"
        },
        {
            title: "Love in Paris",
            releaseDate: "10 julio 2024",
            genre: "Romance, Drama",
            poster: "Imagenes/Love in Paris.png"
        }
    ];

    // Render upcoming movies
    upcomingMovies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');

        movieEl.innerHTML = `
            <img src="${movie.poster}" alt="Póster de ${movie.title}" class="movie-poster" />
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="release-date">Fecha de estreno: ${movie.releaseDate}</div>
                <div class="movie-genre">${movie.genre}</div>
            </div>
        `;

        upcomingContainer.appendChild(movieEl);
    });
});
