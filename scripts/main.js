firebase.auth().onAuthStateChanged(function (user){
    if (user) {
        var userEmail = getSignInEmail();
        var id = userEmail.split('@')[0];
        if(id === "admin") {
            document.getElementById('id-span').textContent = 'admin';
            document.getElementById('user-type-span').textContent = '학사 담당자';
        } else {
            if(id.length == 6) {
                firebase.database().ref().child('users/professor').on('value', function(snapshot) {
                    document.getElementById('id-span').textContent = snapshot.val()[id].id;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;
                });
            } else {
                firebase.database().ref().child('users/student').on('value', function(snapshot) {
                    document.getElementById('id-span').textContent = snapshot.val()[id].id;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;
                }); 
            }
        }
    }
});

function getUserType() {
    var user = firebase.auth().currentUser;
    var email = user.email;
    var id = email.split('@')[0];
    if(id === 'admin') {
        return 'admin';
    }
    if(id.length == 6) {
        firebase.database().ref().child('users/professor').on('value', function(snapshot) {
            console.log(snapshot.val()[id].type);
        });
    } else {
        firebase.database().ref().child('users/student').on('value', function(snapshot) {
            console.log(snapshot.val()[id].type);
        }); 
    }
}