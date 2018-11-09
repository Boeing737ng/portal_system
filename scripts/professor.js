class Professor extends User {
    constructor(name, id, pwd, type, department, subject) {
        super(name, id, pwd, type)
        this.department = department
        this.subject = subject
    }
}