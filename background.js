//EVENTS

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" triggered`);
});

chrome.tabs.onActivated.addListener(async (info) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tab) => {
        console.log(tab[0].title);
    });
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let response;

    if (message.option === "save") {

        // process 

        response = {
            message: "the link has been SAVED"
        }
    } else if (message.option === "delete") {

        // process 

        response = {
            message: "the link has been DELETE"
        }
    } else if (message.option === "update") {

        // process 

        response = {
            message: "the link has been UPDATE"
        }
    } else if (message.option === "getAll") {

        // process 

        response = {
            message: "send links"
        }
    } else {
        // send error
    }

    sendResponse(response);
})