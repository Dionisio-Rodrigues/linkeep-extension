// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuxf8OuUP9Rigj37VGekrc-Dl6OMb4Dt8",
  authDomain: "linkeep-c7896.firebaseapp.com",
  projectId: "linkeep-c7896",
  storageBucket: "linkeep-c7896.appspot.com",
  messagingSenderId: "797843636928",
  appId: "1:797843636928:web:b198707e99566e8cb82325",
  measurementId: "G-1102TDQ4XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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