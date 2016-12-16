/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('UApps.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop($location, AuthenticationService) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: function (scope, el) {
        scope.logout = function () {
          AuthenticationService.ClearCredentials();
          $location.path('/login');
        };
      }
    };
  }

})();