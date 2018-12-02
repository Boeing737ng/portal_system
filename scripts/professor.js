class Professor extends User {
    constructor(name, id, pwd, type, birthDate, department, professorNo) {
        super(name, id, pwd, type, birthDate)

        this.professorNo = professorNo
        this.department = department
        this.subject = []
    }
    // Getter
    getName() { return this.name }
    getProfessorNo() { return this.professorNo }
    getDepartment() { return this.department }
    getSubjectList() { return this.subject }
    getUserType() { return this.type }

    onRequestGradeManagement() {

    }

    onReuqestLecturePlanManagement() {

    }

    registerGrade() {

    }

    registerLecturePlan() {

    }

    removeLecturePlan() {
        
    }
}