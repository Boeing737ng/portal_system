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
        this.registerUser(userInfo);
    }

    createUserNo() {
        var userNo;
        var isStudent = document.getElementById('is-student');
        if(isStudent.checked) {
            firebase.database().ref().child('users/student').on('value', function(snapshot) {
                userNo = 201802000 + snapshot.numChildren();
                document.getElementById('user-number').value = userNo.toString();
            });
        } else {
            firebase.database().ref().child('users/professor').on('value', function(snapshot) {
                userNo = 201800 + snapshot.numChildren();
                document.getElementById('user-number').value = userNo.toString();
            });
        }

    }

    authentication(id, pwd) {
        firebase.auth().signInWithEmailAndPassword(id, pwd)
        .then(function(success) {
            console.log(success);
            window.location.href = 'mainView.html';
            return 1;
        })
        .catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
            alert('아이디 또는 비밀번호를 확인하세요.');
            return 0;
        });
    }

    registerUser(userInfo) {
        var isStudent = document.getElementById('is-student');
        var userEmail;
        if(isStudent.checked) {
            let student = new Student(
                userInfo[0].value,//이름
                userInfo[1].value,//학번
                userInfo[2].value,//생년월일
                userInfo[3].value,//소속학과
                "student",
                "재학",
                "no"
            );
            userEmail = student.getStudentNo() + '@portal.com';
            firebase.auth().createUserWithEmailAndPassword(
                userEmail, student.getStudentNo()
            ).then(function(success) {
                firebase.database().ref(
                    'users/student/' + userInfo[1].value
                ).set({
                    email: userEmail,
                    name: student.getName(),
                    type: student.getUserType(),
                    studentNumber: student.getStudentNo(),
                    department: student.getDepartment(),
                    birthDate: student.getBirthDate(),
                    currentState: student.getStudentState(),
                    scholarship: student.getScholarship()
                });
                alert("회원정보가 저장되었습니다.");
                $('.userInfo').val('');
                return 1;
            }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
                return 0;
            });
        } else {
            let professor = new Professor(
                userInfo[0].value,//이름
                userInfo[1].value,//교번
                userInfo[2].value,//생년월일
                userInfo[3].value,//소속학과
                "professor"
            );
            userEmail = professor.getProfessorNo() + '@portal.com';

            firebase.auth().createUserWithEmailAndPassword(
                userEmail, professor.getProfessorNo()
            ).then(function(success) {
                firebase.database().ref().child('subjects').on('value', function(snapshot) {
                    snapshot.forEach(function(element) {
                        if(element.val().professor === professor.getName()) {
                            firebase.database().ref(
                                'users/professor/' + professor.getProfessorNo() + '/subject/' + element.val().number
                                ).set({
                                    name: element.val().name,
                                    time: element.val().time,
                                    subjectNo: element.val().number,
                                    subjectPlan: element.val().plan,
                                    credit: element.val().credit,
                                    year: element.val().year,
                                    semester: element.val().semester
                            });
                        }
                    })
                });
                firebase.database().ref(
                    'users/professor/' + professor.getProfessorNo()
                ).update({
                    email: userEmail,
                    name: professor.getName(),
                    type: professor.getUserType(),
                    professorNumber: professor.getProfessorNo(),
                    department: professor.getDepartment(),
                    birthDate: professor.getBirthDate()
                });
                alert("회원정보가 저장되었습니다.");
                $('.userInfo').val('');
                return 1;
            }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
                return 0;
            });
        }
    }

    signOut() {
        if(confirm('로그아웃 하시겠습니까?')){
            firebase.auth().signOut()
                .then(function (success) {
                    console.log(success);
                    window.location.href = 'index.html';
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
}
var user = new User;