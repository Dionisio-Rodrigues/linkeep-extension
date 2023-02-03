inputName = document.getElementById("input-name");
bttnSave = document.getElementById("bttn-save");

bttnSave.addEventListener("click", saveLink);

load();

async function load() {
    tab = await getCurrentTab();
    inputName.value = tab.title;
    findAll();
}

async function saveLink() {

    let msg = {
        tab: tab,
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
    console.log(links)
}

// async function updateLink() {
//     let msg = {
//         message: tab,
//         option: "update"
//     }
//     links = await sendMessage(msg);
// }

async function findAll() {
    let msg = {
        option: "findAll"
    }
    sendMessage(msg);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
    sendResponse({ message: "Response from background" })
})

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function sendMessage(msg) {
    // const response = await chrome.runtime.sendMessage(msg);
    
    // return response.message

    const response = await chrome.runtime.sendMessage(msg)

    console.log(response)
}
