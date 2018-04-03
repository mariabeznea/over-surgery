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
            localStorage.email = response.data.user.email;
            localStorage.user_id = response.data.user.id;

            // TODO: will need code for saving staff info on localstorage
            // TODO: at the moment, only does for patient
            if (response.data.patient) {
                localStorage.patient_id = response.data.patient.id;
                localStorage.first_name = response.data.patient.first_name;
                localStorage.last_name = response.data.patient.last_name;
            } else if (response.data.staff) {
                localStorage.staff_id = response.data.staff.id;
                localStorage.first_name = response.data.staff.first_name;
                localStorage.last_name = response.data.staff.last_name;
            }

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
