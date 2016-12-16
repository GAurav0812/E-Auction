/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.auctions', [])
        .config(routeConfig).controller('AuctionsCtrl', AuctionsCtrl);

    /** @ngInject */
    function AuctionsCtrl($scope, $filter, AuctionsServices, toastr, editableOptions, editableThemes) {


        $scope.auctionsLive = [];
        $scope.auctionsUpcoming=[];
        $scope.value=0;


        refreshAuctionData();
        refreshUpcomingAuctionData();

        function refreshAuctionData() {
            AuctionsServices.GetAuctionsResponseList($scope.value, function (response) {
                if (response.status == 200) {
                    $scope.auctionsLive = response.data.auctionResponseList;
                }
            });
        }
        function refreshUpcomingAuctionData() {
            AuctionsServices.GetUpcomingAucResponseList($scope.value, function (response) {
                if (response.status == 200) {
                    $scope.auctionsUpcoming= response.data.auctionResponseList;
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
            .state('auctions', {
                url: '/auctions',
                controller: AuctionsCtrl,
                templateUrl: 'app/pages/auctions/auctions.html',
                title: 'AUCTIONS',
                sidebarMeta: {
                    icon: 'fa fa-gavel fa-lg',
                    order: 2,
                },
            });
    }

})();
