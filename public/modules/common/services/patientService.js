overSurgery.service('PatientService', ['$http', function ($http) {
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

    this.getPatient = function (id) {
        return sendWithToken('GET', '/api/patient/' + id);
    };

    this.getAllPatients = function () {
        return sendWithToken('GET', '/api/patient/');
    };

    this.putPatient = function (id, data) {
        return sendWithToken('PUT', '/api/patient/' + id, data);
    };

    this.getPatientAppointments = function (id) {
        return sendWithToken('GET', 'api/patient/' + id + '/appointment/');
    };

    this.getShiftByDateStaff = function (date, staff_id) {
        return sendWithToken('GET', '/api/appointment/date/' + date + '/staff/' + staff_id);
    };

    this.postAppointment = function (data) {
        return sendWithToken ('POST', '/api/appointment', data);
    };

    this.putAppointment = function (id, data) {
        return sendWithToken('PUT', '/api/appointment/' + id, data);
    };

    this.deleteAppointment = function (id) {
        return sendWithToken('DELETE', '/api/appointment/' + id);
    };

    this.getPatientPrescriptions = function (id) {
        return sendWithToken('GET', 'api/patient/' + id + '/prescription/');
    };

    this.postPatientPrescriptions = function (data) {
        return sendWithToken('POST', '/api/prescription', data);
    };

    this.getPatientTestResults = function (id) {
        return sendWithToken('GET', 'api/patient/' + id + '/test_results/');
    };

    this.getPatientChatMessages = function (id) {
        return sendWithToken('GET', '/api/patient/' + id + '/chat_messages');
    };

    this.postChatMessages = function (data) {
        return sendWithToken('POST', '/api/chat_messages', data);
    };
}]);

