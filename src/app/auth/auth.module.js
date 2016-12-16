/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.auth', []).
        controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'toastr',
            function ($scope, $rootScope, $location, AuthenticationService, toastr) {

                $scope.userLoginInfo = {
                    userName : "",
                    userPassword : ""
                };
                $scope.loginForm = {};

                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.login = function (isValid) {
                    if (isValid) {
                        $scope.dataLoading = true;

                        AuthenticationService.Login($scope.userLoginInfo.userName, $scope.userLoginInfo.userPassword, function (response) {
                            if (response.status == "200" && response.data.successMessage != "") {
                                $scope.dataLoading = false;
                                AuthenticationService.SetCredentials($scope.userLoginInfo.userName, $scope.userLoginInfo.userPassword, response.data.userId, response.data.successMessage);
                                $location.path('/');

                            } else {
                                toastr.error(response.data.message, 'Error');
                            }
                            $scope.dataLoading = false;
                        });
                    }
                };
            }]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/login',
                views: {
                    'entry': {
                        controller: 'LoginController',
                        templateUrl: 'app/auth/auth.html'
                    }
                },
                title: 'Login to Mpal Admin',
            });
    };


})();
