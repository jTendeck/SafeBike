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

    const alertRef = database.ref("alerts/");
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
        alertRef.push({type: alertType}).then(function() {
            console.log(alertType);
                alertRef.on("value", function(snap) {
                    var keys = Object.keys(snap.val());
                    var k = keys[keys.length - 1];
                    alert = snap.val()[k].type;
                    alertPanel.innerHTML = alert;
                })
        });
    }
};