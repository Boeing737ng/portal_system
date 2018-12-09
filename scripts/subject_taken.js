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
            firebase.database().ref().child('users/professor').once('value', function(professorList) {
                professorList.forEach(function(element) {
                    if(element.val().name === professor) {
                        if(element.val().subject[subjectNo].subjectNo == subjectNo) {
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
                                    grade: '-'
                                }).then(function(success) {
                    
                                });
                                subject.displayAppliedSubjectsList(id);
                            });
                            //student.createTableDataTag(element.val());
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
        subject.getSubjectNum();
        var gradeList = document.getElementsByClassName('subject-grade');
        var length = gradeList.length; // fix the length to prevent increment of length by firebase update
        for(var i = 0; i < length; i++) {
            var grade = gradeList[i].value;
            var id = gradeList[i].id;
            firebase.database()
            .ref('users/professor/' + professor.getProfessorNo() + '/subject/' + subject.getSubjectNum() + '/students/' + id)
            .update({
                grade: grade
            });
            firebase.database()
            .ref('users/student/' + id + '/subjects/' + subject.getSubjectNum())
            .update({
                grade: grade
            });
        }
        alert('성적이 저장되었습니다.');
        subjectTaken.viewStudentListForGrade();
    }
    
    viewStudentListForGrade() {
        var selectedSubject = document.getElementById('select-subject').value;
        subject.setSubjectNo(selectedSubject);
        document.getElementById("student-grade-list").innerHTML = '';
        if(selectedSubject != '과목선택') {
            firebase.database().ref()
            .child('users/professor/' + professor.getProfessorNo() + '/subject/' + selectedSubject + '/students')
            .once('value', function(snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function(element) {
                    subjectTaken.createStudentListForGrade(element.val());
                })
            });
        }
    }

    createStudentListForGrade(data) {
        var studentList = document.getElementById('student-grade-list');
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var deptTag = document.createElement('td');
        var gradeTag = document.createElement('td');
        var selectTag = document.createElement('td');
        var select = document.createElement('select');
        var optionDefault = document.createElement('option');
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');
        var option4 = document.createElement('option');
        var option5 = document.createElement('option');
        var option6 = document.createElement('option');
        var option7 = document.createElement('option');
        var option8 = document.createElement('option');
        var option9 = document.createElement('option');

        optionDefault.setAttribute('selected','selected');
        option1.value = 'A+';
        option2.value = 'A0';
        option3.value = 'B+';
        option4.value = 'B0';
        option5.value = 'C+';
        option6.value = 'C0';
        option7.value = 'D+';
        option8.value = 'D0';
        option9.value = 'F';

        optionDefault.textContent = '-';
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
        numberTag.textContent = data.number;
        deptTag.textContent = data.department;
        gradeTag.textContent = data.grade;
        select.id = data.number;
        select.className = 'subject-grade';
        
        selectTag.appendChild(select);
        select.appendChild(optionDefault);
        select.appendChild(option1);
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
        row.appendChild(gradeTag);
        row.appendChild(selectTag);
        studentList.appendChild(row);
    }

    displayStudentGrade(id) {
        document.getElementById("subject-grade-list").innerHTML = '';
        firebase.database().ref().child('users/student/' + id + '/subjects/').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                subjectTaken.createTableDataTag(element.val());
            })
        });
    }

    createTableDataTag(data) {
        var subjectList = document.getElementById("subject-grade-list");
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var professorTag = document.createElement('td');
        var creditTag = document.createElement('td');
        var yearTag = document.createElement('td');
        var semesterTag = document.createElement('td');
        var gradeTag = document.createElement('td');

        nameTag.textContent = data.name;
        numberTag.textContent = data.number;
        professorTag.textContent = data.professor;
        creditTag.textContent = data.credit;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;
        gradeTag.textContent = data.grade;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(professorTag);
        row.appendChild(creditTag);
        row.appendChild(yearTag);
        row.appendChild(semesterTag);
        row.appendChild(gradeTag);
        subjectList.appendChild(row);
    }
}