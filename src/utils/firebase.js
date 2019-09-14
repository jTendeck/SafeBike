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

const ref = database.ref("users/");

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
    
        //Sign in
<<<<<<< HEAD
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));
        setTimeout(writeUserData(email, role), 500);
=======
        auth.createUserWithEmailAndPassword(email,password).then(function(firebaseUser) {
        

        auth.onAuthStateChanged(function(user) {
        console.log(user.uid);
        writeUserData(auth.currentUser.uid, email, role)
        });
    });

>>>>>>> 0b6d4991e3187599939038c501b58d7a24b41fce
}

function writeUserData(email, role) {
    
    () => { firebase.database().ref('users/' + userId).set({
      userId: auth.currentUser.uid,
      email,
      role
    });
}
  }

// Add Create Account Event
if (btnCreateParticipant) {
    btnCreateParticipant.addEventListener('click', e => {
        saveUserData(btnCreateParticipant.value, txtEmail.value, txtPassword.value);
    });

    btnCreateVolunteer.addEventListener('click', e => {
        saveUserData(btnCreateVolunteer.value, txtEmail.value, txtPassword.value);
    });
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
