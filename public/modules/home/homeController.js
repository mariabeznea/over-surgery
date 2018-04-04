overSurgery.controller('homeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.first_name = localStorage.first_name;
    $scope.token = localStorage.token;

    // HTTP GET ALL STAFF
    // $scope.staff = whateveryougetfromtherequest (needs to an array)
    // Do backend connection
    $http.get('/api/patient').then(function (response) {
        $scope.patients = response.data;
    });

    //TODO: get the token only for authenticated users (it fails if the page reloads because the token didn't change)
    $scope.logout = function () {
        $http.get('api/auth/logout?token=' +$scope.token).then(function (response) {
            alert(response.data.message);
            $location.path('/login');

        }, function (response) {
            alert(response.data.error);
        });
    }
}]);
