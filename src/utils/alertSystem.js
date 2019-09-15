var currentUser;


function gotData(data) {
    var scores = data.val();
    var keys = Object.keys(scores);
    console.log("HELLO KEYS:" + keys);
    for(var i; i < keys.length; i++) {
        var k = keys[i];
        var initials = scores[k].role;
        var score = scores[k].email;
        console.log(initials, score)
    }
}

function errData(err) {
    console.log("Error!");
    console.log(err);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("USER:" + user.uid);
        const alertRef = firebase.database().ref("users/" + user.uid);

        alertRef.once("value", function(snap) {
            if(snap == null) {
                console.log("null snap");
            } else {
                console.log("not null snap");
                console.log(snap.val());
            }
      });
    } else {
        console.log("No user")
    }
  });