class User {
    constructor(name, id, pwd, type, birthDate) {
        this.name = name
        this.id = id
        this.pwd = pwd
        this.type = type
        this.birthDate = birthDate
    }

    handleLoginData() {
        var id = document.getElementById('id').value+'@portal.com';
        var pwd = document.getElementById('pwd').value;
        this.authentication(id, pwd);
    }

    handleCreateUserData() {
        var userInfo = document.getElementsByClassName('userInfo');
        registerUser(userInfo);
    }

    authentication(id, pwd) {
        firebase.auth().signInWithEmailAndPassword(id, pwd)
        .then(function(success) {
            console.log(success)
        })
        .catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    registerUser(userInfo) {
        var isStudent = document.getElementById('isStudent');
        if(isStudent.checked) {
            let student = new Student(
                userInfo[0].value,//이름
                userInfo[1].value,//학번
                userInfo[3].value,//생년월일
                userInfo[4].value,//소속학과
                "student"
            );
            firebase.auth().createUserWithEmailAndPassword(
                student.getStudentNum() + '@portal.com', student.getStudentNum()
            ).then(function(success) {
                firebase.database().ref(
                    'users/' + 'student/' + student.getName()
                ).set({
                    name: student.getName(),
                    type: student.getUserType(),
                    studentNumber: student.getStudentNo(),
                    department: student.getDepartment(),
                    birthDate: student.getBirthDate(),
                    currentState: student.getStudentState()
                });
                console.log(success)
            }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        } else {
            let professor = new Professor(
                userInfo[0].value,//이름
                userInfo[1].value,//교번
                userInfo[2].value,//생년월일
                userInfo[3].value,//소속학과
                "professor"
            );
            firebase.auth().createUserWithEmailAndPassword(
                professor.getProfessorNo() + '@portal.com', professor.getProfessorNo()
            ).then(function(success) {
                firebase.database().ref(
                    'users/' + 'professor/' + professor.getName()
                ).set({
                    name: professor.getName(),
                    type: professor.getUserType(),
                    professorNumber: professor.getProfessorNo(),
                    department: professor.getDepartment(),
                    birthDate: professor.getBirthDate()
                });
                console.log(success)
            }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }
    }

    signOut() {
        
    }
}
var test = new User;