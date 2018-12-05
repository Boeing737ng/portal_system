class SubjectTaken {
    constructor(grade) {
        this.grade = grade
    }

    applySubject(subjectNo) {
        var userEmail = getSignInEmail();
        var id = userEmail.split('@')[0];
        firebase.database().ref().child('subjects/' + subjectNo).once('value')
        .then(function(snapshot) {
            var professor = snapshot.val().professor;
            firebase.database().ref().child('users/professor').on('value', function(professorList) {
                professorList.forEach(function(element) {
                    if(element.val().name === professor) {
                        console.log(element.val().subject[subjectNo].subjectNo, subjectNo)
                        if(element.val().subject[subjectNo].subjectNo == subjectNo) {
                            console.log(element.val().professorNumber )
                            firebase.database().ref(
                                'users/professor/' 
                                + element.val().professorNumber 
                                + '/subject/' + subjectNo 
                                + '/students/' + student.getStudentNo() + '/'
                            ).set({
                                name: student.getName(),
                                number: student.getStudentNo(),
                                department: student.getDepartment(),
                                grade: '-'
                            }).then(function(success) {
                                firebase.database().ref(
                                    'users/student/' + id + '/subjects/' + subjectNo
                                ).set({
                                    name: snapshot.val().name,
                                    number: snapshot.val().number,
                                    time: snapshot.val().time,
                                    professor: snapshot.val().professor,
                                    credit: snapshot.val().credit,
                                    year: snapshot.val().year,
                                    semester: snapshot.val().semester,
                                }).then(function(success) {
                    
                                });
                                subject.displayAppliedSubjectsList(id);
                            });
                            student.createTableDataTag(element.val());
                        }
                    }
                })
            });
        });
        
    }

    removeAppliedSubject(subjectNo) {
        var id = student.getStudentNo();
        //document.getElementById("s-subjects-list").innerHTML = '';
        firebase.database().ref('users/student/' + id + '/subjects/').child(subjectNo).remove();
        subject.displayAppliedSubjectsList(id);
    }

    registerGrade() {

    }

    handleSavedGrade() {
        
    }
    viewStudentListForGrade() {
        document.getElementById("student-grade-list").innerHTML = '';
        firebase.database().ref().child('users/student/').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                if(ele)
                subject.createTableDataTag(element.val());
            })
        });
    }

    createTableDataTag(data) {
        var studentList = document.getElementById('student-grade-list');
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var deptTag = document.createElement('td');
        var creditTag = document.createElement('td');
        var selectTag = document.createElement('td');
        var select = document.createElement('select');
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');
        var option4 = document.createElement('option');
        var option5 = document.createElement('option');
        var option6 = document.createElement('option');
        var option7 = document.createElement('option');
        var option8 = document.createElement('option');
        var option9 = document.createElement('option');

        option1.value = 'A+';
        option2.value = 'A0';
        option3.value = 'B+';
        option4.value = 'B0';
        option5.value = 'C+';
        option6.value = 'C0';
        option7.value = 'D+';
        option8.value = 'D0';
        option9.value = 'F';

        option1.textContent = 'A+';
        option2.textContent = 'A0';
        option3.textContent = 'B+';
        option4.textContent = 'B0';
        option5.textContent = 'C+';
        option6.textContent = 'C0';
        option7.textContent = 'D+';
        option8.textContent = 'D0';
        option9.textContent = 'F';

        nameTag.textContent = data.name;
        numberTag.textContent = data.studentNumber;
        deptTag.textContent = data.department;
        creditTag.textContent = data.credit;
        select.id = data.studentNumber;

        selectTag.appendChild(select);
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
        select.appendChild(option5);
        select.appendChild(option6);
        select.appendChild(option7);
        select.appendChild(option8);
        select.appendChild(option9);
        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(deptTag);
        row.appendChild(creditTag);
        row.appendChild(selectTag);
        studentList.appendChild(row);
    }

    displayLectureTimeTable() {
        
    }
}