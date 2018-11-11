class Subjects extends Semester {
    constructor(subject_name, subject_num, subject_time, subject_plan, professor, subject_grade, year, month) {
        super(year, month)

        this.subject_name = subject_name
        this.subject_num = subject_num
        this.subject_time = subject_time
        this.subject_plan = subject_plan
        this.professor = professor
        this.subject_grade = subject_grade
    }

    openRegisterPage() {

    }

    openModifyPage() {

    }

    registerSubject() {
        
    }

    removeSubject() {

    }
}