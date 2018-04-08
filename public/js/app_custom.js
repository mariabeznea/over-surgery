//MODULE
var overSurgery = angular.module('overSurgery', ['ngRoute', 'ui.calendar']);

overSurgery.config(function ($routeProvider) {
   
    $routeProvider
        .when('/login', {
            templateUrl: '/modules/common/login/loginView.html',
            controller: 'loginController'
        })
        .when('/reset', {
            templateUrl: '/modules/common/resetPassword/resetPasswordView.html',
            controller: 'resetPasswordController'
        })
        .when('/register', {
            templateUrl: '/modules/common/register/registerView.html',
            controller: 'registerController'
        })
        .when('/', {
            templateUrl: '/modules/home/homeView.html',
            controller: 'homeController'
        })
        .when('/availability', {
            templateUrl: '/modules/patient/availability/availabilityView.html',
            controller: 'availabilityController'
        })
        .when('/appointment', {
            templateUrl: '/modules/patient/appointment/appointmentView.html',
            controller: 'appointmentController'
        })
        .when('/prescription', {
            templateUrl: '/modules/patient/prescription/prescriptionView.html',
            controller: 'prescriptionController'
        })
        .when('/test_result', {
            templateUrl: '/modules/patient/test_result/testResultView.html',
            controller: 'testResultController'
        })
        .when('/staff', {
            templateUrl: '/modules/receptionist/calendar/calendarView.html',
            controller: 'calendarController'
        })
        .otherwise({
            redirectTo: '/'
        })
});
