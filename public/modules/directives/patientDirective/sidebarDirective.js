overSurgery.directive("sideBar", function(){
        return {
            templateUrl: 'modules/directives/patientDirective/sidebarView.html',
            scope: {
                firstName: '@',
                dashboard: '@',
                availability: '@',
                appointments: '@',
                prescriptions: '@',
                medication: '@',
                testResults: '@'
            }
        }
});
