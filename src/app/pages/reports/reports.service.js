angular.module('UApps.pages.reports')
    .factory('ReportsServices', ReportsServices);

function ReportsServices($http) {
    var _services = {};



    /*_services.GetAutomobileList = function (autoMobileTypeId, callback) {

        $http.get("../rest/automobile/list/" + autoMobileTypeId).then(function (response) {
            callback(response);
        });

    };*/

    return _services;

}/**
 * Created by System2 on 9/13/2016.
 */
