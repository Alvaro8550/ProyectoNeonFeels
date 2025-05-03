// JavaScript for comunidad.html

document.addEventListener('DOMContentLoaded', () => {
    const createThreadBtn = document.getElementById('create-thread-btn');
    const threadList = document.querySelector('.thread-list');

    // Load threads from localStorage or use default threads
    let threads = JSON.parse(localStorage.getItem('threads')) || [
        {
            title: "¿Final de 'Eterna' fue flojo o genial?",
            date: "18 abr.",
            tag: "Sin Spoilers",
            tagClass: "tag-no-spoilers"
        },
        {
            title: "Análisis del simbolismo en 'Noche Cósmica'",
            date: "17 abr.",
            tag: "Con Spoilers",
            tagClass: "tag-with-spoilers"
        },
        {
            title: "La mejor película de ciencia ficción",
            date: "15 abr.",
            tag: "Sin Spoilers",
            tagClass: "tag-no-spoilers"
        },
        {
            title: "Opiniones sobre la actuación en 'Rescate Infernal'",
            date: "14 abr.",
            tag: "Con Spoilers",
            tagClass: "tag-with-spoilers"
        }
    ];

    function renderThreads() {
        threadList.innerHTML = '';
        threads.forEach(thread => {
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = '#';
            a.classList.add('thread-title');
            a.textContent = thread.title;

            const spanDate = document.createElement('span');
            spanDate.classList.add('thread-date');
            spanDate.textContent = thread.date;

            const spanTag = document.createElement('span');
            spanTag.classList.add('thread-tag', thread.tagClass);
            spanTag.textContent = `[${thread.tag}]`;

            li.appendChild(a);
            li.appendChild(spanDate);
            li.appendChild(spanTag);

            threadList.appendChild(li);
        });
    }

    createThreadBtn.addEventListener('click', () => {
        const threadTitle = prompt('Ingrese el título del nuevo hilo:');
        if (threadTitle && threadTitle.trim() !== '') {
            const newThread = {
                title: threadTitle.trim(),
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
                tag: "Sin Spoilers",
                tagClass: "tag-no-spoilers"
            };
            threads.unshift(newThread); // Add new thread at the beginning
            localStorage.setItem('threads', JSON.stringify(threads));
            renderThreads();
            alert(`Nuevo hilo creado: ${threadTitle}`);
        } else {
            alert('El título del hilo no puede estar vacío.');
        }
    });

    renderThreads();
});
