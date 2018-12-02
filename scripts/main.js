firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userEmail = getSignInEmail();
        if(userEmail === "admin@portal.com") {
            firebase.database().ref().child('users/admin/').on('value', function(snapshot) {
                document.getElementById('id-span').textContent = snapshot.val().id;
                document.getElementById('user-type-span').textContent = snapshot.val().name;
            })
        } else {
            firebase.database().ref().child('users/' + userEmail + '/').on('value', function(snapshot) {
                document.getElementById('id-span').textContent = snapshot.val().id;
                document.getElementById('user-type-span').textContent = snapshot.val().name;
            })
        }
    }
});