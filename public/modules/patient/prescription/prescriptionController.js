overSurgery.controller('prescriptionController', ['$scope', 'PatientService', function ($scope, PatientService) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.prescriptions = [];

    function init() {

        PatientService.getPatientPrescriptions($scope.patient_id).then(function (response) {
            response.data.forEach(function (prescription) {
                var clickable = false;

                if (prescription.name === 'active') {
                    var childrenExists = response.data.some(function (item) {
                        return item.name === 'pending' && item.previous_prescription_id == prescription.id;
                    });

                    clickable = !childrenExists;
                }

                $scope.prescriptions.push({
                    id: prescription.id,
                    expiration_date: prescription.expiration_date,
                    dose: prescription.dose,
                    renewable: prescription.renewable,
                    medicine_id: prescription.medicine_id,
                    medication: prescription.title,
                    status: prescription.name,
                    staff_id: prescription.staff_id,
                    previous_prescription_id: prescription.previous_prescription_id,
                    clickable: clickable,
                });
            });
        })
    }

    $scope.extendPrescription = function (prescription) {
        $scope.clicked = true;
        // Do backend connection
        PatientService.postPatientPrescriptions({
            renewable: prescription.renewable,
            expiration_date: "",
            dose: prescription.dose,
            staff_id: "",
            patient_id: $scope.patient_id,
            medicine_id: prescription.medicine_id,
            prescription_status_id: '2',
            previous_prescription_id: prescription.id
        }).then(function (response) {
            alert('Request to extend the prescription sent! Awaiting doctors approval!');

            location.reload();
        }, function (response) {
            alert('Something went wrong. Please try again!');
        });
    };
    init();
}]);
