overSurgery.controller('loginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.user = {
        email: null,
        password: null
    };
    $scope.emailError = false;
    $scope.genericError = false;

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    $scope.loginUser = function () {
        // Check no empty fields
        if (!checkNoEmptyFields($scope.user)) {
            return;
        }

        // Do backend connection
        $http.post('/api/auth/login', {
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function (response) {
            localStorage.token = response.data.token;
            localStorage.user_type = response.data.user_type;
            $location.path('/');
        }, function (response) {
            if (response.data.error.email) {
                $scope.emailError = response.data.error.email[0] || false;
            } else if (response.data.error.generic) {
                $scope.genericError = response.data.error.generic || false;
            } else {
                $scope.genericError = 'Something went wrong, please try again.';
            }
        });
    }
}]);
