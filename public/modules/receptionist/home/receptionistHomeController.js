overSurgery.controller('receptionistHomeController', ['$scope','StaffService', '$location', function ($scope, StaffService) {
    $scope.first_name = localStorage.first_name;


    // Do backend connection
    StaffService.getDashboard().then(function (response) {
        $scope.countInfo = response.data;
    });

}]);
