class Student extends User {
    constructor(name, studentNo, birthDate, department, type, state, scholarship) {
        super(name, studentNo, studentNo, type, birthDate)

        this.department = department
        this.studentNo = studentNo
        this.studentState = state;
        this.scholarship = scholarship
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
    getScholarship() { return this.scholarship }

    handleStateChange() {
        var state = document.getElementById('new-state').value;
        this.changeStudentState(state);
    }

    viewStudentsDetail() {
        document.getElementById("students-list").innerHTML = '';
        firebase.database().ref().child('users/student').on('value', function(snapshot) {
            snapshot.forEach(function(element) {
                student.createTableDataTag(element.val());
            })
        });
    }

    createTableDataTag(data) {
        var studentList = document.getElementById('students-list');
        var row = document.createElement('tr');
        var nameTag = document.createElement('td');
        var numberTag = document.createElement('td');
        var deptTag = document.createElement('td');
        var birthTag = document.createElement('td');
        var stateTag = document.createElement('td');
        var scholarshipTag = document.createElement('td');
        var buttonContainer = document.createElement('td');
        var scholarshipButton = document.createElement('button');

        nameTag.textContent = data.name;
        numberTag.textContent = data.studentNumber;
        deptTag.textContent = data.department;
        birthTag.textContent = data.birthDate;
        stateTag.textContent = data.currentState;
        scholarshipTag.textContent = data.scholarship;
        if(data.scholarship === 'yes') {
            scholarshipButton.textContent = '장학취소';
            scholarshipButton.style.borderColor = '#F15F5F';
        } else {
            scholarshipButton.textContent = '장학등록';
            scholarshipButton.style.borderColor = '#6B9900';
        }
        scholarshipButton.setAttribute('onclick','finance.modifyScholarshipStudent('+ data.studentNumber +');');

        row.appendChild(nameTag);
        row.appendChild(numberTag);
        row.appendChild(deptTag);
        row.appendChild(birthTag);
        row.appendChild(stateTag);
        row.appendChild(scholarshipTag);
        row.appendChild(buttonContainer);
        buttonContainer.appendChild(scholarshipButton);
        studentList.appendChild(row);
    }

    viewMyInfo() {
        document.getElementById('s-name').textContent = this.getName();
        document.getElementById('s-birth').textContent = this.getBirthDate();
        document.getElementById('s-num').textContent = this.getStudentNo();
        document.getElementById('s-dept').textContent = this.getDepartment();
        document.getElementById('s-state').textContent = this.getStudentState();
    }

    onRequestLectureTimeTable() {

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
            document.getElementById('s-state').textContent = student.getStudentState();
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
//var student = new Student;