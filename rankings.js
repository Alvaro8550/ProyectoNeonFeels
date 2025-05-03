// JavaScript for rankings.html

document.addEventListener('DOMContentLoaded', () => {
    const rankingsContainer = document.getElementById('rankings-container');

    // Example popular movies rankings data
    const rankings = [
        { title: "Dune: Parte Tres", score: 9.5 },
        { title: "Avengers: Guerras Secretas", score: 9.1 },
        { title: "Interstellar Crisis", score: 9.2 },
        { title: "The Last Voyage", score: 8.7 },
        { title: "Whispers in the Dark", score: 8.9 },
        { title: "The Midnight Club", score: 8.6 },
        { title: "Summer Days", score: 7.8 }
    ];

    // Sort rankings descending by score
    rankings.sort((a, b) => b.score - a.score);

    // Render rankings
    rankings.forEach((movie, index) => {
        const rankingEl = document.createElement('div');
        rankingEl.classList.add('ranking-item');

        rankingEl.innerHTML = `
            <div class="ranking-position">${index + 1}.</div>
            <div class="movie-title">${movie.title}</div>
            <div class="ranking-score">⭐ ${movie.score}</div>
        `;

        rankingsContainer.appendChild(rankingEl);
    });
});
