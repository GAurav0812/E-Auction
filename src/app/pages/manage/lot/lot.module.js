/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.manage.lot', [])
        .config(routeConfig).controller('LotsCtrl', LotsCtrl)
    /** @ngInject */
    function LotsCtrl($scope, $stateParams,LotsServices,$location,$uibModal, ManageServices, toastr, editableOptions, editableThemes) {

        $scope.lotsData = [];
        $scope.lotSafeData = [];
        $scope.lotsPageSize=10;
        var editModalBox;
        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];
        $scope.newLotForm = {};
        $scope.newLotInfo={
            auctionId: $stateParams.auctionId,
            name:"",
            description:"",
            startBid:"",
            differenceFactor:"" ,
            startDate: "",
            endDate: "",
            createdBy: ""
        };
        $scope.addLot = function (isvalid) {
            if (isvalid) {
                $scope.dataLoading = true;
                LotsServices.InsertLot($scope.newLotInfo, function (response) {
                    $scope.dataLoading = false;
                    if (response.status == 200) {
                        toastr.success("Lot added successfully.", "Success!");
                        getLotsData();
                        $scope.newLotInfo.$setPristine();
                        $scope.newLotInfo.auctionId = "";
                        $scope.newLotInfo.name = "";
                        $scope.newLotInfo.description = "";
                        $scope.newLotInfo.startBid = "";
                        $scope.newLotInfo.differenceFactor = "";
                        $scope.newLotInfo.startDate = "";
                        $scope.newLotInfo.endDate = "";
                        $scope.newLotInfo.createdBy = "";

                    } else {
                        toastr.error("Failed to add Lot, try again.", "Error!");
                    }
                });
            }
        };

        $scope.btnClickAddLot = function () {
            $location.path("/lot/add");
        };

        function getLotsData() {
            LotsServices.GetLotsList($stateParams.auctionId, function (response) {
                if (response.status == 200) {
                    $scope.lotSafetData = response.data.lotsResponseList;
                    $scope.lotsData = [].concat($scope.lotSafetData);
                }
            });
        };

        $scope.addLotBox = function () {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manage/lot/add.lot.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };


        $scope.editLotsData = function (item) {
            $scope.editLot = {};
            $scope.editLotInfo = LotsServices.convertLotObj(item);
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manage/lot/edit.lot.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.saveEditFormLot = function (isValid) {
            if (isValid) {
                $scope.updateLot($scope.editLotInfo);
            }
        };
        $scope.updateLot = function (item) {
            LotsServices.UpdateLot(item, function (response) {
                if (response.status == 200 && response.data.successMessage == "1") {
                    toastr.success("Department updated successfully.", "Success!");
                } else {
                    toastr.success("Failed to update the Department.", "Error!");
                }
            });
        };

        getLotsData();
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('lot', {
                url: '/lot/:auctionId',
                controller: LotsCtrl,
                templateUrl: 'app/pages/manage/lot/manage.lot.html',
                title: 'MANAGE LOTS',
            })

    }

})();
/**
 * Created by System2 on 9/23/2016.
 */
/**
 * Created by System2 on 9/23/2016.
 */
