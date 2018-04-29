overSurgery.controller('receptionistChatController', ['$scope', 'PatientService', '$interval', function ($scope, PatientService, $interval) {
    $scope.first_name = localStorage.first_name;
    $scope.comments = [];
    $scope.patients = [];
    $scope.selectedPatient = null;

    function init () {
        getAllPatients();
    }

    function getAllPatients() {
        PatientService.getAllPatients().then(function (response) {
            $scope.patients = response.data;
        });
    }

    $scope.getAllComments = function (patient_id) {
        if (!patient_id) {
            return;
        }

        $interval.cancel($scope.chatInterval);

        PatientService.getPatientChatMessages(patient_id).then(function (response) {
            $scope.comments = response.data;
            $scope.comments.forEach(function (comment) {
                comment.created_at = moment(comment.created_at).format('HH:mm');
            });

            $scope.chatInterval = $interval(function () {
                PatientService.getPatientChatMessages(patient_id).then(function (response) {
                    $scope.comments = response.data;
                    $scope.comments.forEach(function (comment) {
                        comment.created_at = moment(comment.created_at).format('HH:mm');

                        if (patient_id) {
                            var objDiv = document.getElementById('chatDiv');
                            objDiv.scrollTop = objDiv.scrollHeight;
                        }
                    });
                });
            }, 1500);

        });
    };

    $scope.sendMessage = function () {
        if (!$scope.message || !$scope.selectedPatient) {
            return;
        }

        // Do backend connection
        PatientService.postChatMessages({
            message: $scope.message,
            owner: 'staff',
            patient_id: $scope.selectedPatient,
            staff_id: localStorage.staff_id
        }).then(function (response) {
            // Get comments and parse again
            $scope.message = '';
            $scope.getAllComments($scope.selectedPatient);
        });
    };

    $scope.$on("$destroy", function(){
        $interval.cancel($scope.chatInterval);
    });

    init();
}]);