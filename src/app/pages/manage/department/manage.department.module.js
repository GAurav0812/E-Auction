/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.manage.department', [])
        .config(routeConfig).controller('ManageDeptCtrl', ManageDeptCtrl)
    /** @ngInject */
    function ManageDeptCtrl($scope, Upload, $location, $timeout, $uibModal, ManageServices, toastr, editableOptions, editableThemes) {

        $scope.dataLoading = false;
        $scope.departmentPageSize = 10;
        $scope.departmentsData = [];
        $scope.departmentSafetData = [];
        $scope.auctionSafetData = [];
        $scope.auctionsData = [];
        $scope.lotsData = [];
        $scope.lotSafeData = [];
        var editModalBox;
        $scope.departmentMasterData = [];

        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];
        $scope.newDeptForm = {};
        $scope.newDeptInfo = {
            logoPath: "",
            name: ""
        };


        $scope.editDeptInfo = {};

        $scope.uploadLogo = function (file) {
            var curDate = new Date();
            var logoFolder = $scope.newDeptInfo.logoPath.indexOf("/") >= 0 ? $scope.newDeptInfo.logoPath.split("/")[0] : ("dept_logo_" + curDate.getTime());
            file.upload = Upload.upload({
                url: '../rest/files/upload?fn=' + logoFolder,
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    toastr.success("File Uploaded successfully.", "Success!");
                    file.result = response.data;
                    $scope.newDeptInfo.logoPath = response.data.filePath;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.uploadPic = function (file) {
            var curDate = new Date();
            var logoFolder = $scope.editDeptInfo.logoPath.indexOf("/") >= 0 ? $scope.editDeptInfo.logoPath.split("/")[0] : ("dept_logo_" + curDate.getTime());
            file.upload = Upload.upload({
                url: '../rest/files/upload?fn=' + logoFolder,
                data: {file: file}
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.editDeptInfo.logoPath = response.data.filePath;
                    $scope.updateDepartment($scope.editDeptInfo);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        refreshDepartmentData();

        $scope.addDepartment = function (isvalid) {
            if (isvalid) {
                $scope.dataLoading = true;
                ManageServices.InsertDepartment($scope.newDeptInfo, function (response) {
                    $scope.dataLoading = false;
                    if (response.status == 200) {
                        toastr.success("Department added successfully.", "Success!");
                        refreshDepartmentData();
                        $scope.newDeptInfo.$setPristine();
                        $scope.newDeptInfo.logoPath = "";
                        $scope.newDeptInfo.name = "";
                    } else {
                        toastr.error("Failed to add the department, try again.", "Error!");
                    }
                });
            }
        };

        $scope.validateBeforeSave = function (val) {
            if (!val) {
                return "This is a required field";
            }
        };
        function refreshDepartmentData() {
            ManageServices.GetDepartmentList($scope, function (response) {
                if (response.status == 200) {
                    $scope.departmentSafetData = response.data.departmentResponseList;
                    $scope.departmentsData = [].concat($scope.departmentSafetData);
                }
            });
        }

        $scope.goToAuctionPage = function (item) {
            $location.path("/auction/" + item.id);
        };

        $scope.editDepartment = function (item) {
            $scope.editDept = {};
            $scope.editDeptInfo = ManageServices.convertDeptObj(item);
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manage/department/edit.manage.dept.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };



        $scope.saveEditFormChange = function (isValid) {
            if (isValid) {
                $scope.updateDepartment($scope.editDeptInfo);
            }
        };
        $scope.updateDepartment = function (item) {
            ManageServices.UpdateDepartment(item, function (response) {
                if (response.status == 200 && response.data.successMessage == "SUCCESS") {
                    toastr.success("Department updated successfully.", "Success!");
                    refreshDepartmentData();
                } else {
                    toastr.success("Failed to update the Department.", "Error!");
                }
            });
        };


        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider

            .state('department', {
                url: '/manage/dept',
                controller: ManageDeptCtrl,
                templateUrl: 'app/pages/manage/department/manage.department.html',
                title: 'MANAGE DEPARTMENT'
            });

    }

})();
