chrome.action.onClicked.addListener(async (tab) => {
    const result = await chrome.storage.sync.get("profile");
    chrome.tabs.sendMessage(tab.id, {
        action: "autofill",
        data: result.profile
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "formFilled") {
        chrome.action.setIcon({ path: "../images/filled.png", tabId: sender.tab.id });
    }
});
