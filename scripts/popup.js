inputName = document.getElementById("input-name");
bttnSave = document.getElementById("bttn-save");


//POPUP events

bttnSave.addEventListener("click", saveLink);

//INIT

load();

//CRUD functions

async function load() {
    tab = await getCurrentTab();
    inputName.value = tab.title;
}

async function saveLink() {
    let msg = {
        message: tab,
        option: "save"
    }
    sendMessage(msg);
}

async function deleteLink() {
    let msg = {
        message: tab,
        option: "delete"
    }
    links = await sendMessage(msg);
}

async function updateLink() {
    let msg = {
        message: tab,
        option: "update"
    }
    links = await sendMessage(msg);
}

async function getAllLink() {
    let msg = {
        message: tab,
        option: "getAll"
    }
    links = await sendMessage(msg);
}

// CHROME events

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
    sendResponse({ message: "Response from background" })
})

// CHROME functions

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function sendMessage(msg) {
    let response = await chrome.runtime.sendMessage(msg);
    console.log(response)
    return response;
}
