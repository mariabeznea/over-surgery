overSurgery.controller('calController', ['$scope', '$http', function ($scope, $http) {
    $scope.calendar = null;

    function init () {
        $('#calendar').fullCalendar({
            // put your options and callbacks here
            header: {
                left:   '',
                center: 'title',
                right:  'today prev,next'
            }
        });

        $scope.calendar = $('#calendar').fullCalendar('getCalendar');

        $scope.calendar.on('next', function(date, jsEvent, view) {
            console.log('clicked on ');
        });
    }

    init();
}]);

