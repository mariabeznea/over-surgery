overSurgery.controller('registerController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.user = {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        address: null,
        phoneNumber: null,
        dateOfBirth: null
    };
    $scope.emailError = false;

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    $scope.registerUser = function () {
        // Check no empty fields, password length, and matching passwords
        if (!checkNoEmptyFields($scope.user)
            || $scope.user.password.length < 6
            || $scope.user.password !== $scope.user.confirmPassword) {
            return;
        }

        // Do backend connection
        $http.post('/api/auth/register', {
            email: $scope.user.email,
            password: $scope.user.password,
            first_name: $scope.user.firstName,
            last_name: $scope.user.lastName,
            address: $scope.user.address,
            phone_number: $scope.user.phoneNumber,
            date_of_birth: moment($scope.user.dateOfBirth).format('YYYY-MM-DD')
        }).then(function () {
            $location.path('/');
        }, function (response) {
            $scope.emailError = response.data.error.email[0] || false;
        });
    }
}]);
