// hippity hoppity your code is now my property
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqPN9hEaytxeVnZUyk8C80DabNpJT5V5Q",
    authDomain: "sleeper-games-ce01e.firebaseapp.com",
    databaseURL: "https://sleeper-games-ce01e-default-rtdb.firebaseio.com",
    projectId: "sleeper-games-ce01e",
    storageBucket: "sleeper-games-ce01e.firebasestorage.app",
    messagingSenderId: "337164805904",
    appId: "1:337164805904:web:a9ed1c181617415ec26795",
    measurementId: "G-X0VQ79BHZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const usertoken = localStorage.getItem("clefcune_usertoken");
let start = false;

// change up the homework slightly
onValue(ref(database, `users/${usertoken}/localstorageData`), (snapshot) => {
    const value = snapshot.val();

    if (value) {
        const parsedValue = JSON.parse(value);
        console.log("Parsed Data:", Object.keys(parsedValue));

        const totalArray = Object.keys(parsedValue).map(key => parsedValue[key]);
        const finalData = Object.assign({}, ...totalArray);

        console.log(finalData);
        console.log(Object.keys(finalData));

        Object.keys(finalData).forEach(key => {
            console.log(key);
            localStorage.setItem(key, finalData[key]);
        });
      start = true;
    } else {
        console.warn("mhm, big nothingburger value");
    }
}, { onlyOnce: true });

setInterval(() => {
    if (start) {
        const combinedJSON = JSON.stringify(getLocalStorageKeysAsJSON());
        writeUserData(combinedJSON);
    }
}, 500);

function getLocalStorageKeysAsJSON() {
    return Array.from({ length: localStorage.length }, (_, i) => {
        const key = localStorage.key(i);
        return { [key]: localStorage.getItem(key) };
    }).reduce((acc, curr) => Object.assign(acc, curr), {});
}

function writeUserData(save_data) {
    set(ref(database, `users/${usertoken}/localstorageData`), save_data);
}
