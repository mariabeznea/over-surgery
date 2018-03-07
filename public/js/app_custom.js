//MODULE
var overSurgery = angular.module('overSurgery', ['ngRoute']);

overSurgery.config(function ($routeProvider) {
   
    $routeProvider
    
         .when('/', {
            templateUrl: '/modules/login/loginView.html',
            controller: 'homeController'
        })
    
         .when('/reset', {
            templateUrl: '/modules/login/resetView.html',
            controller: 'resetController'
        })
    
         .when('/register', {
             templateUrl: '/modules/register/registerView.html',
             controller: 'registerController'
         })

         .otherwise({
             redirectTo: '/'
         })
});


overSurgery.controller('homeController', ['$scope', function ($scope) {

}]);


overSurgery.controller('resetController', ['$scope', function ($scope) {
    
}]);

overSurgery.controller('registerController', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        address: null
    };
    $scope.emailError = false;

    function checkNoEmptyFields(obj) {
        var noEmptyFields = true;

        Object.keys(obj).forEach(function (property) {
            if (obj[property] === null || obj[property] === '' || obj[property] === undefined) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    $scope.registerUser = function() {
        // Check no empty fields, password length, and matching passwords
        if(!checkNoEmptyFields($scope.user)
            || $scope.user.password.length < 6
            || $scope.user.password !== $scope.user.confirmPassword) {
            return;
        }

        // Do backend connection
        console.log($scope.user);


        $http.post('/api/patient', {email: $scope.user.email, password: $scope.user.password})
            .then(function (response) {
                console.log(response);
            })
            .then(function (response, status, headers, config ) {
                console.log(response);
            });

        // first backend validation is if all fields required are there (confirm password not needed)
        // second backend validation is if the email doesn't exist
        //     if YES, return success and in frontend redirect to the login page
        //     if NO return error and do $scope.emailError = true
    }

}]);