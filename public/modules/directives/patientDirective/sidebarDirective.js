overSurgery.directive("sideBar", function(){
    var link = function (scope) {
        scope.logout = function () {
            localStorage.token = '';
            localStorage.email = '';
            localStorage.first_name = '';
            localStorage.last_name = '';
            localStorage.patient_id = '';
            localStorage.user_id = '';
            localStorage.user_type = '';
            localStorage.staff_id = '';
        }
    };

    return {
        templateUrl: 'modules/directives/patientDirective/sidebarView.html',
        scope: {
            firstName: '@',
            dashboard: '@',
            availability: '@',
            appointments: '@',
            prescriptions: '@',
            testResults: '@',
            chat:'@',
            logoutFunction: '&'
        },
        link: link
    }
});
