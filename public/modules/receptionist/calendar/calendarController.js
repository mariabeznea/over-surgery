overSurgery.controller('calendarController', ['$scope', '$http', function ($scope, $http) {
    $scope.first_name = localStorage.first_name;

    // HTTP GET ALL STAFF
    // $scope.staff = whateveryougetfromtherequest (needs to an array)
    // Do backend connection
    $http.get('/api/patient').then(function (response) {
        $scope.patients = response.data;
    });
}]);
