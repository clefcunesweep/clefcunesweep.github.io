// hippity hoppity your code is now  my property
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// inhumane code surgery
const usertoken = localStorage.getItem("clefcune_usertoken");

function loadLocalStorageData() {
    const userRef = ref(database, `users/${usertoken}/localstorageData`);
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data !== null) {
            const localStorageData = JSON.parse(data);
            Object.keys(localStorageData).forEach((key) => {
                localStorage.setItem(key, localStorageData[key]);
            });
        }
    }, { onlyOnce: true });
}

function saveLocalStorageData() {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
    }
    const userRef = ref(database, `users/${usertoken}/localstorageData`);
    console.log(localStorageData);
    set(userRef, JSON.stringify(localStorageData));
}

// Load local storage data on page load
loadLocalStorageData();

// Save local storage data every 0.5 seconds
setInterval(saveLocalStorageData, 500);
