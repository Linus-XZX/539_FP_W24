const test = () => {
    const focusables = [];
    document.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)').forEach((focusable) => {
        focusables.push(focusable);
        focusable.addEventListener('focus', () => {
            console.log(focusable.getBoundingClientRect());
        })
        focusable.addEventListener('blur', () => {
            console.log(focusables.indexOf(focusable));
        })
    });
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
        files: ["css/style.css"],
        target: { tabId: tab.id },
    })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: test
    })
});