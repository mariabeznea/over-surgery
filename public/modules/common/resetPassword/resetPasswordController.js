overSurgery.controller('resetPasswordController', ['$scope', '$http', '$location', '$timeout',
                        function ($scope, $http, $location, $timeout) {

    $scope.resetEmail = '';

    $scope.resetPassword = function() {
        // Do backend connection
        $http.post('/api/auth/recover', {
            email: $scope.resetEmail
        }).then(function (response) {
            $scope.success = true;

            //Redirect to login page after a short delay
            $timeout(function() {
                $location.path('/login');
            }, 3000);

        }, function (response) {
            $scope.msgError = true;
        });
    }
}]);
