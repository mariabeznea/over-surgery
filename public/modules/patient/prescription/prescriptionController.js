overSurgery.controller('prescriptionController', ['$scope', '$http', function ($scope, $http) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
}]);