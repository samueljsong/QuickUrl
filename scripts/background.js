chrome.omnibox.onInputEntered.addListener((text) => {
    console.log("User typed: " + text);

    const shortcuts = {
        yt: "https://www.youtube.com",
        gh: "https://github.com",
        gm: "https://mail.google.com",
    };

    // Match and redirect
    const url = shortcuts[text.toLowerCase()];
    if (url) {
        chrome.tabs.update({ url });
    } else {
        // Optional: fallback to a search
        chrome.tabs.update({ url: `https://www.google.com/search?q=${text}` });
    }
})