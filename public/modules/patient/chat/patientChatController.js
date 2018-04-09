overSurgery.controller('patientChatController', ['$scope', '$http', '$interval', '$window', function ($scope, $http, $interval, $window) {
    $scope.first_name = localStorage.first_name;
    $scope.comments = [];

    function init () {
        getAllComments(localStorage.patient_id);

        // Every 3 seconds check the backend for new comments
        $scope.chatInterval = $interval(function(){
            getAllComments(localStorage.patient_id);
        }, 1500);
    }

    function getAllComments(patient_id) {
        $http.get('/api/patient/' + patient_id + '/chat_messages').then(function (response) {
            $scope.comments = response.data;
            $scope.comments.forEach(function (comment) {
                comment.created_at = moment(comment.created_at).format('HH:mm');
            });
            // $window.scrollTo(0,document.body.scrollHeight);
            // $window.scrollTo(0,document.getElementById('chatDiv').scrollHeight);
            var objDiv = document.getElementById('chatDiv');
            objDiv.scrollTop = objDiv.scrollHeight;
        });
    }

    $scope.sendMessage = function () {
        if (!$scope.message) {
            return;
        }

        // Do backend connection
        $http.post('/api/chat_messages', {
            message: $scope.message,
            owner: 'patient',
            patient_id: localStorage.patient_id
        }).then(function (response) {
            // Get comments and parse again
            $scope.message = '';
            getAllComments(localStorage.patient_id);
        });
    };

    $scope.$on("$destroy", function(){
        $interval.cancel($scope.chatInterval);
    });

    init();
}]);