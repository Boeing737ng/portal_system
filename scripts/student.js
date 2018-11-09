class Student extends User {
    constructor(name, id, pwd, type, department, student_num, student_state) {
        super(name, id, pwd, type)

        this.department = department
        this.student_num = student_num
        this.student_state = student_state
    }
}