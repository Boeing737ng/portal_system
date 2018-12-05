class Subject extends Semester {
    constructor(subject_name, subject_num, subject_time, professor, credit, year, semester) {
        super(year, semester)

        this.subject_name = subject_name
        this.subject_num = subject_num
        this.subject_time = subject_time
        this.professor = professor
        this.credit = credit
    }

    setSubjectNo(subjectNo) {
        this.subject_num = subjectNo;
    }

    getSubjectName() { return this.subject_name }
    getSubjectNum() { return this.subject_num }
    getSubjectTime() { return this.subject_time }
    getProfessor() { return this.professor }
    getSubjectCredit() { return this.credit }
    getSubjectYear() { return this.year }
    getSubjectSemester() { return this.semester }

    handleCreateSubject() {
        var subjectInfo = document.getElementsByClassName('subject-info');
        this.registerSubject(subjectInfo);
    }

    handleModifySubjectPlan() {
        var subjectNo = document.getElementById('professor-subject-no').value;
        var subjectPlan = document.getElementById('subject-plan').value;
        this.modifySubjectPlan(subjectNo, subjectPlan);
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
            credit: subjectInfo[4].value,
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
            credit: subject.getSubjectCredit(),
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

    viewStudentSubjectTimeTable(id) {
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
        var creditTag = document.createElement('td');
        var yearTag = document.createElement('td');
        var semesterTag = document.createElement('td');

        nameTag.textContent = data.name;
        numberTag.textContent = data.number;
        timeTag.textContent = data.time;
        professorTag.textContent = data.professor;
        creditTag.textContent = data.credit;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(timeTag);
        row.appendChild(professorTag);
        row.appendChild(creditTag);
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
        var creditTag = document.createElement('td');
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
        nameTag.setAttribute('onmouseover','subject.openSubjectPlanModal(' + data.number + ');');
        nameTag.setAttribute('onmouseleave','subject.hidePlanModal();');
        nameTag.className = 'subject-name';
        numberTag.textContent = data.number;
        timeTag.textContent = data.time;
        professorTag.textContent = data.professor;
        creditTag.textContent = data.credit;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(timeTag);
        row.appendChild(professorTag);
        row.appendChild(creditTag);
        row.appendChild(yearTag);
        row.appendChild(semesterTag);
        row.appendChild(applyButtonContainer);
        applyButtonContainer.appendChild(applyButton);
        subjectList.appendChild(row);
    }

    modifySubjectPlan(subjectNo, text) {
        firebase.database().ref('/subjects/' + subjectNo).update({
            subjectPlan: text
        });
        firebase.database().ref('users/professor/' + professor.getProfessorNo() + '/subject/' + subjectNo).update({
            subjectPlan: text
        }).then(function(success) {
            alert('강의계획 내용이 저장되었습니다.');
            $('.subject-plan-input').val('');
        });
    }

    viewProfessorSubjectList() {
        document.getElementById("professor-subject-list").innerHTML = '';
        firebase.database().ref().child('users/professor/' + professor.getProfessorNo() + '/subject/').on('value', function(snapshot) {
            document.getElementById("professor-subject-list").innerHTML = '';
            snapshot.forEach(function(element) {
                subject.createProfessorSubjectTable(element.val());
            })
        });
    }

    createProfessorSubjectTable(data) {
        var subjectList = document.getElementById('professor-subject-list');
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var planTag = document.createElement('td');

        nameTag.textContent = data.name;
        numberTag.textContent = data.subjectNo;
        planTag.textContent = data.subjectPlan;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(planTag);
        subjectList.appendChild(row);
    }

    setSelectSubjectField() {
        var selectSubject = document.getElementById('select-subject');
        firebase.database().ref().child('users/professor/' + professor.getProfessorNo() + '/subject/').once('value', function(snapshot) {
            var defaultOption = document.createElement('option');
            defaultOption.textContent = '과목선택';
            selectSubject.appendChild(defaultOption);
            snapshot.forEach(function(element) {
                var option = document.createElement('option');
                option.value = element.val().subjectNo;
                option.textContent = element.val().name;
                selectSubject.appendChild(option);
            })
        });
    }

    openSubjectPlanModal(subjectNo) {
        document.getElementById('subjectPlanModal').style.display = 'block';
        firebase.database().ref().child('subjects/' + subjectNo).on('value', function(snapshot) {
            document.getElementById('planText').textContent = snapshot.val().subjectPlan;
        });
    }

    hidePlanModal() {
        document.getElementById('subjectPlanModal').style.display = 'none';
    }
}