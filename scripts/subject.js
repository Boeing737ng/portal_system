class Subject extends Semester {
    constructor(subject_name, subject_num, subject_time, professor, subject_grade, year, semester) {
        super(year, semester)

        this.subject_name = subject_name
        this.subject_num = subject_num
        this.subject_time = subject_time
        this.professor = professor
        this.subject_grade = subject_grade
    }

    getSubjectName() { return this.subject_name }
    getSubjectNum() { return this.subject_num }
    getSubjectTime() { return this.subject_time }
    getProfessor() { return this.professor }
    getSubjectGrade() { return this.subject_grade }
    getSubjectYear() { return this.year }
    getSubjectSemester() { return this.semester }

    handleCreateSubject() {
        var subjectInfo = document.getElementsByClassName('subject-info');
        this.registerSubject(subjectInfo);
    }

    createSubjectNo() {
        var subjectNo;
        firebase.database().ref().child('subjects').on('value', function(snapshot) {
            subjectNo = snapshot.numChildren() + 1;
            document.getElementById('subject-number').value = subjectNo.toString();
        });
    }

    removeSubject() {
        var subjectNo = document.getElementById("del-subject-no").value;
        if(subjectNo != '') {
            firebase.database().ref('subjects/').child(subjectNo).remove()
            .then(function(success) {
                $('#del-subject-no').val('');
                subject.viewSubjectsDetail();
            });
        } else {
            alert('과목번호를 입력해주세요.');
        }
    }

    modifySubject() {
        var subjectInfo = document.getElementsByClassName('m-subject-info');
        var modifiedSubjectInfo = {
            number: subjectInfo[0].value,
            name: subjectInfo[1].value,
            time: subjectInfo[2].value,
            professor: subjectInfo[3].value,
            grade: subjectInfo[4].value,
            year: subjectInfo[5].value,
            semester: subjectInfo[6].value,
        }
        firebase.database().ref('/subjects/' + subjectInfo[0].value + '/').update(modifiedSubjectInfo);
        $('.m-subject-info').val('');
        this.viewSubjectsDetail();
    }

    registerSubject(subjectInfo) {
        let subject = new Subject(
            subjectInfo[0].value,//과목명
            subjectInfo[1].value,//과목번호
            subjectInfo[2].value,//강의시간
            subjectInfo[3].value,//담당교수
            subjectInfo[4].value,//학점
            subjectInfo[5].value,//연도
            subjectInfo[6].value,//학기
        );
        firebase.database().ref(
            'subjects/' + subjectInfo[1].value
        ).set({
            name: subject.getSubjectName(),
            number: subject.getSubjectNum(),
            time: subject.getSubjectTime(),
            professor: subject.getProfessor(),
            grade: subject.getSubjectGrade(),
            year: subject.getSubjectYear(),
            semester: subject.getSubjectSemester()
        }).then(function(success) {
            alert("과목정보가 저장되었습니다.");
            $('.subject-info').val('');
        });
    }

    viewSubjectsDetail() {
        document.getElementById("manage-subject-list").innerHTML = '';
        firebase.database().ref().child('subjects').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                subject.createTableDataTag(element.val(), 'selectAll');
            })
        });
    }

    viewStudentSubject(id) {
        document.getElementById("student-subject-list").innerHTML = '';
        firebase.database().ref().child('users/student/' + id + '/subjects/').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                subject.createTableDataTag(element.val(), 'isTaken');
            })
        });
    }

    createTableDataTag(data, option) {
        var subjectList; 
        if(option === 'selectAll') {
            subjectList = document.getElementById('manage-subject-list');
        } else {
            subjectList = document.getElementById('student-subject-list');
        }
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var timeTag = document.createElement('td');
        var professorTag = document.createElement('td');
        var gradeTag = document.createElement('td');
        var yearTag = document.createElement('td');
        var semesterTag = document.createElement('td');

        nameTag.textContent = data.name;
        numberTag.textContent = data.number;
        timeTag.textContent = data.time;
        professorTag.textContent = data.professor;
        gradeTag.textContent = data.grade;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(timeTag);
        row.appendChild(professorTag);
        row.appendChild(gradeTag);
        row.appendChild(yearTag);
        row.appendChild(semesterTag);
        subjectList.appendChild(row);
    }

    displayAvailableSubejectsList() {
        document.getElementById("a-subjects-list").innerHTML = '';
        firebase.database().ref().child('subjects').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                if(element.val().semester === '1') {
                    subject.createTableForRegiserSubject(element.val(),'all');
                }
            })
        });
    }

    displayAppliedSubjectsList(id) {
        console.log(id)
        document.getElementById("s-subjects-list").innerHTML = '';
        firebase.database().ref().child('users/student/'+id+'/subjects/').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                subject.createTableForRegiserSubject(element.val(), 'sel');
            })
        });
    }

    createTableForRegiserSubject(data, option) {
        var subjectList;
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var timeTag = document.createElement('td');
        var professorTag = document.createElement('td');
        var gradeTag = document.createElement('td');
        var yearTag = document.createElement('td');
        var semesterTag = document.createElement('td');
        var applyButtonContainer = document.createElement('td');
        var applyButton = document.createElement('button');

        if(option === 'all') {
            subjectList = document.getElementById('a-subjects-list');
            applyButton.textContent = '저장';
            applyButton.setAttribute("onclick","subjectTaken.applySubject("+ data.number +");");
        } else {
            subjectList = document.getElementById('s-subjects-list');
            applyButton.textContent = '삭제';
            applyButton.setAttribute("onclick","subjectTaken.removeAppliedSubject("+ data.number +");");
        }

        nameTag.textContent = data.name;
        numberTag.textContent = data.number;
        timeTag.textContent = data.time;
        professorTag.textContent = data.professor;
        gradeTag.textContent = data.grade;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(timeTag);
        row.appendChild(professorTag);
        row.appendChild(gradeTag);
        row.appendChild(yearTag);
        row.appendChild(semesterTag);
        row.appendChild(applyButtonContainer);
        applyButtonContainer.appendChild(applyButton);
        subjectList.appendChild(row);
    }
}