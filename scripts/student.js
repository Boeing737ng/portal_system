class Student extends User {
    constructor(name, id, pwd, type, department, student_num, student_state) {
        super(name, id, pwd, type)

        this.department = department
        this.student_num = student_num
        this.student_state = student_state
        state_history = []
    }
    // Getter
    getName() { return this.name }
    getType() { return this.type }
    getDepartment() { return this.departmen }
    getStudentNum() { return this.student_num }
    getStudentState() { return this.student_state }

    // Change student's current state
    changeStudentState(new_state) {
        this.student_state = new_state
        this.saveStateChangedHistory(new_state)
    }

    // Saves student's state history
    saveStateChangedHistory(new_state) {
        state_history.push(new_state)
    }

}