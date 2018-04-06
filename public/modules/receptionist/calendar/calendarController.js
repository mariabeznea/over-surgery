overSurgery.controller('calendarController', ['$scope', '$http', 'uiCalendarConfig', function ($scope, $http, uiCalendarConfig) {
    $scope.events = [];

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
    };


    $scope.eventSources = [$scope.events, {}, $scope.eventsF];
    $scope.first_name = localStorage.first_name;
    $scope.staff = [];
    $scope.patients = [];
    $scope.staffOnShift = [];
    $scope.staffAvailability = [];
    $scope.appointments = [];

    $scope.newAppointment = {
        patient_id: '',
        patient_name: '',
        staff_id: '',
        date: new Date(),
        start_hours: '',
        location: '',
        notes: null
    };
    $scope.editAppointment = {
        id: '',
        staff_id: '',
        patient_id: '',
        date: new Date(),
        start_hours: '',
        location: '',
        notes: null
    };

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
                $scope.patients.push({
                    id: patient.id,
                    patient_name: patient.first_name + ' ' + patient.last_name,
                    address: patient.address
                })
            });
        });

        // Do backend connection to get all appointments
        $http.get('/api/appointment').then(function (response) {
            response.data.forEach(function (appointment) {
                $scope.addEvent(appointment);

            })
        });

    // When selecting a date
    $scope.dateChange = function () {
        // Empty current array
        $scope.newAppointment.staff_id = '';
        $scope.staffOnShift = [];
        $scope.staffAvailability = [];

        if ($scope.newAppointment.staff_id) {
            $scope.shiftByDateStaff($scope.newAppointment.date, $scope.newAppointment.staff_id);
            return;
        }

        $scope.shiftByDate($scope.newAppointment.date);
    };
    // When updating a date
        $scope.editDate = function () {
            // Empty current array
            $scope.editAppointment.staff_id = '';
            $scope.staffOnShift = [];
            $scope.staffAvailability = [];

            if ($scope.editAppointment.staff_id) {
                $scope.shiftByDateStaff($scope.editAppointment.date, $scope.editAppointment.staff_id);
                return;
            }

            return $scope.shiftByDate($scope.editAppointment.date);
        };

    $scope.shiftByDate = function (date) {
        date = moment(date).format('YYYY-MM-DD');
        return $http.get('/api/shift/date/' + date).then(function (response) {
            response.data.forEach(function (shift) {

                if (!response.data){
                    return;
                }
                // Cycle the staff to search for the doctor/nurse with the staff_id in the current shift
                $scope.staff.forEach(function (staff) {
                    if (staff.id === shift.staff_id) {
                        $scope.staffOnShift.push(staff);
                    }
                });
            });
        });
    };

   $scope.shiftByDateStaff = function (date, staff_id, updatingAppointment) {
        date = moment(date).format('YYYY-MM-DD');
        return $http.get('/api/shift/date/' + date + '/staff/' + staff_id).then(function (response) {
            // Reset Availability
            $scope.staffAvailability = [];
            if (!response.data){
                return;
            }
            var start = parseInt(response.data.start_hours.slice(0, 2));
            var end = parseInt(response.data.end_hours.slice(0, 2));

            for (var i = start; i < end; i++) {
                $scope.staffAvailability.push({
                    appointment_id: null,
                    start: i,
                    end: i + 1,
                    status: 'free'
                })
            }

            $http.get('/api/appointment/date/' + date + '/staff/' + staff_id).then(function (response) {
                response.data.forEach(function (appointment) {
                    var start = parseInt(appointment.start_hours.slice(0, 2));

                    $scope.staffAvailability.forEach(function (slot) {
                        if (slot.start === start) {
                            if (updatingAppointment && $scope.editAppointment.start_hours == start) {
                                return;
                            }
                            slot.status = 'occupied';
                            slot.appointment_id = appointment.id;
                        }
                    })
                })
            });
        });
   };
    $scope.bookAppointment = function () {
        $scope.clicked = true;
        $scope.msgError = false;

        $scope.staff.forEach(function (staff){
            if ($scope.newAppointment.staff_id == staff.id) {
                $scope.newAppointment.location = staff.address;
            }
        });
        var start = ($scope.newAppointment.start_hours < 10 ? '0':'') + $scope.newAppointment.start_hours + ':00:00';
        var end = ($scope.newAppointment.start_hours < 9 ? '0' : '') + (parseInt($scope.newAppointment.start_hours) + 1) + ':00:00';

        var noEmptyFields = true;
        $scope.success = false;
        // Check no empty fields
        if($scope.newAppointment.staff_id === '' || $scope.newAppointment.patient_id === ''|| $scope.newAppointment.date === null || $scope.newAppointment.start_hours === '') {
            noEmptyFields = false;
        }
        if (!noEmptyFields) {
            return;
        }

        // Do backend connection
        $http.post('/api/appointment', {
            date: moment($scope.newAppointment.date).format('YYYY-MM-DD'),
            start_hours: start,
            end_hours: end,
            location: $scope.newAppointment.location,
            notes: $scope.newAppointment.notes,
            staff_id: $scope.newAppointment.staff_id,
            patient_id: $scope.newAppointment.patient_id
        }).then(function (response) {
            $scope.success = true;
            //TODO: if I dont do this if, the name will appear as undefined but with an hour next to it!!!
            if($scope.newAppointment.patient_id === $scope.patients.patient_id) {
                $scope.newAppointment.patient_name = $scope.patients.patient_name;
            }
            $scope.addEvent($scope.newAppointment);
            //TODO: don't show the change of empty fields before reloading but show succesful msg
            setTimeout(location.reload.bind(location), 60);
            $scope.newAppointment = {};
        }, function (response) {
            $scope.msgError = true;
        });
    };
    $scope.putAppointment = function () {
        $scope.clickedUpdate = true;
        $scope.msgErrorUpdate = false;

        $scope.staff.forEach(function (staff){
            if ($scope.editAppointment.staff_id == staff.id) {
                $scope.editAppointment.location = staff.address;
            }
        });
        var start = ($scope.editAppointment.start_hours < 10 ? '0':'') + $scope.editAppointment.start_hours + ':00:00';
        var end = ($scope.editAppointment.start_hours < 9 ? '0' : '') + (parseInt($scope.editAppointment.start_hours) + 1) + ':00:00';

        var noEmptyFields = true;
        $scope.success = false;
        // Check no empty fields
        if($scope.editAppointment.staff_id === '' || $scope.editAppointment.date === null || $scope.editAppointment.start_hours === '') {
            noEmptyFields = false;
        }
        if (!noEmptyFields) {
            return;
        }

        // Do backend connection
        $http.put('/api/appointment/' + $scope.editAppointment.id, {
            date: moment($scope.editAppointment.date).format('YYYY-MM-DD'),
            start_hours: start,
            end_hours: end,
            location: $scope.editAppointment.location,
            notes: $scope.editAppointment.notes,
            staff_id: $scope.editAppointment.staff_id,
            patient_id: $scope.editAppointment.patient_id + ''
        }).then(function (response) {
            $scope.successfulUpdate = true;
            $scope.newAppointment = {};

            location.reload();
        }, function (response) {
            $scope.msgErrorUpdate = true;

        });
    };

    $scope.deleteAppointment = function (appointment) {
        var confirmCancel = confirm("Do you really want to cancel this appointment?");
        if(confirmCancel){
            $http.delete('/api/appointment/' + appointment.id)
                .then(function (response) {
                    alert('Appointment cancelled succesfully!');
                    location.reload();
                }, function (response) {
                    alert('Something went wrong, please try again!');
                });
        }
    };

    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /* Add event */
    $scope.addEvent = function(appointment) {
        $scope.events.push({
            title: appointment.patient_firstName + '' +appointment.patient_lastName,
            start: appointment.date,
            appointment: appointment
        });
    };

    $scope.alertEventOnClick = function (event) {
        // get information for this clicked appointment
        $scope.editAppointment = {
            id: event.appointment.id,
            staff_id: event.appointment.staff_id +'',
            patient_id: event.appointment.patient_id,
            patient_name: event.appointment.patient_firstName + ' ' + event.appointment.patient_lastName,
            date: new Date(event.start),
            start_hours: parseInt(event.appointment.start_hours.slice(0, 2)) + '',
            location: event.appointment.location,
            notes: event.appointment.notes
        }

        $scope.shiftByDate($scope.editAppointment.date).then(function () {
            $scope.shiftByDateStaff($scope.editAppointment.date, $scope.editAppointment.staff_id, true);
        });

        $("#editModal").modal();
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: '',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertEventOnClick,
        }
    };
}]);
