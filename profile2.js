// Cargar datos de usuario desde localStorage
let usernameEl, profilePicEl, avatarInput;

function loadUserData() {
    const username = localStorage.getItem('userName') || 'Usuario';
    const userAvatar = localStorage.getItem('userAvatar') || 'ultron.jpg';
    usernameEl.textContent = username;
    profilePicEl.src = userAvatar;

    // Cargar listas de historial, listas, reseñas y actividad
    loadList('historial');
    loadList('listas');
    loadList('resenas');
    loadList('actividad');
}

function saveUsername() {
    localStorage.setItem('userName', usernameEl.textContent);
}

function showAvatarOptions() {
    avatarInput.click();
}

function changeAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicEl.src = e.target.result;
            localStorage.setItem('userAvatar', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function loadList(type) {
    const listEl = document.getElementById(type + '-list');
    listEl.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(type)) || [];

    if (data.length === 0) {
        listEl.innerHTML = '<li>No hay datos disponibles.</li>';
        return;
    }

    data.forEach(item => {
        const li = document.createElement('li');
        if (type === 'historial') {
            li.textContent = `${item.title} (${item.year})`;
        } else if (type === 'listas') {
            li.textContent = item.name;
        } else if (type === 'resenas') {
            li.textContent = `${item.movieTitle}: ${item.review}`;
        } else if (type === 'actividad') {
            li.textContent = item.activity;
        }
        listEl.appendChild(li);
    });
}

function logout() {
    localStorage.clear();
    alert('Has cerrado sesión.');
    window.location.href = 'index.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    usernameEl = document.getElementById('username');
    profilePicEl = document.getElementById('profile-pic');
    avatarInput = document.getElementById('avatar-input');

    loadUserData();
    showSection('historial'); // Mostrar sección por defecto
});
