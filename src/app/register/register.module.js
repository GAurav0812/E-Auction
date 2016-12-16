(function () {
    'use strict';

    angular.module('UApps.register', []).controller('RegisterController',
        ['$scope', '$rootScope', '$location', 'RegistrationService', 'toastr',
            function ($scope, $rootScope, $location, RegistrationService, toastr) {


                $scope.registerForm = {};
                $scope.regsiterSuccess = false;

                $scope.newUserInfo = {
                    typeId : "" ,
                    name: "",
                    companyName: "",
                    email: "",
                    password: "",
                    material: "",
                    address: "",
                    city: "",
                    country: "",
                    state: "",
                    pin: "",
                    panNumber: "",
                    vatNumber: "",
                    mobile: "",
                    phone: "",
                    website: ""
                };
                $scope.accountTypeOptions = [];


                $scope.addUser = function (isValid) {
                    if (isValid) {
                        $scope.dataLoading = true;
                        toastr.info("Shouldn't take that long.. Please wait..", "User creation started");
                        RegistrationService.InsertUser($scope.newUserInfo,function (response) {
                            $scope.dataLoading = false;
                            if (response.status == 200) {
                                $scope.regsiterSuccess = true;
                                toastr.success("User register successfully.", "Success!");
                            } else {
                                toastr.error(response.data.message, "Error!");
                            }
                        });
                    }
                };

                $scope.updateUser = function (item) {
                    RegistrationService.UpdateUser(item, function (response) {
                        if (response.status == 200 && response.data.messageType == "SUCCESS") {
                            toastr.success("User updated successfully.","Success!");
                        } else {
                            toastr.success("Failed to update the User","Error!");
                        }
                    });
                };

                function UserAccountTypesData() {
                    RegistrationService.getUserType($scope, function (response) {
                        if (response.status == 200){
                            $scope.accountTypeOptions = response.data.getTypesResponseList;
                        }
                    });
                }

                UserAccountTypesData()

            }]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                views: {
                    'entry': {
                        controller: 'RegisterController',
                        templateUrl: 'app/register/register.html'
                    }
                },
                title: 'Register to E-Auction',
            });
    };


})();
