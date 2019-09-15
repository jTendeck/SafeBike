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
        const alertRef = firebase.database().ref("user/" + user.uid);

        alertRef.once("value", function(snap) {
        var email = snap.email;
        console.log(user.uid);
      });
    } else {
        console.log("No user")
    }
  });