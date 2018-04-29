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
        .when('/account', {
            templateUrl: '/modules/patient/account/accountView.html',
            controller: 'accountController'
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
        .when('/chat', {
            templateUrl: '/modules/patient/chat/patientChatView.html',
            controller: 'patientChatController'
        })
        .when('/staff', {
            templateUrl: '/modules/receptionist/home/receptionistHomeView.html',
            controller: 'receptionistHomeController'
        })
        .when('/staff/account', {
            templateUrl: '/modules/receptionist/account/receptionistAccountView.html',
            controller: 'receptionistAccountController'
        })
        .when('/staff/calendar', {
            templateUrl: '/modules/receptionist/calendar/calendarView.html',
            controller: 'calendarController'
        })
        .when('/staff/chat', {
            templateUrl: '/modules/receptionist/chat/receptionistChatView.html',
            controller: 'receptionistChatController'
        })
        .when('/about', {
            templateUrl: '/modules/common/about/aboutView.html',
            controller: 'aboutController'
        })
        .otherwise({
            redirectTo: '/'
        })
});

overSurgery.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (event) {

        var existsInPath = function (text) { return $location.path().indexOf(text) > -1; };

        // If going to login/register, stop the function
        if (existsInPath('login') || existsInPath('register') || existsInPath('reset')) {
            // If accessing login/register while already logged in, redirect to '/'
            if (localStorage.token) {
                $location.path('/');
            }
            return;
        }

        // If accessing anything else, and do not have token in local storage, prevent load, redirect to '/login'
        if (!localStorage.token) {
            event.preventDefault();
            $location.path('/login');
            return;
        }

        // About page is free for all
        if (existsInPath('about')) {
            return;
        }

        // Prevent patients from accessing staff pages
        if (localStorage.patient_id && existsInPath('staff')) {
            event.preventDefault();
            $location.path('/');
            return;
        }

        // Prevent staff from accessing pages without 'staff'
        if (localStorage.staff_id && !existsInPath('staff')) {
            event.preventDefault();
            $location.path('/staff');
            return;
        }
    });
}]);