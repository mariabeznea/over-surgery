overSurgery.controller('prescriptionController', ['$scope', '$http', function ($scope, $http) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.prescriptions = [];

    function init() {

        $http.get('api/patient/' + $scope.patient_id + '/prescription/').then(function (response) {
            response.data.forEach(function (prescription) {
                $scope.prescriptions.push({
                    id: prescription.id,
                    expiration_date: prescription.expiration_date,
                    dose: prescription.dose,
                    renewable: prescription.renewable,
                    medicine_id: prescription.medicine_id,
                    medication: prescription.title,
                    status: prescription.name,
                    staff_id: prescription.staff_id,
                    previous_prescription_id: prescription.previous_prescription_id
                });
            });
        })
    }

    $scope.extendPrescription = function (prescription) {
        console.log(prescription);
        // Do backend connection
        $http.post('/api/prescription', {
            renewable: prescription.renewable,
            expiration_date: "",
            dose: prescription.dose,
            staff_id: "",
            patient_id: $scope.patient_id,
            medicine_id: prescription.medicine_id,
            prescription_status_id: '2',
            previous_prescription_id: prescription.id
        }).then(function (response) {
           // $scope.success = true;

            location.reload();
        }, function (response) {
            $scope.msgError = true;
        });
    }
    init();
}]);
