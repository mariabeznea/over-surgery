overSurgery.controller('receptionistAccountController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.first_name = localStorage.first_name;
    $scope.staff_id = localStorage.staff_id;

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    // Do backend connection to get the receptionist's information
    $http.get('/api/staff/'+ $scope.staff_id).then(function (response) {
        $scope.user = response.data;
        $scope.user.date_of_birth = new Date(response.data.date_of_birth);
    });

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    // Do backend connection to update the receptionist's information
    $scope.updateProfile = function () {

        // Check no empty fields
        if (!checkNoEmptyFields($scope.user)) {
            return;
        }

        // Do backend connection
        $http.put('/api/staff/' + $scope.staff_id, {
            phone_number: $scope.user.phone_number,
            address: $scope.user.address
        }).then(function (response) {
            $scope.successfulUpdate = true;
        }, function (response) {
            $scope.msgErrorUpdate = true;

        });
    };
}]);