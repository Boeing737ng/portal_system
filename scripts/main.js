let currentUserType;
let student = new Student;
let professor = new Professor;
let subject = new Subject;
let subjectTaken = new SubjectTaken;

firebase.auth().onAuthStateChanged(function (user){
    if (user) {
        var userEmail = getSignInEmail();
        var id = userEmail.split('@')[0];
        if(id === "admin") {
            currentUserType = 'admin';
            document.getElementById('id-span').textContent = 'admin';
            document.getElementById('user-type-span').textContent = '학사 담당자';
        } else {
            if(id.length == 6) {
                firebase.database().ref().child('users/professor').on('value', function(snapshot) {
                    currentUserType = snapshot.val()[id].type;
                    document.getElementById('id-span').textContent = snapshot.val()[id].professorNumber;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;

                    professor.setName(snapshot.val()[id].name);
                    professor.setProfessorNo(snapshot.val()[id].professorNumber);
                });
            } else {
                //student = new Student;
                firebase.database().ref().child('users/student').on('value', function(snapshot) {
                    currentUserType = snapshot.val()[id].type;
                    document.getElementById('id-span').textContent = snapshot.val()[id].studentNumber;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;

                    student.setName(snapshot.val()[id].name);
                    student.setStudentNo(snapshot.val()[id].studentNumber);
                    student.setBirthDate(snapshot.val()[id].birthDate);
                    student.setDepartment(snapshot.val()[id].department);
                    student.setUserType(snapshot.val()[id].type);
                    student.setState(snapshot.val()[id].currentState);
                    student.viewMyInfo();
                }); 
            }
        }
    }
});

function viewSelectedSection(index) {
    if(currentUserType === 'admin') {
        if(index > 2) {
            alert("권한이 없습니다.");
            return;
        } else {
            if(index === 1) {
                student.viewStudentsDetail();
            }
        }
    } else if(currentUserType === 'professor') {
        if(index < 3 || index > 4) {
            alert("권한이 없습니다.");
            return;
        } else if(index === 3) {
            subject.setSelectSubjectField();
        } else if(index === 4) {
            subject.viewProfessorSubjectList();
        }
    } else {
        if(index < 5) {
            alert("권한이 없습니다.");
            return;
        } else if(index === 6) {
            subject.viewStudentSubjectTimeTable(student.getStudentNo());
        } else if(index === 7) {
            subject.displayAvailableSubejectsList();
            subject.displayAppliedSubjectsList(student.getStudentNo());
        } else if(index === 8) {
            subjectTaken.displayStudentGrade(student.getStudentNo());
        }
    }
    var section = document.getElementsByClassName('main-view-content');
    for(var i = 0; i < section.length; i++) {
        section[i].style.display = 'none';
    }
    section[index].style.display = 'block';
}

$(document).ready(function() {
    $('.option-button').on('click', function() {
        var pageIndex = $('.option-button').index(this);
        viewSelectedSection(pageIndex);
    });
    $('.choose-type').click(function() {
        $('.userInfo').val('');
    });
    $('#add-subject-button').on('click', function() {
        $('#register-subject-section').css('display','block');
        $('#modify-subject-section').css('display','none');
    });
    $('#modifiy-subject-button').on('click', function() {
        document.getElementById("manage-subject-list").innerHTML = '';
        $('#register-subject-section').css('display','none');
        $('#modify-subject-section').css('display','block');
        subject.viewSubjectsDetail();
    });
    $('#enable-state-input').on('click', function() {
        var display = $('#state-input-container').css('display');
        if(display === 'none') {
            $('#state-input-container').css('display','block');
        } else {
            $('#state-input-container').css('display','none');
        }
    });
});