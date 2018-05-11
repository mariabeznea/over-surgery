overSurgery.controller('availabilityController', ['$scope', 'PatientService', 'StaffService', function ($scope, PatientService, StaffService) {

    $scope.first_name = localStorage.first_name;
    $scope.shift = {
        date: new Date(),
        staff_id: null
    };
    $scope.staff = [];
    $scope.staffOnShift = [];
    $scope.staffAvailability = [];

    function init() {

        // Do backend connection for the staff
        StaffService.getAllStaff().then(function (response) {

            // Saving the staff in a new array to use it in the select2
            response.data.forEach(function (staff) {
                if (staff.staff_type_id === 1 || staff.staff_type_id === 2) {
                    $scope.staff.push({
                        id: staff.id,
                        text: staff.first_name + ' ' + staff.last_name,
                        address: staff.address,
                        phone_number: staff.phone_number,
                        staff_type_id: staff.staff_type_id
                    });
                }
            });

            // Putting options in the Select2 view
            $(document).ready(function () {
                $('#staff-select').select2({
                    placeholder: "First and/or Last Name",
                    allowClear: true,
                    data: $scope.staff,
                })
            });
        });
    }

    // When selecting a date (watcher)
    $scope.$watch('shift["date"]', function (newValue) {
        if ($scope.shift.staff_id) {
            shiftByDateStaff(newValue, $scope.shift.staff_id);
            return;
        }
        // Empty current array
        $scope.staffOnShift = [];

        shiftByDate(newValue);
    });

    // When selecting a staff (select2)
    $('#staff-select').on('select2:select', function (event) {
        // Empty current array
        $scope.staffOnShift = [];

        $scope.shift.staff_id = event.target.value;
        shiftByDateStaff($scope.shift.date, $scope.shift.staff_id);
    });

    // When unselecting a staff (select2)
    $('#staff-select').on('select2:unselect', function () {
        // Reset staff id and staff availability
        $scope.shift.staff_id = null;
        $scope.staffAvailability = [];

        shiftByDate($scope.shift.date);
    });

    function shiftByDate(date) {
        date = moment(date).format('YYYY-MM-DD');
        StaffService.getShiftByDate(date).then(function (response) {
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

    function shiftByDateStaff(date, staff_id) {
        date = moment(date).format('YYYY-MM-DD');
        StaffService.getShiftByDateStaff(date, staff_id).then(function (response) {

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
                            slot.status = 'occupied';
                            slot.appointment_id = appointment.id;
                        }
                    })
                })
            });
        });
    }

    $scope.clickStaff = function (staff_id) {
        $('#staff-select').val(staff_id);
        $('#staff-select').trigger('change');

        // Empty current array
        $scope.staffOnShift = [];

        $scope.shift.staff_id = staff_id;
        shiftByDateStaff($scope.shift.date, $scope.shift.staff_id);
    };

    init();
}]);
