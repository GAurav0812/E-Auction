/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages', [
        'ui.router',

        'UApps.pages.dashboard',
        'UApps.pages.auctions',
        'UApps.pages.tenders',
        'UApps.pages.manage',
        'UApps.pages.reports',
        'UApps.pages.users',
        'UApps.pages.profile',
        'UApps.pages.manage.auction',
        'UApps.pages.manage.lot',
        'UApps.pages.manage.department'


    ]).config(routeConfig).run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $http.defaults.headers.common['sessionId'] = $rootScope.globals.currentUser.sessionId;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    //redirect to login page if not logged in
                    if (!$rootScope.globals.currentUser && $location.path() !== '/login') {
                        if ($location.path() !== '/register') {
                            $location.path('/login')
                        }
                    } else if ($location.path() == '/register') {
                        $location.path('/dashboard')
                    }
                }
            );

        }]);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    }


})();
