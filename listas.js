// JavaScript for listas.html

document.addEventListener('DOMContentLoaded', () => {
    const listsContainer = document.getElementById('lists-container');

    // Example user lists data
    const userLists = [
        {
            title: "Favoritas",
            movies: [
                "Interstellar Crisis",
                "Dune: Parte Tres",
                "Avengers: Guerras Secretas"
            ]
        },
        {
            title: "Para ver pronto",
            movies: JSON.parse(localStorage.getItem('watchLaterList'))?.map(movie => movie.title) || []
        },
        {
            title: "Comedias",
            movies: [
                "Summer Days"
            ]
        }
    ];

    function removeMovieFromWatchLater(title) {
        let watchLaterList = JSON.parse(localStorage.getItem('watchLaterList')) || [];
        watchLaterList = watchLaterList.filter(movie => movie.title !== title);
        localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
        renderLists();
    }

    function renderLists() {
        listsContainer.innerHTML = ''; // Clear container before rendering
        userLists[1].movies = JSON.parse(localStorage.getItem('watchLaterList'))?.map(movie => movie.title) || [];

        userLists.forEach(list => {
            const listEl = document.createElement('div');
            listEl.classList.add('list');

            let moviesHtml = '';
            if (list.movies.length === 0) {
                moviesHtml = `<div class="movie-item">No hay películas en esta lista.</div>`;
            } else {
                list.movies.forEach(movie => {
                    if (list.title === "Para ver pronto") {
                        moviesHtml += `<div class="movie-item">- ${movie} <span class="delete-movie" data-title="${movie}" style="cursor:pointer; color:red; margin-left:10px;">🗑️</span></div>`;
                    } else {
                        moviesHtml += `<div class="movie-item">- ${movie}</div>`;
                    }
                });
            }

            listEl.innerHTML = `
                <div class="list-title">${list.title}</div>
                ${moviesHtml}
            `;

            listsContainer.appendChild(listEl);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-movie').forEach(button => {
            button.addEventListener('click', (e) => {
                const title = e.target.getAttribute('data-title');
                removeMovieFromWatchLater(title);
            });
        });
    }

    renderLists();
});
