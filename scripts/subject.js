class Subject extends Semester {
    constructor(subject_name, subject_num, subject_time, professor, subject_grade, year, semester) {
        super(year, semester)

        this.subject_name = subject_name
        this.subject_num = subject_num
        this.subject_time = subject_time
        this.professor = professor
        this.subject_grade = subject_grade
    }

    getSubjectName() { return this.subject_name }
    getSubjectNum() { return this.subject_num }
    getSubjectTime() { return this.subject_time }
    getProfessor() { return this.professor }
    getSubjectGrade() { return this.subject_grade }
    getSubjectYear() { return this.year }
    getSubjectSemester() { return this.semester }

    handleCreateSubject() {
        var subjectInfo = document.getElementsByClassName('subject-info');
        this.registerSubject(subjectInfo);
    }

    createSubjectNo() {
        var subjectNo;
        firebase.database().ref().child('subjects').on('value', function(snapshot) {
            subjectNo = snapshot.numChildren() + 1;
            document.getElementById('subject-number').value = subjectNo.toString();
        });
    }

    registerSubject(subjectInfo) {
        let subject = new Subject(
            subjectInfo[0].value,//과목명
            subjectInfo[1].value,//과목번호
            subjectInfo[2].value,//강의시간
            subjectInfo[3].value,//담당교수
            subjectInfo[4].value,//학점
            subjectInfo[5].value,//연도
            subjectInfo[6].value,//학기
        );
        firebase.database().ref(
            'subjects/' + subjectInfo[1].value
        ).set({
            name: subject.getSubjectName(),
            number: subject.getSubjectNum(),
            time: subject.getSubjectTime(),
            professor: subject.getProfessor(),
            grade: subject.getSubjectGrade(),
            year: subject.getSubjectYear(),
            semester: subject.getSubjectSemester()
        }).then(function(success) {
            alert("과목정보가 저장되었습니다.");
            $('.subject-info').val('');
        });
    }
}
var subject = new Subject;