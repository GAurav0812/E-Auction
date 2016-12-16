angular.module('UApps.pages.auctions')
    .factory('AuctionsServices', AuctionsServices);

function AuctionsServices($http) {
    var _services = {};


    _services.GetAuctionsResponseList = function (value, callback) {
            $http.get("../rest/auction/live/"+value).then(function (response) {
                callback(response);
            });
    };

    _services.GetUpcomingAucResponseList = function (value, callback) {

        $http.get("../rest/auction/upcoming/"+value).then(function (response) {
            callback(response);
        });
    };


    return _services;

}