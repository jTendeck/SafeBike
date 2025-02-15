var currentUser;



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userAlertRef = firebase.database().ref("users/" + user.uid);

        userAlertRef.once("value", function(snap) {
            if(snap == null) {
                console.log("null snap");
            } else {
                currentUser = snap.val();

                    if(currentUser.role == "volunteer") {
                        console.log("currentUser: " + currentUser.role);
                        showAlerts();
                    }
                dbLoaded();
            }
      });
    } else {
        console.log("No user")
    }
  });

function dbLoaded() {

    const userAlertRef = database.ref("alerts/");
    const medButton = document.getElementById("med-btn");
    const repairButton = document.getElementById("repair-btn");
    const waterButton = document.getElementById("water-btn");
    const alertPanel = document.getElementById("req-info");
    var confirmButton = document.getElementById("confirm-btn");
    var emergencyType;
    
    userAlertRef.remove();
    if (medButton && repairButton && waterButton && confirmButton) {
        medButton.addEventListener('click', e => {
            emergencyType = medButton.value;
        });

        repairButton.addEventListener('click', e => {
            emergencyType = repairButton.value;
        });

        waterButton.addEventListener('click', e => {
            emergencyType = waterButton.value;
        });

        confirmButton.addEventListener('click', e => {
            sendAlert(emergencyType);
        });
    }

    function sendAlert(alertType) {
        userAlertRef.push({type: alertType, email: currentUser.email});
    }
};


function showAlerts() {
    const alertPanel = document.getElementById("req-info");

    if(alertPanel) {
        getAlerts();
    }

}

// $(document).ready(function() {

//     const alertPanel = document.getElementById("acp");

// });


function getAlerts() {
    var ref = firebase.database().ref("alerts");


      ref.on("value", function(snap) {
      var alerts = snap.val();
      showAlertList(alerts);
});
}


function showAlertList(alerts) {
    const alertPanel = document.getElementById("req-info");
    if(alertPanel) {


        for (var prop in alerts) {
            displayAlertType(prop, alertPanel);
        }
    }
}


function displayAlertType(alertID, alertPanel) {
    var ref = firebase.database().ref("alerts/" + alertID);
    ref.on("value", function(snap) {
        console.log("alert list" + snap.val());
        alertPanel.innerHTML =  '<div class="alert alert-danger" role="alert"  style="font-size:2rem">Emergency received from ' +
        snap.val().email + '. Type: ' +
  snap.val().type + '</div>';
    });
    
}




