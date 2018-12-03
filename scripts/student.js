class Student extends User {
    constructor(name, studentNo, birthDate, department, type) {
        super(name, studentNo, studentNo, type, birthDate)

        this.department = department
        this.studentNo = studentNo
        this.studentState = "attending";

        this.stateHistory = []
    }
    // Getter
    getName() { return this.name }
    getStudentNo() { return this.studentNo }
    getDepartment() { return this.department }
    getBirthDate() { return this.birthDate }
    getStudentState() { return this.studentState }
    getUserType() { return this.type }

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

    onRequestMyInfo() {

    }

    onRequestLectureTimeTable() {

    }

    onRequestLectureApplication() {

    }

    onRequestSubjectGrade() {

    }

    onRequestFinancePage() {

    }

    // Change student's current state
    changeStudentState(newState) {
        this.studentState = newState
        this.saveStateChangedHistory(newState)
    }

    // Saves student's state history
    saveStateChangedHistory(newState) {
        this.stateHistory.push(newState)
    }
}
var student = new Student;