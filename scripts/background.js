chrome.omnibox.onInputEntered.addListener((text) => {
    chrome.storage.local.get(null, (result) => {
        const shortcuts = result;

        const url = shortcuts[text.toLowerCase()];
        if (url) {
            chrome.tabs.update({ url });
        } else {
            chrome.tabs.update({ url: `https://www.google.com/search?q=${text}` });
        }
    });
});
