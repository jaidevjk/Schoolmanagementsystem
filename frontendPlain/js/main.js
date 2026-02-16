// Lightweight API wrapper using fetch that mirrors the React app axios behavior
const API_BASE = '/api';

function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    try {
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    } catch (e) { }
    return headers;
}

async function apiFetch(path, opts = {}) {
    const url = path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`;
    const headers = Object.assign({}, getAuthHeaders(), opts.headers || {});
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    if (!res.ok) {
        const errText = await res.text();
        let err = errText;
        try { err = JSON.parse(errText); } catch (e) { }
        const error = new Error(res.statusText || 'Request failed');
        error.response = { status: res.status, data: err };
        throw error;
    }
    // try json
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { return text; }
}

window.api = {
    get: (p) => apiFetch(p, { method: 'GET' }),
    post: (p, body) => apiFetch(p, { method: 'POST', body: JSON.stringify(body) }),
    put: (p, body) => apiFetch(p, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (p, body) => apiFetch(p, { method: 'PATCH', body: JSON.stringify(body) }),
    del: (p) => apiFetch(p, { method: 'DELETE' }),
};

// DOM helpers: highlight sidebar active link
function highlightSidebar() {
    const links = document.querySelectorAll('.nav-item');
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        // simple matching: if url includes href
        if (location.pathname.endsWith(href) || location.href.includes(href)) {
            links.forEach(l => l.classList.remove('active'));
            a.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    highlightSidebar();
});

// Simple modal helper
window.showModal = function (htmlContent) {
    const overlay = document.createElement('div');
    overlay.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000';
    const box = document.createElement('div');
    box.style = 'background:#fff;padding:20px;border-radius:8px;max-width:600px;width:90%;max-height:90vh;overflow:auto;color:#111';
    box.innerHTML = htmlContent;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    return {
        close: () => document.body.removeChild(overlay),
        box
    };
};
