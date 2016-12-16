/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.manage.auction', [])
        .config(routeConfig).controller('AuctionCtrl', AuctionCtrl)
    /** @ngInject */
    function AuctionCtrl($scope, $stateParams,$location,AuctionServices, Upload, $timeout, $uibModal, ManageServices, toastr, editableOptions, editableThemes) {


        $scope.deptId = $stateParams.deptId;
        $scope.auctionSafetData = [];
        $scope.auctionPageSize=10;
        $scope.auctionsData = [];
        var editModalBox;
        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];

        $scope.AuctionType = [
            {auctionTypeId: '1', text: 'FORWARD AUCTION'},
            {auctionTypeId: '2', text: 'REVERSE AUCTION'}
        ];

        $scope.newAuctionForm = {};
        $scope.newAuctionInfo = {
            name:"",
            auctionTypeId: "",
            description: "",
            deptId: "",
            startDate: "",
            endDate: "",
            catalog: "",
            createdBy: "",
            updatedBy: "```"
        };

        function getAuctionsData() {
            AuctionServices.GetAuctionList($scope.deptId, function (response) {
                if (response.status == 200) {
                    $scope.auctionSafetData = response.data.auctionResponseList;
                    $scope.auctionsData = [].concat($scope.auctionSafetData);
                }
            });
        };

        $scope.uploadCatalog = function (file) {
            var curDate = new Date();
            var catalogFolder = $scope.editAuctionInfo.catalog.indexOf("/") >= 0 ? $scope.editAuctionInfo.catalog.split("/")[0] : ("auction_catalog_" + curDate.getTime());
            file.upload = Upload.upload({
                url: '../rest/files/upload?fn=' + catalogFolder,
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.uploaded=true;
                    toastr.success("File Uploaded successfully.", "Success!");
                    file.result = response.data;
                    $scope.editAuctionInfo.catalog = response.data.filePath;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.addAuction = function (isvalid) {
            if (isvalid) {
                $scope.dataLoading = true;
                AuctionServices.InsertAuction($scope.newAuctionInfo, function (response) {
                    $scope.dataLoading = false;
                    if (response.status == 200) {
                        toastr.success("Auction added successfully.", "Success!");
                        getAuctionsData();
                        $scope.newAuctionInfo.$setPristine();
                        $scope.newAuctionInfo.name = "";
                        $scope.newAuctionInfo.auctionTypeId = "";
                        $scope.newAuctionInfo.description = "";
                        $scope.newAuctionInfo.deptId = "";
                        $scope.newAuctionInfo.differenceFactor = "";
                        $scope.newAuctionInfo.startDate = "";
                        $scope.newAuctionInfo.endDate = "";
                        $scope.newAuctionInfo.createdBy = "";
                        $scope.newAuctionInfo.catalog = "";
                        $scope.newAuctionInfo.updatedBy = "";

                    } else {
                        toastr.error("Failed to add Lot, try again.", "Error!");
                    }
                });
            }
        };

        $scope.addAuctionBox = function () {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manage/auction/add.auction.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };

        $scope.goToLotsPage = function (item) {
            $location.path("/lot/" + item.auctionId);
        };

        $scope.editAuc = function (item) {
            $scope.editAuction = {};
            $scope.editAuctionInfo = AuctionServices.convertAuctionObj(item);
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manage/auction/edit.auction.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.saveEditFormAuction = function (isValid) {
            if (isValid) {
                $scope.updateAuction($scope.editAuctionInfo);
            }
        };
        $scope.updateAuction = function (item) {
            AuctionServices.UpdateAuction(item, function (response) {
                if (response.status == 200 && response.data.successMessage == "1") {
                    toastr.success("Department updated successfully.", "Success!");
                } else {
                    toastr.success("Failed to update the Department.", "Error!");
                }
            });
        };

        getAuctionsData();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auction', {
                url: '/auction/:deptId',
                controller: AuctionCtrl,
                templateUrl: 'app/pages/manage/auction/manage.auctions.html',
                title: 'MANAGE AUCTION',
            })

    }

})();
/**
 * Created by System2 on 9/23/2016.
 */
