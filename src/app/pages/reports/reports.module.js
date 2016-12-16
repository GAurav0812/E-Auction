/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.reports', [])
        .config(routeConfig).controller('ReportsCtrl', ReportsCtrl);

    /** @ngInject */
    function ReportsCtrl($scope, $filter,ManageServices, ReportsServices, toastr, editableOptions, editableThemes) {

        $scope.departmentsData = [];
        $scope.departmentSafetData = [];
        $scope.auctionSafetData = [];
        $scope.auctionsData = [];
        $scope.lotsData = [];
        $scope.lotSafeData = [];
        $scope.reportInfo={
            id:"",
            auctionId:"",
            lotsId:""
        };


        function refreshDepartmentData() {
            ManageServices.GetDepartmentList($scope, function (response) {
                if (response.status == 200) {
                    $scope.departmentSafetData = response.data.departmentResponseList;
                    $scope.departmentsData = [].concat($scope.departmentSafetData);
                }
            });
        }

        $scope.getAuctionsInfo=function(item){
            if($scope.reportInfo.id!='')
            ManageServices.GetAuctionList($scope.reportInfo.id, function (response) {
                if (response.status == 200) {
                    $scope.auctionSafetData = response.data.auctionResponseList;
                    $scope.auctionsData = [].concat($scope.auctionSafetData);
                }
            });
        };

        $scope.getLotsInfo=function(item){
            if($scope.reportInfo.auctionId!='') {
                ManageServices.GetLotsList($scope.reportInfo.auctionId, function (response) {
                    if (response.status == 200) {
                        $scope.lotSafeData = response.data.lotsResponseList;
                        $scope.lotsData = [].concat($scope.lotSafeData);
                    }
                });
            }
        };

        refreshDepartmentData();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reports', {
                url: '/reports',
                controller: ReportsCtrl,
                templateUrl: 'app/pages/reports/reports.html',
                title: 'REPORTS',
                sidebarMeta: {
                    icon: 'fa fa-pie-chart fa-lg',
                    order: 2,
                },
            });
    }

})();
/**
 * Created by System2 on 9/13/2016.
 */
