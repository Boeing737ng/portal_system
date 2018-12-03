let currentUserType;

firebase.auth().onAuthStateChanged(function (user){
    if (user) {
        var userEmail = getSignInEmail();
        var id = userEmail.split('@')[0];
        if(id === "admin") {
            currentUserType = 'admin';
            console.log(currentUserType);
            document.getElementById('id-span').textContent = 'admin';
            document.getElementById('user-type-span').textContent = '학사 담당자';
        } else {
            if(id.length == 6) {
                firebase.database().ref().child('users/professor').on('value', function(snapshot) {
                    currentUserType = snapshot.val()[id].type;
                    console.log(currentUserType);
                    document.getElementById('id-span').textContent = snapshot.val()[id].professorNumber;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;
                });
            } else {
                firebase.database().ref().child('users/student').on('value', function(snapshot) {
                    currentUserType = snapshot.val()[id].type;
                    console.log(currentUserType);
                    document.getElementById('id-span').textContent = snapshot.val()[id].studentNumber;
                    document.getElementById('user-type-span').textContent = snapshot.val()[id].name;
                }); 
            }
        }
    }
});

function viewSelectedSection(index) {
    let student = new Student;
    if(currentUserType === 'admin') {
        if(index > 2) {
            alert("권한이 없습니다.");
            return;
        } else {
            if(index === 1) {
                document.getElementById("students-list").innerHTML = '';
                student.viewStudentsDetail();
            }
        }
    } else if(currentUserType === 'professor') {
        if(index < 3 || index > 4) {
            alert("권한이 없습니다.");
            return;
        }
    } else {
        if(index < 5) {
            alert("권한이 없습니다.");
            return;
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
        document.getElementById("subjects-list").innerHTML = '';
        $('#register-subject-section').css('display','none');
        $('#modify-subject-section').css('display','block');
        subject.viewSubjectsDetail();
    });
});