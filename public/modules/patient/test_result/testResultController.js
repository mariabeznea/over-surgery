overSurgery.controller('testResultController', ['$scope', 'PatientService', function ($scope, PatientService) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.testResults = [];
    $scope.modelContent = '';

    function init() {

        PatientService.getPatientTestResults($scope.patient_id).then(function (response) {
            response.data.forEach(function (test) {
                $scope.testResults.push({
                    id: test.id,
                    exam: test.type,
                    date: moment(test.date).format('YYYY-MM-DD hh:mm'),
                    location: test.location,
                    results: test.results
                });
            });
        })
    }

    $scope.updateResults = function (test) {
        $scope.modelContent = test.results;
    };

    init();
}]);
