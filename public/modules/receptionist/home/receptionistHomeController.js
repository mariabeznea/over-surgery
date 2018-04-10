overSurgery.controller('receptionistHomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.first_name = localStorage.first_name;


    // Do backend connection
    $http.get('/api/staff/create').then(function (response) {
        $scope.countInfo = response.data;
    });

}]);
