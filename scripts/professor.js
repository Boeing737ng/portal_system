class Professor extends User {
    constructor(name, professorNo, birthDate, department, type) {
        super(name, professorNo, professorNo, type, birthDate)

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
    getBirthDate() { return this.birthDate }

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