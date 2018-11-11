class Finance extends Semester {
    constructor(tuition_fee, scholarship, is_scholarship_student, year, semester) {
        super(year, semester)

        this.tuition_fee = tuition_fee
        this.scholarship = scholarship
        this.is_scholarship_student = is_scholarship_student
    }

    modifyScholarshipState() {
        
    }
}