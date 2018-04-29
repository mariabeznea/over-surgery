overSurgery.service('StaffService', ['$http', function ($http) {
    function sendWithToken(method, url, data) {
        var request = {
            method: method,
            url: url,
            headers: {
                'x-access-token': localStorage.token
            }
        };

        if (data) {
            request.data = data;
        }

        return $http(request);
    }

    this.getStaff = function (id) {
        return sendWithToken('GET', '/api/staff/' + id);
    };

    this.getAllStaff = function () {
        return sendWithToken('GET', '/api/staff');
    };

    this.getDashboard = function () {
        return sendWithToken('GET', '/api/staff/create');
    };

    this.getAllAppointments = function () {
        return sendWithToken('GET', '/api/appointment');
    };

    this.putStaff = function (id, data) {
        return sendWithToken('PUT', '/api/staff/' + id, data);
    };

    this.getShiftByDate = function (date) {
        return sendWithToken('GET', '/api/shift/date/' + date);
    };

    this.getShiftByDateStaff = function (date, staff_id) {
        return sendWithToken('GET', '/api/shift/date/' + date + '/staff/' + staff_id);
    };
}]);

