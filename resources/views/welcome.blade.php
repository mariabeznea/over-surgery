<!DOCTYPE html>
<html lang="en" ng-app="overSurgery">
    <head>
        <title>Over Surgery </title>
        <!-- meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Icons -->
        <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>

        <!-- load bootstrap via CDN-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <link rel="stylesheet" href="/css/colors.css">
        <link rel="stylesheet" href="/css/buttons.css">
        <link rel="stylesheet" href="/css/forms.css">
        <link rel="stylesheet" href="/css/boxes.css" >
        <link rel="stylesheet" href="/css/utilities.css">
        <link rel="stylesheet" href="/css/sidebar.css">
        <link rel="stylesheet" href="/css/calendar.css">
        <link rel="stylesheet" href="/css/sticky-footer-navbar.css" >

    <body class="bg-light">


        <div ng-view></div>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <!-- Packages -->
        <script src="/js/moment.js"></script>
        <!-- Select2 -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.full.js"></script>

        <!-- Calendar -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.print.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js"></script>

        <!-- load angular via CDN -->
        <script src="https://code.angularjs.org/1.6.9/angular.min.js"></script>
        <script src="https://code.angularjs.org/1.6.9/angular-route.min.js"></script>

        <!-- Extra packages after angular loads -->
        <script src="/js/calendar.js"></script>

        <script src="/js/app_custom.js"></script>
        <script src="/modules/common/services/patientService.js"></script>
        <script src="/modules/common/services/staffService.js"></script>
        <script src="/modules/common/login/loginController.js"></script>
        <script src="/modules/common/resetPassword/resetPasswordController.js"></script>
        <script src="/modules/common/register/registerController.js"></script>
        <script src="/modules/home/homeController.js"></script>
        <script src="/modules/patient/account/accountController.js"></script>
        <script src="/modules/patient/availability/availabilityController.js"></script>
        <script src="/modules/patient/appointment/appointmentController.js"></script>
        <script src="/modules/patient/prescription/prescriptionController.js"></script>
        <script src="/modules/patient/test_result/testResultController.js"></script>
        <script src="/modules/patient/chat/patientChatController.js"></script>
        <script src="/modules/receptionist/home/receptionistHomeController.js"></script>
        <script src="/modules/receptionist/account/receptionistAccountController.js"></script>
        <script src="/modules/receptionist/calendar/calendarController.js"></script>
        <script src="/modules/receptionist/chat/receptionistChatController.js"></script>
        <script src="/modules/common/about/aboutController.js"></script>

        <script src="/modules/directives/patientDirective/sidebarDirective.js"></script>
        <script src="/modules/directives/footerDirective/footerController.js"></script>
        <script src="/modules/directives/receptionistDirective/receptionistSidebarDirective.js"></script>

        <!-- Using google maps-->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb6Q83mrU6QkSInT-LE_J63NVZIA1DT5k&callback=initMap"
                async defer>
        </script>
        <footer-directive></footer-directive>
    </body>
</html>
