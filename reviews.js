// JavaScript for reviews.html

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');

    // Example reviews data
    const reviews = [
        {
            title: "Interstellar Crisis",
            genre: "Ciencia Ficción, Aventura",
            rating: 9.2,
            review: "Una épica aventura espacial con una historia profunda y efectos visuales impresionantes."
        },
        {
            title: "The Last Voyage",
            genre: "Drama, Suspenso",
            rating: 8.7,
            review: "Un drama intenso con giros inesperados que mantiene al espectador al borde del asiento."
        },
        {
            title: "Whispers in the Dark",
            genre: "Terror, Misterio",
            rating: 8.9,
            review: "Una película de terror atmosférica que combina misterio y sustos efectivos."
        },
        {
            title: "Summer Days",
            genre: "Romance, Comedia",
            rating: 7.8,
            review: "Una comedia romántica ligera y entretenida perfecta para el verano."
        }
    ];

    // Render reviews
    reviews.forEach(r => {
        const reviewEl = document.createElement('div');
        reviewEl.classList.add('movie-review');

        reviewEl.innerHTML = `
            <div class="movie-title">${r.title}</div>
            <div class="movie-genre">${r.genre}</div>
            <div class="rating">⭐ ${r.rating}</div>
            <div class="review-text">${r.review}</div>
        `;

        reviewsContainer.appendChild(reviewEl);
    });
});
