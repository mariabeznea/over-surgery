overSurgery.controller('homeController', ['$scope', '$http', 'PatientService', function ($scope, $http, PatientService) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.token = localStorage.token;


    // Do backend connection
    PatientService.getPatient($scope.patient_id).then(function (response) {
        $scope.countInfo = response.data.statistics;
    });
}]);
