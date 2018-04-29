overSurgery.controller('accountController', ['$scope', 'PatientService', function ($scope, PatientService) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    // Do backend connection to get the patient's information
    PatientService.getPatient($scope.patient_id).then(function (response) {
        $scope.user = response.data.patient;
        $scope.user.date_of_birth = new Date(response.data.patient.date_of_birth);
    });

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    // Do backend connection to update the patient's information
    $scope.updateProfile = function () {
        // Check no empty fields
        if (!checkNoEmptyFields($scope.user)) {
            return;
        }
        console.log($scope.user);

        // Do backend connection
        PatientService.putPatient($scope.patient_id, {
            phone_number: $scope.user.phone_number,
            address: $scope.user.address
        }).then(function (response) {
            $scope.successfulUpdate = true;
        }, function (response) {
            $scope.msgErrorUpdate = true;

        });
    };
}]);