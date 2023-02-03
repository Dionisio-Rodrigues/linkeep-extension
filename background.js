var tabInfo
var userInfo

chrome.identity.getProfileUserInfo({'accountStatus': 'SYNC'}, user => {
    userInfo = user;
})

//EVENTS

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" triggered`);
});

chrome.tabs.onActivated.addListener(async (info) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tab) => {
        tabInfo = tab[0]
        console.log(tabInfo.title)
    });
})

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    let response

    if (message.option === "save") {

        response = save({
            uri : message.tab.url,
            name : message.tab.title,
            icon : message.tab.favIconUrl,
            user : userInfo.id
        })

    } else if (message.option === "delete") {

        response = del({
            uri : message.tab.url,
            name : message.tab.title,
            icon : message.tab.favIconUrl,
            user : userInfo.id
        })

    } else if (message.option === "findAll") {

        console.log(userInfo.id)
        response = findAll(userInfo.id)
        
    } else {
        // send error
    }

    sendResponse({
        message : response
    });
})

async function save(object){

    let response = await request('POST', object, 'http://localhost:8080/links/save');

    return response;
}

async function del(object){

    let response = await request('DELETE', object, 'http://localhost:8080/links/delete');

    return response;
}

function findAll(user){
    let response = fetch(`http://localhost:8080/links/findAllByUser/${user}`);

    return response
}

async function request(method, body, resource){
    const init = {
        method: method,
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    }
    console.log(JSON.stringify(body))

    const response = await fetch(resource, init)

    return response
}