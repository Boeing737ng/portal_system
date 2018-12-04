class Student extends User {
    constructor(name, studentNo, birthDate, department, type, state) {
        super(name, studentNo, studentNo, type, birthDate)

        this.department = department
        this.studentNo = studentNo
        this.studentState = state;

        this.stateHistory = []
    }
    // Setter
    setName(name) {
        this.name = name;
    }
    setStudentNo(num) {
        this.studentNo = num;
    }
    setDepartment(dept) {
        this.department = dept;
    }
    setBirthDate(date) {
        this.birthDate = date;
    }
    setState(state) {
        this.studentState = state;
    }
    setUserType(type) {
        this.type = type;
    }

    // Getter
    getName() { return this.name }
    getStudentNo() { return this.studentNo }
    getDepartment() { return this.department }
    getBirthDate() { return this.birthDate }
    getStudentState() { return this.studentState }
    getUserType() { return this.type }

    handleStateChange() {
        var state = document.getElementById('new-state').value;
        this.changeStudentState(state);
    }

    viewStudentsDetail() {
        student.createTableHeader();
        firebase.database().ref().child('users/student').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                student.createTableDataTag(element.val());
            })
        });
    }

    createTableHeader() {
        var obj = new Object();
        obj.name = '이름';
        obj.studentNumber  = '학번';
        obj.department = '소속학과';
        obj.birthDate = '생년월일'
        obj.currentState = '학적'
        this.createTableDataTag(obj)
    }

    createTableDataTag(data) {
        var table = document.getElementById('students-list');
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var deptTag = document.createElement('td');
        var birthTag = document.createElement('td');
        var stateTag = document.createElement('td');

        nameTag.textContent = data.name;
        numberTag.textContent = data.studentNumber;
        deptTag.textContent = data.department;
        birthTag.textContent = data.birthDate;
        stateTag.textContent = data.currentState;

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(deptTag);
        row.appendChild(birthTag);
        row.appendChild(stateTag);
        table.appendChild(row);
    }

    viewMyInfo() {
        document.getElementById('s-name').textContent = this.getName();
        document.getElementById('s-birth').textContent = this.getBirthDate();
        document.getElementById('s-num').textContent = this.getStudentNo();
        document.getElementById('s-dept').textContent = this.getDepartment();
        document.getElementById('s-state').textContent = this.getStudentState();
    }

    displayAvailableSubejectsList() {
        firebase.database().ref().child('subjects').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                if(element.val().semester === '1') {
                    student.createTableDataTag(element.val());
                }
            })
        });
    }

    createTableDataTag(data) {
        var subjectList = document.getElementById('a-subjects-list');
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

        nameTag.textContent = data.name;
        numberTag.textContent = data.number;
        timeTag.textContent = data.time;
        professorTag.textContent = data.professor;
        gradeTag.textContent = data.grade;
        yearTag.textContent = data.year;
        semesterTag.textContent = data.semester;
        applyButton.textContent = '저장';
        applyButtonContainer.appendChild(applyButton);

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(timeTag);
        row.appendChild(professorTag);
        row.appendChild(gradeTag);
        row.appendChild(yearTag);
        row.appendChild(semesterTag);
        row.appendChild(applyButtonContainer);
        subjectList.appendChild(row);
    }

    onRequestLectureTimeTable() {

    }

    lectureApplication() {

    }

    onRequestSubjectGrade() {

    }

    onRequestFinancePage() {

    }

    // Change student's current state
    changeStudentState(newState) {
        var id = getSignInEmail().split('@')[0];
        var modifiedState = {
            currentState: newState 
        }
        firebase.database().ref('/users/student/' + id + '/').update(modifiedState)
        .then(function(success) {
            alert('학적 정보가 변경되었습니다.');
        });
        this.studentState = newState
        this.saveStateChangedHistory(newState)
    }

    // Saves student's state history
    saveStateChangedHistory(newState) {
        this.stateHistory.push(newState)
    }
}
var student = new Student;