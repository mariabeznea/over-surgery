overSurgery.controller('aboutController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.first_name = localStorage.first_name;
    $scope.patient = !!localStorage.patient_id;
    $scope.staff = !!localStorage.staff_id;

    function initMap() {
        var uluru = {lat: 52.175176, lng: 0.140451};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    initMap();
}]);