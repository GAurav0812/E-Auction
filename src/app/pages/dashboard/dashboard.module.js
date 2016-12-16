/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.dashboard', [])
        .config(routeConfig).controller('DashboardCtrl', DashboardCtrl);

    /** @ngInject */
    function DashboardCtrl($scope, $location) {

        $scope.numberOfMechanics = 0;
        $scope.numberOfCustomers = 0;
        $scope.numberOfRequests = 0;

        $scope.btnClickCreateMechanic = function () {
            $location.path("/mechanics/create");
        };

        /*UsersServices.GetUsersList(2, function (response) {
            if (response.status == 200 && response.data.messageType == "SUCCESS") {
                $scope.numberOfMechanics = response.data.userResponseList.length;
            }
        });

        UsersServices.GetUsersList(3, function (response) {
            if (response.status == 200 && response.data.messageType == "SUCCESS") {
                $scope.numberOfCustomers = response.data.userResponseList.length;
            }
        });*/

    };






    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: DashboardCtrl,
                templateUrl: 'app/pages/dashboard/dashboard.html',
                title: 'DASHBOARD',
                sidebarMeta: {
                    icon: 'fa fa-dashboard fa-lg',
                    order: 0,
                },
            });
    }

})();
