// Bot Status Dashboard JavaScript
class BotStatusDashboard {
    constructor() {
        this.apiUrl = '/api/status';
        this.updateInterval = 30000; // 30 Sekunden
        this.init();
    }

    init() {
        this.updateStatus();
        this.startAutoUpdate();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Refresh Button
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshStatus());
        }
    }

    async updateStatus() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            if (data.success) {
                this.renderStatus(data.data);
            } else {
                this.renderOfflineStatus();
            }
        } catch (error) {
            console.error('Fehler beim Laden des Bot-Status:', error);
            this.renderOfflineStatus();
        }
    }

    renderStatus(status) {
        // Header Status
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (status.isOnline) {
            statusDot.className = 'status-dot online';
            statusText.textContent = 'Online';
        } else {
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'Offline';
        }

        // Status Card
        document.getElementById('botStatus').textContent = status.isOnline ? '🟢 Online' : '🔴 Offline';
        document.getElementById('uptime').textContent = this.formatUptime(status.uptime);
        document.getElementById('totalUsers').textContent = status.totalUsers.toLocaleString('de-DE');
        document.getElementById('totalGroups').textContent = status.totalGroups.toLocaleString('de-DE');
        document.getElementById('totalPets').textContent = status.totalPets.toLocaleString('de-DE');
        document.getElementById('version').textContent = status.version;

        // Status Icon Color
        const statusIcon = document.querySelector('.stat-icon');
        if (statusIcon) {
            statusIcon.className = status.isOnline ? 'stat-icon online' : 'stat-icon';
        }
    }

    renderOfflineStatus() {
        // Header Status
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        statusDot.className = 'status-dot offline';
        statusText.textContent = 'Offline';

        // Status Card
        document.getElementById('botStatus').textContent = '🔴 Offline';
        document.getElementById('uptime').textContent = 'N/A';
        document.getElementById('totalUsers').textContent = 'N/A';
        document.getElementById('totalGroups').textContent = 'N/A';
        document.getElementById('totalPets').textContent = 'N/A';
    }

    formatUptime(uptime) {
        if (!uptime || uptime <= 0) return 'N/A';
        
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ${hours % 24}h ${minutes % 60}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    refreshStatus() {
        const refreshIcon = document.getElementById('refreshIcon');
        refreshIcon.style.animation = 'spin 1s linear infinite';
        
        this.updateStatus().finally(() => {
            setTimeout(() => {
                refreshIcon.style.animation = '';
            }, 1000);
        });
    }

    startAutoUpdate() {
        setInterval(() => {
            this.updateStatus();
        }, this.updateInterval);
    }
}

// Smooth Scrolling für Links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dashboard
    new BotStatusDashboard();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to command items
    const commandItems = document.querySelectorAll('.command-item');
    commandItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // WhatsApp Button Click Tracking
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            console.log('WhatsApp Bot Join Button clicked');
            // Hier könntest du Analytics hinzufügen
        });
    }
});

// Add some nice animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .command-category, .status-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});