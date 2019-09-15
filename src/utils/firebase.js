// Adds functionality for creating and logging into the application

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDm-MuMfMTfLEon_tUB4Vw2Hy6unaE6-I",
    authDomain: "safebike-15d63.firebaseapp.com",
    databaseURL: "https://safebike-15d63.firebaseio.com",
    projectId: "safebike-15d63",
    storageBucket: "",
    messagingSenderId: "832976793088",
    appId: "1:832976793088:web:04ae41016c6474f65d32e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const txtEmail = document.getElementById("emailField");
const txtPassword = document.getElementById("passwordField");
const btnLogin = document.getElementById("loginButton");
const btnSignUp = document.getElementById("signUpButton");
const btnLogOut = document.getElementById("logOutButton");
const btnCreateParticipant = document.getElementById("createParticipant");
const btnCreateVolunteer = document.getElementById("createVolunteer");

// Add Login Event
if (btnLogin) {
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));
    });
}

function saveUserData(role, email, password) {
    console.log(role, email, password);
        const auth = firebase.auth();
        //Sign in
        auth.createUserWithEmailAndPassword(email,password).then(function(firebaseUser) {
            auth.onAuthStateChanged(function(user) {
                console.log(user.uid);
                writeUserData(user.uid, email, role)
            });
        });
}

function writeUserData(userId, email, role) {
    console.log("user" + userId)
    firebase.database().ref('users/' + userId).set({
      userId,
      email,
      role
    });

    if(role == "volunteer") {
        window.document.location = 'volunteer.html';
    } else {
        window.document.location = 'biker.html';
    }
}

// Go to sign up page
if (btnSignUp) {
    btnSignUp.addEventListener('click', e => {
        window.document.location = 'signup.html';
    });
}

// Add Logout Function
if (btnLogOut) {
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });
}

console.log(window.location.href);

// Realtime Listener
console.log("Firebase loaded");
