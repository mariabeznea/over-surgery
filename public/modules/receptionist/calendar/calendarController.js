overSurgery.controller('calendarController', ['$scope', '$http', 'uiCalendarConfig', function ($scope, $http, uiCalendarConfig) {
    $scope.events = [];
    $scope.eventSources = [$scope.events];
    $scope.first_name = localStorage.first_name;
    $scope.staff = [];
    $scope.patient = [];
    $scope.appointments = [];

    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /* Add event */
    $scope.addEvent = function(appointment) {
        $scope.events.push({
            appointment_id: appointment.id,
            title: appointment.patient_firstName + '' +appointment.patient_lastName,
            start: appointment.date
        });
    };

    $scope.alertEventOnClick = function (event) {
        console.log(event.appointment_id)
        // get information for this clicked appointment
    };

    function init() {
        // Do backend connection for the staff
        $http.get('/api/staff').then(function (response) {
            response.data.forEach(function (staff) {
                if (staff.staff_type_id === 1 || staff.staff_type_id === 2) {
                    $scope.staff.push({
                        id: staff.id,
                        staff_name: staff.first_name + ' ' + staff.last_name,
                        address: staff.address
                    })
                }
            });
        });

        // Do backend connection for the patients
        $http.get('/api/patient').then(function (response) {
            response.data.forEach(function (patient) {
                $scope.patient.push({
                    id: patient.id,
                    patient_name: patient.first_name + ' ' + patient.last_name,
                    address: patient.address
                })
            });
        });

        // Do backend connection to get all appointments
        $http.get('/api/appointment').then(function (response) {
            response.data.forEach(function (appointment) {
                console.log(appointment);
                $scope.addEvent(appointment);

            })
        });
    }

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
    init();
}]);
