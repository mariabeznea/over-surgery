overSurgery.controller('calendarController', ['$scope', '$http', 'uiCalendarConfig', function ($scope, $http, uiCalendarConfig) {
    $scope.events = [];
    $scope.eventSources = [$scope.events];

    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /* Add event */
    $scope.addEvent = function(appointment) {
        $scope.events.push({
            appointment_id: appointment.id,
            title: 'Event1',
            start: appointment.start
        });
    };

    $scope.alertEventOnClick = function (event) {
        console.log(event.appointment_id)
        // get information for this clicked appointment
    };

    $scope.first_name = localStorage.first_name;

    // HTTP GET ALL APPOINTMNTS
    // Do backend connection
    $http.get('/api/patient').then(function (response) {

        // Loop the response data, and for each element, call addEvent
        $scope.addEvent(/*event*/);
    });

    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };
}]);
