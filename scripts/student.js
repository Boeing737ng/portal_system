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