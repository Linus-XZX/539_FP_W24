const buildTabs = () => {
    const focusables = [];
    document.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)').forEach((focusable) => {
        focusables.push(focusable);
        focusable.addEventListener('focus', () => {
            const rect = focusable.getBoundingClientRect();
            console.log(rect);
            const newDiv = document.createElement('div');
            newDiv.classList.add('extension-generated');
            newDiv.style.width = rect.width + 10;
            newDiv.style.height = rect.height + 10;
            newDiv.style.left = rect.x - 5;
            newDiv.style.top = rect.y - 5;
            newDiv.addEventListener('click', () => document.querySelector('h1').focus())
            document.body.appendChild(newDiv);
        })
        focusable.addEventListener('blur', () => {
            document.querySelectorAll('.extension-generated').forEach((rect) => rect.remove());
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
        func: buildTabs
    })
});