const BASE_URL = "https://be.dipras.my.id";
const commentSection = document.querySelector("#comment-section");
const commentForm = document.querySelector("#comment-form");
const commentBtn = document.querySelector("#comment-btn");

const showNotification = (message, type = "success", timeout = 4000) => {
    try {
        const existing = document.querySelector('.dp-notification');
        if (existing) existing.remove();

        const notif = document.createElement('div');
        notif.className = `dp-notification mb-4 p-3 rounded text-sm w-full max-w-md mx-auto text-center ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
        notif.setAttribute('role', 'status');
        notif.setAttribute('aria-live', 'polite');
        notif.textContent = message;

        commentForm.parentNode.insertBefore(notif, commentForm);

        setTimeout(() => {
            notif.remove();
        }, timeout);
    } catch (err) {
        console.warn('Notification error', err);
        alert(message);
    }
}

const clearFieldErrors = () => {
    const prev = commentForm.querySelectorAll('.dp-field-error');
    prev.forEach(el => el.remove());
}

const showFieldErrors = (errors = []) => {
    try {
        clearFieldErrors();

        const grouped = errors.reduce((acc, cur) => {
            const path = (cur.path || cur.property || '').replace(/^\//, '');
            if (!path) return acc;
            acc[path] = acc[path] || [];
            acc[path].push(cur.message || cur.summary || 'Invalid value');
            return acc;
        }, {});

        let firstFieldEl = null;
        Object.keys(grouped).forEach(fieldName => {
            const field = commentForm.querySelector(`[name="${fieldName}"]`);
            const messages = grouped[fieldName];
            const msg = messages.join(' • ');
            const errEl = document.createElement('div');
            errEl.className = 'dp-field-error text-red-600 text-sm mt-1';
            errEl.setAttribute('aria-live', 'polite');
            errEl.textContent = msg;

            if (field && field.parentNode) {
                field.parentNode.insertBefore(errEl, field.nextSibling);
                if (!firstFieldEl) firstFieldEl = field;
            } else {
                showNotification(msg, 'error');
            }
        });

        if (firstFieldEl && typeof firstFieldEl.focus === 'function') {
            firstFieldEl.focus();
        }
    } catch (err) {
        console.warn('showFieldErrors error', err);
    }
}

function get24HourTime(now) {
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

const generateCommentEl = val => {
    const d = new Date(val.created_at);
    return `
    <div class="border border-gray-200 p-4 rounded-lg">
        <div class="flex justify-between items-center mb-2">
            <h4 class="font-medium text-gray-900">${val.name}</h4>
            <span class="text-xs text-gray-400">${d.getDate()}-${d.getMonth()}-${d.getFullYear()}  ${get24HourTime(d)}</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">${val.comment}</p>
    </div>
    `
}

(async () => {
    try {
        const commentResponse = await fetch(`${BASE_URL}/comment`).then(res => res.json());

        if (commentResponse.data.length < 1) {
            commentSection.innerHTML = `<h1 class="text-center text-gray-500">There are no comment yet</h1>`
            return;
        }

        let commentStr = commentResponse.data.map(val => generateCommentEl(val)).join("");

        commentSection.innerHTML = commentStr;
    } catch (error) {
        commentSection.innerHTML = `<h1 class="text-center text-red-400">There are some error happened, please contact me to tell me</h1>`
    }

})();

commentForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name") || "Anonymous";
    const comment = formData.get("comment");

    const prevBtnText = commentBtn.textContent;
    try {
        clearFieldErrors();
        commentBtn.disabled = true;
        commentBtn.textContent = 'Sending...';

        const res = await fetch(`${BASE_URL}/comment`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ name, comment })
        });

        const result = await res.json().catch(() => null);

        if (res.status === 422) {
            if (result && Array.isArray(result.errors)) {
                showFieldErrors(result.errors);
            }
            const summary = result && (result.summary || result.message) ? (result.summary || result.message) : 'Terdapat kesalahan pada input.';
            showNotification(summary, 'error');
            return;
        }

        if (!res.ok || !result || !result.data) {
            throw new Error((result && result.message) ? result.message : 'Server returned unexpected response');
        }

        commentSection.insertAdjacentHTML("afterbegin", generateCommentEl(result.data));
        commentForm.reset();
        showNotification('Thank you for your comment', 'success');
    } catch (error) {
        console.error(error);
        showNotification('Error sending your comment, please check the console for more information', 'error');
    } finally {
        commentBtn.disabled = false;
        commentBtn.textContent = prevBtnText;
    }
});