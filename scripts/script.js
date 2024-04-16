const focusable = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)';

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
        files: ["css/style.css"],
        target: { tabId: tab.id },
    })
});