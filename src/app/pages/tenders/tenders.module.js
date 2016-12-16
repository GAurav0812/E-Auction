/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.tenders', [])
        .config(routeConfig).controller('TendersCtrl', TendersCtrl);

    /** @ngInject */
    function TendersCtrl($scope, $filter, TendersServices, toastr, editableOptions, editableThemes) {

        $scope.tendersLive = [];
        $scope.tendersUpcoming=[];
        $scope.value=1;

        refreshTendersData();
        refreshUpcomingTendersData();

        function refreshTendersData() {
            TendersServices.GetTendersResponseList($scope.value, function (response) {
                if (response.status == 200) {
                    $scope.tendersLive = response.data.auctionResponseList;
                }
            });
        }
        function refreshUpcomingTendersData() {
            TendersServices.GetUpcomingTenResponseList($scope.value, function (response) {
                if (response.status == 200) {
                    $scope.tendersUpcoming= response.data.auctionResponseList;
                }
            });
        }

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('tenders', {
                url: '/tenders',
                controller: TendersCtrl,
                templateUrl: 'app/pages/tenders/tenders.html',
                title: 'TENDERS',
                sidebarMeta: {
                    icon: 'fa fa-file fa-lg',
                    order: 2,
                },
            });
    }

})();
