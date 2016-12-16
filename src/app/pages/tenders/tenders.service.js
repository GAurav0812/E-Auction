angular.module('UApps.pages.tenders')
    .factory('TendersServices', TendersServices);

function TendersServices($http) {
    var _services = {};

    _services.GetTendersResponseList = function (value, callback) {
        $http.get("../rest/auction/live/"+value).then(function (response) {
            callback(response);
        });
    };

    _services.GetUpcomingTenResponseList = function (value, callback) {

        $http.get("../rest/auction/upcoming/"+value).then(function (response) {
            callback(response);
        });
    };


    return _services;

}