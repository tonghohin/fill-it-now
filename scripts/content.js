function matchField(input, patterns) {
    const attributes = [input.name?.toLowerCase() || "", input.id?.toLowerCase() || "", input.placeholder?.toLowerCase() || ""];

    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) attributes.push(label.textContent.toLowerCase());

    return patterns.some((pattern) => {
        if (/^\w+$/.test(pattern)) {
            const regex = new RegExp(`\\b${pattern}\\b`, "i");
            return attributes.some((attribute) => regex.test(attribute));
        } else {
            return attributes.some((attribute) => attribute.includes(pattern));
        }
    });
}

function autofillForm(profile) {
    let isAnyFieldFilled = false;

    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
        for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
            if (profile[field] && matchField(input, patterns)) {
                input.value = profile[field];
                isAnyFieldFilled = true;
                input.dispatchEvent(new Event("input", { bubbles: true }));
                break;
            }
        }
    });

    return isAnyFieldFilled;
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "autofill") {
        const wasFormFilled = autofillForm(message.data);
        chrome.runtime.sendMessage({ action: "formFilled" });
    }
});
