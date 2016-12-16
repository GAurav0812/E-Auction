/**
 * @author sandeep.p
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.users', [])
        .config(routeConfig).controller('UsersCtrl', UsersCtrl);


    /** @ngInject */
    function UsersCtrl($scope, $rootScope,$location, $uibModal, toastr,AuthenticationService, ManageServices, UsersServices, clientDetails, editableOptions, editableThemes) {

        $scope.dataLoading = false;
        $scope.userPageSize = 10;
        $scope.usersData = [];
        $scope.usersSafeData = [];
        var editModalBox;
        $scope.newUserForm = [];
        $scope.newUserInfo = {};
        $scope.departmentsData = [];
        $scope.departmentSafetData = [];
        $scope.newAssignDeptForm = {};
        $scope.selectedRows = [];


        $scope.newAssignDeptInfo = {
            userId: "",
            departmentId: "",
        };

        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];
        $scope.isVerifiedOptions = [
            {id: 'true', text: 'Yes'},
            {id: 'false', text: 'No'}
        ];


        $scope.accountType = [
            {id: 1, text: "Administrator"},
            {id: 2, text: "Participator"},
            {id: 4, text: "Observer"}
        ];

      /*  function refreshUserInfoData() {
            UsersServices.getUserInfo($scope, function (response) {
                if (response.status == 200) {
                    $scope.userProfileSafeData = response.data;
                    $scope.userProfileData = [].concat($scope.userProfileSafeData);
                }
            });
        };*/
        $scope.bulkUpdateUser = function (prop, value) {/*multiple checkbox selection*/
            for (var i = 0; i < $scope.selectedRows.length; i++) {
                $scope.selectedRows[i][prop] = value;
                UsersServices.UpdateUser($scope.selectedRows[i], function (response) {
                    if (response.status == 200) {
                        toastr.success("Users updated successfully.", "Success!");
                        refreshUsersData();
                    } else {
                        toastr.success("Failed to update the users.", "Error!");
                    }
                });

            }

        };

        $scope.addAssignDept = function () {
            $scope.dataLoading = true;
            UsersServices.AddAssignDept($scope.newAssignDeptInfo, function (response) {
                $scope.dataLoading = false;
                if (response.status == 200 && response.data.successMessage == "SUCCESS") {
                    toastr.success("Department assigned added successfully.", "Success!");
                    refreshUsersData();
                    $scope.newAutomobileInfo.userId = "";
                    $scope.newAutomobileInfo.departmentId = "";
                } else {
                    toastr.error("Failed to assigned department, try again.", "Error!");
                }
            });
        };


        function refreshUsersData() {
            UsersServices.GetUsersList($scope, function (response) {
                if (response.status == 200) {
                    $scope.usersSafeData = response.data;
                    $scope.usersData = [].concat($scope.usersSafeData);
                }
            });
        };


        $scope.userObserverFilter = function () {
            return function (item) {
                /*console.info(item);*/
                if (item.status == 'A' && item.typeId == "4") {
                    return true;
                }
                return false;
            };
        };

        $scope.statusFilter = function () {
            return function (item) {
                /*console.info(item);*/
                if (item.status == 'A') {
                    return true;
                }
                return false;
            };
        };



        $scope.validateBeforeSave = function (val) {
            if (!val) {
                return "This is a required field";
            }
        };
        $scope.editProfile = function (item) {
            $scope.editUser = {};
            $scope.editUserInfo = UsersServices.convertUserObj(item);
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/users/edit.users.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.saveEditFormChange = function (isValid) {
            if (isValid) {
                $scope.updateUser($scope.editUserInfo);
            }
        };
        $scope.updateUser = function (item) {
            UsersServices.UpdateUser(item, function (response) {
                if (response.status == 200) {
                    toastr.success("User updated successfully.", "Success!");
                    if (!angular.isUndefined(editModalBox))
                        editModalBox.close();
                    refreshUsersData();
                } else {
                    toastr.success("Failed to update the user.", "Error!");
                }
            });
        };

        function refreshDepartmentData() {
            ManageServices.GetDepartmentList($scope, function (response) {
                if (response.status == 200) {
                    $scope.departmentSafetData = response.data.departmentResponseList;
                    $scope.departmentsData = [].concat($scope.departmentSafetData);
                }
            });
        }

        refreshUsersData();
        refreshDepartmentData();
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';
    };

    function routeConfig($stateProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                controller: UsersCtrl,
                templateUrl: 'app/pages/users/users.html',
                title: 'USERS',
                sidebarMeta: {
                    icon: 'fa fa-users fa-lg',
                    order: 2,
                },
            });
    }

})();

