var currentUser;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userAlertRef = firebase.database().ref("users/" + user.uid);

        userAlertRef.once("value", function(snap) {
            if(snap == null) {
                console.log("null snap");
            } else {
                currentUser = snap.val();
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
        userAlertRef.push({type: alertType}).then(function() {
            console.log(alertType);
            if(alertPanel) {
                
                userAlertRef.on("value", function(snap) {
                    
                    let alert = JSON.stringify(snap.val().type);
                    alertPanel.innerHTML = alert;
                })
            }
        });
    }
};