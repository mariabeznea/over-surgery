overSurgery.directive("footerDirective", function(){
    var link = function (scope) {
        scope.$watch(function () {
            return localStorage.token;
        }, function () {
            scope.logged = !!localStorage.token;
        });

    }
    return {
        templateUrl: 'modules/directives/footerDirective/footerView.html',
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
