/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.manage', [])
        .config(routeConfig).controller('ManageCtrl', ManageCtrl)
    /** @ngInject */
    function ManageCtrl($location) {
        $location.path("/manage/dept");
    };

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manage', {
                url: '/manage',
                template: '<ui-view></ui-view>',
                controller: ManageCtrl,
                title: 'MANAGE',
                sidebarMeta: {
                    icon: 'fa fa-cog fa-lg',
                    order: 2,
                },
            });

    }

})();
