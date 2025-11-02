chrome.omnibox.onInputEntered.addListener((text) => {
    // Fetch saved shortcuts from local storage
    chrome.storage.local.get(null, (result) => {
        // result is already a plain object { keyword: url }
        const shortcuts = result;

        const url = shortcuts[text.toLowerCase()];
        if (url) {
            chrome.tabs.update({ url });
        } else {
            // Optional fallback to Google search
            chrome.tabs.update({ url: `https://www.google.com/search?q=${text}` });
        }
    });
});
