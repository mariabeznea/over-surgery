overSurgery.controller('homeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.token = localStorage.token;


    // Do backend connection
    $http.get('/api/patient/' + $scope.patient_id).then(function (response) {
        $scope.countInfo = response.data.statistics;
    });

    // //TODO: get the token only for authenticated users (it fails if the page reloads because the token didn't change)
    // $scope.logout = function () {
    //     $http.get('api/auth/logout?token=' +$scope.token).then(function (response) {
    //         alert(response.data.message);
    //         $location.path('/login');
    //         localStorage.token = '';
    //     }, function (response) {
    //         alert(response.data.error);
    //     });
    // }
}]);
