class SubjectTaken {
    constructor(grade) {
        this.grade = grade
    }

    applySubject(subjectNo) {
        var userEmail = getSignInEmail();
        var id = userEmail.split('@')[0];

        firebase.database().ref().child('subjects/' + subjectNo).once('value')
        .then(function(snapshot) {
            firebase.database().ref(
                'users/student/' + id + '/subjects/' + subjectNo
            ).set({
                name: snapshot.val().name,
                number: snapshot.val().number,
                time: snapshot.val().time,
                professor: snapshot.val().professor,
                grade: snapshot.val().grade,
                year: snapshot.val().year,
                semester: snapshot.val().semester,
            });
            subject.displayAppliedSubjectsList(id);
        });
        
    }

    removeAppliedSubject(subjectNo) {
        var id = student.getStudentNo();
        //document.getElementById("s-subjects-list").innerHTML = '';
        firebase.database().ref('users/student/' + id + '/subjects/').child(subjectNo).remove();
        subject.displayAppliedSubjectsList(id);
    }

    registerSelectedSubject() {
        
    }

    removeSelectedSubject() {

    }

    displayLectureTimeTable() {
        
    }
}