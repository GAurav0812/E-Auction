/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.profile', [])
        .config(routeConfig).controller('ProfileCtrl', ProfileCtrl);

    /** @ngInject */
    function ProfileCtrl($scope, $rootScope,$filter, ProfileServices,UsersServices ,toastr, editableOptions, editableThemes) {

        $scope.autoprofilePageSize = 10;
        $scope.profileForm={};
        $scope.changePasswordForm={};

        $scope.newProfileInfo={
            typeId : "" ,
            name: "",
            companyName: "",
            email: "",
            material: "",
            address: "",
            city: "",
            country: "",
            state: "",
            pin: "",
            id:"",
            panNumber: "",
            vatNumber: "",
            mobile: "",
            status:"",
            phone: ""
        };

        $scope.newPasswordInfo={
            newPassword: "",
            oldPassword: "",
            userId:""
        };

        $scope.updateProfile = function () {
            UsersServices.UpdateUser($scope.newProfileInfo, function (response) {
                if (response.status == 200 && response.data.successMessage == "SUCCESS") {
                    toastr.success("Profile updated  successfully.", "Success!");
                    refreshUserInfoData();
                } else {
                    toastr.error("Failed to update profile, try again.", "Error!");
                }
            });
        };

        $scope.changePassword = function () {
            UsersServices.ChangePassword($scope.newPasswordInfo, function (response) {
                if (response.status == 200 && response.data.successMessage == "Password Updated") {
                    toastr.success("Password updated  successfully.", "Success!");
                } else {
                    toastr.error("Failed to update password, try again.", "Error!");
                }
            });
        };

        function refreshUserInfoData() {
            UsersServices.getUserInfo($rootScope.globals.currentUser.userid, function (response) {
                if (response.status == 200) {
                    $scope.newProfileInfo = response.data;
                    $scope.newProfileInfo.status = "A";
                }
            });
        };
        $scope.validateBeforeSave = function(val){
            if (!val) {
                return "This is a required field";
            }
        };

        refreshUserInfoData();
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                controller: ProfileCtrl,
                templateUrl: 'app/pages/profile/profile.html',
                title: 'PROFILE',
                sidebarMeta: {
                    icon: 'fa fa-user fa-lg',
                    order: 2,
                },
            });
    }

})();
