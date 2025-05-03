// alerts.js - Alert system for premieres and news in cartelera.html

document.addEventListener('DOMContentLoaded', () => {
    const alertNotifications = document.getElementById('alert-notifications');
    const alertPreferencesButton = document.getElementById('alert-preferences-button');
    const alertPreferencesModal = document.getElementById('alert-preferences-modal');
    const enableAlertsCheckbox = document.getElementById('enable-alerts-checkbox');
    const muteAlertsCheckbox = document.getElementById('mute-alerts-checkbox');
    const closeAlertPreferences = document.getElementById('close-alert-preferences');

    // Load preferences from localStorage or set defaults
    let alertPreferences = {
        enabled: true,
        muted: false
    };

    function loadPreferences() {
        const prefs = localStorage.getItem('alertPreferences');
        if (prefs) {
            alertPreferences = JSON.parse(prefs);
        }
        enableAlertsCheckbox.checked = alertPreferences.enabled;
        muteAlertsCheckbox.checked = alertPreferences.muted;
    }

    function savePreferences() {
        localStorage.setItem('alertPreferences', JSON.stringify(alertPreferences));
    }

    // Show alert notification in-app
    function showAlertNotification(alert) {
        if (!alertPreferences.enabled) return;

        const alertEl = document.createElement('div');
        alertEl.style.backgroundColor = '#1f1f1f';
        alertEl.style.border = '1px solid #39ff14';
        alertEl.style.borderRadius = '8px';
        alertEl.style.padding = '10px';
        alertEl.style.marginBottom = '10px';
        alertEl.style.display = 'flex';
        alertEl.style.gap = '10px';
        alertEl.style.alignItems = 'center';
        alertEl.style.color = 'white';
        alertEl.style.cursor = 'pointer';
        alertEl.title = 'Click para cerrar';

        alertEl.innerHTML = `
            <img src="${alert.thumbnail}" alt="Miniatura" style="width: 60px; height: 80px; object-fit: cover; border-radius: 5px;" />
            <div style="flex: 1;">
                <div style="font-weight: bold; font-size: 1rem;">${alert.title}</div>
                <div style="font-size: 0.9rem; color: #ccc;">${alert.date}</div>
            </div>
            <button style="background: none; border: none; color: #39ff14; font-weight: bold; font-size: 1.2rem; cursor: pointer;">&times;</button>
        `;

        // Close alert on click of button or alert itself
        alertEl.querySelector('button').addEventListener('click', () => {
            alertNotifications.removeChild(alertEl);
        });
        alertEl.addEventListener('click', (e) => {
            if (e.target === alertEl) {
                alertNotifications.removeChild(alertEl);
            }
        });

        alertNotifications.appendChild(alertEl);

        // Auto remove after 10 seconds
        setTimeout(() => {
            if (alertNotifications.contains(alertEl)) {
                alertNotifications.removeChild(alertEl);
            }
        }, 10000);
    }

    // Request permission and show push notification
    function showPushNotification(alert) {
        if (!alertPreferences.enabled || alertPreferences.muted) return;

        if (Notification.permission === 'granted') {
            const notification = new Notification(alert.title, {
                body: alert.date,
                icon: alert.thumbnail
            });
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showPushNotification(alert);
                }
            });
        }
    }

    // Example alerts data - in real app, this could come from API or dynamic source
    const alerts = [
        {
            title: 'Estreno: Galactic Odyssey',
            date: '15 mayo 2024',
            thumbnail: 'Imagenes/Galactic Odyssey.png'
        },
        {
            title: 'Novedad: Love in Paris',
            date: '10 julio 2024',
            thumbnail: 'Imagenes/Love in Paris.png'
        }
    ];

    // Show all alerts on page load
    function showAllAlerts() {
        alerts.forEach(alert => {
            showAlertNotification(alert);
            showPushNotification(alert);
        });
    }

    // Event listeners for preferences modal
    alertPreferencesButton.addEventListener('click', () => {
        alertPreferencesModal.style.display = 'block';
    });

    closeAlertPreferences.addEventListener('click', () => {
        alertPreferencesModal.style.display = 'none';
    });

    enableAlertsCheckbox.addEventListener('change', () => {
        alertPreferences.enabled = enableAlertsCheckbox.checked;
        savePreferences();
    });

    muteAlertsCheckbox.addEventListener('change', () => {
        alertPreferences.muted = muteAlertsCheckbox.checked;
        savePreferences();
    });

    // Initialize
    loadPreferences();
    showAllAlerts();
});
