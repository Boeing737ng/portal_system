class Finance extends Semester {
    constructor(tuition_fee, scholarship, is_scholarship_student, year, semester) {
        super(year, semester)

        this.tuition_fee = tuition_fee
        this.scholarship = scholarship
        this.is_scholarship_student = is_scholarship_student
    }
    
    modifyScholarshipStudent(studentNo) {
        firebase.database().ref().child('users/student/' + studentNo).once('value', function(snapshot) {
            if(snapshot.val().scholarship === 'yes'){
                document.getElementById("students-list").innerHTML = '';
                firebase.database().ref('users/student/' + studentNo).update({
                    scholarship: 'no'
                });
            } else {
                document.getElementById("students-list").innerHTML = '';
                firebase.database().ref('users/student/' + studentNo).update({
                    scholarship: 'yes'
                });
            }
        });
    }

    setStudentFinanceTable(id) {
        let tuitionFee = document.getElementById('tuition-fee').textContent;
        console.log(tuitionFee)
        firebase.database().ref().child('users/student/' + id).once('value', function(snapshot) {
            if(snapshot.val()['scholarship'] == 'yes') {
                document.getElementById('scholarship-fee').textContent = tuitionFee;
                document.getElementById('total-fee').textContent = '0';
            } else {
                document.getElementById('scholarship-fee').textContent = '0';
                document.getElementById('total-fee').textContent = tuitionFee;
            }
        });
    }
}