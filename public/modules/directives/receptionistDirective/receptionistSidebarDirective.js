overSurgery.directive("receptionistSidebar", function(){
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
        templateUrl: 'modules/directives/receptionistDirective/receptionistSidebarView.html',
        scope: {
            firstName: '@',
            dashboard: '@',
            appointments: '@',
            logoutFunction: '&'

        },
        link: link
    }
});