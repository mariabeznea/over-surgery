//MODULE
var overSurgery = angular.module('overSurgery', ['ngRoute']);

overSurgery.config(function ($routeProvider) {
   
    $routeProvider
        .when('/', {
            templateUrl: '/modules/login/loginView.html',
            controller: 'loginController'
        })
        .when('/reset', {
            templateUrl: '/modules/login/resetView.html',
            controller: 'resetController'
        })
        .when('/register', {
            templateUrl: '/modules/register/registerView.html',
            controller: 'registerController'
        })
        .when('/home', {
            templateUrl: '/modules/home/homeView.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/'
        })
});


overSurgery.controller('homeController', ['$scope', function ($scope) {

}]);


overSurgery.controller('resetController', ['$scope', function ($scope) {
    
}]);
