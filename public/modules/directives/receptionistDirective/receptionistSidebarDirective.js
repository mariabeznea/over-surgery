overSurgery.directive("receptionistSidebar", function(){
    return {
        templateUrl: 'modules/directives/receptionistDirective/receptionistSidebarView.html',
        scope: {
            firstName: '@',
            dashboard: '@',
            appointments: '@'
        }
    }
});