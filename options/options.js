document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("profile", (data) => {
        const profile = data.profile || {};
        for (const field in FIELD_PATTERNS) {
            const input = document.getElementById(field);
            if (input && profile[field]) {
                input.value = profile[field];
            }
        }
    });
});

document.getElementById("save").addEventListener("click", () => {
    const profile = {};
    for (const field in FIELD_PATTERNS) {
        const input = document.getElementById(field);
        if (input) {
            profile[field] = input.value;
        }
    }
    chrome.storage.sync.set({ profile });
});
