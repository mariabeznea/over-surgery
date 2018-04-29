overSurgery.controller('appointmentController', ['$scope', 'PatientService', 'StaffService', function ($scope, PatientService, StaffService) {
    $scope.first_name = localStorage.first_name;
    $scope.patient_id = localStorage.patient_id;
    $scope.staff = [];
    $scope.staffOnShift = [];
    $scope.staffAvailability = [];
    $scope.appointments = [];

    $scope.newAppointment = {
        staff_id: '',
        date: new Date(),
        start_hours: '',
        location: '',
        notes: null
    };
    $scope.editAppointment = {
        id: '',
        staff_id: '',
        date: new Date(),
        start_hours: '',
        location: '',
        notes: null
    };

    function init() {
        // Do backend connection for the staff
        StaffService.getAllStaff().then(function (response) {
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

        PatientService.getPatientAppointments($scope.patient_id).then(function (response) {
            response.data.forEach(function (appointment) {
                var start = (appointment.start_hours.slice(0, -3)).toString();
                var end = (appointment.end_hours.slice(0, -3)).toString();

                // Cycle the staff to search for the doctor/nurse with the staff_id in the current appointment
                $scope.staff.forEach(function (staff) {
                    if (appointment.staff_id === staff.id) {
                        $scope.appointments.push({
                            id: appointment.id,
                            date: appointment.date,
                            start_hours: start,
                            end_hours: end,
                            location: appointment.location,
                            notes: appointment.notes,
                            name: staff.staff_name,
                            staff_id: appointment.staff_id,
                            editable: moment(appointment.date).isAfter(moment())
                        });
                    }
                });
            });
        });
    }

    // When selecting a date
    $scope.dateChange = function () {
        var isTodayOrAfter = moment($scope.newAppointment.date).isAfter(moment().subtract(1, "days"));

        if (!isTodayOrAfter) {
            $scope.newAppointment.date = new Date();
        }

        // Empty current array
        $scope.newAppointment.staff_id = '';
        $scope.staffOnShift = [];
        $scope.staffAvailability = [];

        if ($scope.newAppointment.staff_id) {
            shiftByDateStaff($scope.newAppointment.date, $scope.newAppointment.staff_id);
            return;
        }

        shiftByDate($scope.newAppointment.date);
    };

    // When selecting a staff
    $scope.staffChange = function () {
        if(!$scope.newAppointment.staff_id) {
            return;
        }

        shiftByDateStaff($scope.newAppointment.date, $scope.newAppointment.staff_id);
    };

    // When updating a date
    $scope.editDate = function () {
        var isTodayOrAfter = moment($scope.editAppointment.date).isAfter(moment().subtract(1, "days"));

        if (!isTodayOrAfter) {
            $scope.editAppointment.date = new Date();
        }

        // Empty current array
        $scope.editAppointment.staff_id = '';
        $scope.staffOnShift = [];
        $scope.staffAvailability = [];

        if ($scope.editAppointment.staff_id) {
            shiftByDateStaff($scope.editAppointment.date, $scope.editAppointment.staff_id);
            return;
        }

        return shiftByDate($scope.editAppointment.date);
    };

    // When updating a staff
    $scope.editStaff = function (updatingAppointment) {
        if(!$scope.editAppointment.staff_id) {
            return;
        }

        return shiftByDateStaff($scope.editAppointment.date, $scope.editAppointment.staff_id, updatingAppointment);
    };

    function shiftByDate(date) {
        date = moment(date).format('YYYY-MM-DD');
        return StaffService.getShiftByDate(date).then(function (response) {
            response.data.forEach(function (shift) {

                // Cycle the staff to search for the doctor/nurse with the staff_id in the current shift
                $scope.staff.forEach(function (staff) {
                    if (staff.id === shift.staff_id) {
                        $scope.staffOnShift.push(staff);
                    }
                });
            });
        });
    }

    function shiftByDateStaff(date, staff_id, updatingAppointment) {
        date = moment(date).format('YYYY-MM-DD');
        return StaffService.getShiftByDateStaff(date, staff_id).then(function (response) {

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

            PatientService.getShiftByDateStaff(date, staff_id).then(function (response) {
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
    }

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
        if($scope.newAppointment.staff_id === '' || $scope.newAppointment.date === null || $scope.newAppointment.start_hours === '') {
            noEmptyFields = false;
        }
        if (!noEmptyFields) {
            return;
        }

        // Do backend connection
        PatientService.postAppointment({
            date: moment($scope.newAppointment.date).format('YYYY-MM-DD'),
            start_hours: start,
            end_hours: end,
            location: $scope.newAppointment.location,
            notes: $scope.newAppointment.notes,
            staff_id: $scope.newAppointment.staff_id,
            patient_id: $scope.patient_id
        }).then(function (response) {
            $scope.success = true;
            $scope.newAppointment = {};
            location.reload();
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
        PatientService.putAppointment($scope.editAppointment.id, {
            date: moment($scope.editAppointment.date).format('YYYY-MM-DD'),
            start_hours: start,
            end_hours: end,
            location: $scope.editAppointment.location,
            notes: $scope.editAppointment.notes,
            staff_id: $scope.editAppointment.staff_id,
            patient_id: $scope.patient_id
        }).then(function (response) {
            $scope.successfulUpdate = true;
            $scope.newAppointment = {};

            location.reload();
        }, function (response) {
            $scope.msgErrorUpdate = true;

        });
    };

    $scope.updateAppointment = function (appointment) {
        $scope.reset();

        $scope.editAppointment.id = appointment.id;
        $scope.editAppointment.date = new Date(appointment.date);

        $scope.editDate().then(function () {
            $scope.editAppointment.staff_id = appointment.staff_id +'';

            $scope.editStaff(true).then(function () {
                $scope.editAppointment.start_hours = parseInt(appointment.start_hours.slice(0, 2)) + '';
                $scope.editAppointment.name = appointment.name;
                $scope.editAppointment.notes = appointment.notes;
            });
        });
    };

    $scope.reset = function () {
        $scope.staffOnShift = [];
        $scope.staffAvailability = [];
    };
    
    $scope.deleteAppointment = function (appointment) {
        var confirmCancel = confirm("Do you really want to cancel this appointment?");
        if(confirmCancel){
            PatientService.deleteAppointment(appointment.id)
                .then(function (response) {
                alert('Appointment cancelled succesfully!');
                location.reload();
                }, function (response) {
                alert('Something went wrong, please try again!');
                });
        }
    };
    init();
}]);

