class Semester {
    constructor(year, semester) {
        this.year = year
        this.semester = semester
    }

    setYear(year) {
        this.year = year;
    }

    setSemester(semester) {
        this.semester = semester;
    }

    getYear() {
        return this.year
    }

    getSemester() {
        return this.semester
    }
}