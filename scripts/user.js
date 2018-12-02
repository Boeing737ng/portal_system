class User {
    constructor(name, id, pwd, type) {
        this.name = name
        this.id = id
        this.pwd = pwd
        this.type = type
    }
    // 회원인증
    authentication(id, pwd) {

    }

    signOut() {
        
    }

    registerAdmin() {
        firebase.database().ref('users/' + "admin").set({
          id: "admin",
          password: "admin",
          name: "admin",
          type: "admin"
        });
    }
}
var test = new User;