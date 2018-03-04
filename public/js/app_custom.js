//MODULE
var overSurgery = angular.module('overSurgery', ['ngRoute']);

overSurgery.config(function ($routeProvider) {
   
    $routeProvider
    
         .when('/', {
            templateUrl: '/modules/login/home.html',
            controller: 'homeController'
        })
    
         .when('/reset', {
            templateUrl: '/modules/login/reset.html',
            controller: 'resetController'
        })
    
         .when('/register', {
                templateUrl: '/modules/register/registerView.html',
                controller: 'resetController'
            })
});


overSurgery.controller('homeController', ['$scope', function ($scope) {
    
}]);


overSurgery.controller('resetController', ['$scope', function ($scope) {
    
}]);

overSurgery.controller('registerController', ['$scope', function ($scope) {
    
}]);