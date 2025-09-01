// hippity hoppity your code is now my property
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
  import { getDatabase, ref, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAqPN9hEaytxeVnZUyk8C80DabNpJT5V5Q",
    authDomain: "sleeper-games-ce01e.firebaseapp.com",
    databaseURL: "https://sleeper-games-ce01e-default-rtdb.firebaseio.com",
    projectId: "sleeper-games-ce01e",
    storageBucket: "sleeper-games-ce01e.firebasestorage.app",
    messagingSenderId: "337164805904",
    appId: "1:337164805904:web:a9ed1c181617415ec26795", //leet
    measurementId: "G-X0VQ79BHZ0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);

  // inhumane code surgery
  const usertoken = localStorage.getItem("clefcune_usertoken");
  let start = false

onValue(ref(database, `users/${usertoken}/localstorageData`), (snapshot) => {
    const value = snapshot.val();
    
    // Check if value is null before parsing
    if (value !== null) {
        const parseValue = JSON.parse(value);
        let totalString = "";
        console.log(parseValue);
        console.log("Parsed Data:", Object.keys(parseValue));
        
        for (var i = 0; i < Object.keys(parseValue).length; i++) {
            const key = Object.keys(parseValue)[i];
            console.log(key);
            totalString += parseValue[key];
            console.log(totalString);
        }

        totalString = JSON.parse(totalString);
        console.log(totalString);
        console.log(Object.keys(totalString));
        
        for (var i = 0; i < Object.keys(totalString).length; i++) {
            const key = Object.keys(totalString)[i];
            console.log(key);
            localStorage.setItem(key, totalString[key]);
        }
    } else {
        console.warn("mhm, big nothingburger data");
    }
}, {
    onlyOnce: true
});


setInterval(function(){
    if (start == true){
        function getLocalStorageKeysAsJSON() {
            const keys = {};
            for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            keys[key] = localStorage.getItem(key);
            }
            return JSON.stringify(keys);
        }
        const combinedJSON = getLocalStorageKeysAsJSON();
        writeUserData(JSON.stringify(combinedJSON))
    }
}, 25)

function writeUserData(save_data) {
    set(ref(database, `users/${usertoken}/localstorageData`), save_data)
}
