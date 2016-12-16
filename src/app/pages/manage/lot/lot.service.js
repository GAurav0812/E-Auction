/**
 * Created by System2 on 9/23/2016.
 */
angular.module("UApps.pages.manage.lot")
    .factory('LotsServices', LotsServices);

function LotsServices($http) {
    var _services = {};

    _services.InsertLot = function (obj, callback) {

        $http.post("../rest/lots/create", {
            "auctionId": obj.auctionId,
            "name":obj.name,
            "description":obj.description,
            "startBid":obj.startBid,
            "differenceFactor":obj.differenceFactor ,
            "startDate": obj.startDate, //YYYY-MM-DD HH:MM:SS
            "endDate": obj.endDate, //YYYY-MM-DD HH:MM:SS
            "createdBy": obj.createdBy
        }).then(function (response) {
            callback(response);
        });

    };

    _services.UpdateLot = function (obj, callback) {

        $http.put("../rest/lots/update", {

            "auctionId": obj.auctionId,
            "differenceFactor": obj.differenceFactor,
            "startBid": obj.startBid,
            "id": obj.id,
            "description": obj.description,
            "endDate": obj.endDate,
            "name": obj.name,
            "startDate": obj.startDate,
            "status": obj.status,
            "updatedBy": obj.updatedBy
        }).then(function (response) {
            callback(response);
        });
    };

    _services.GetLotsList = function (auctionId, callback) {

        $http.get("../rest/lots/list/"+auctionId).then(function (response) {
            callback(response);
        });

    };


    _services.convertLotObj = function (obj) {
        return {
            "auctionId": obj.auctionId,
            "differenceFactor": obj.differenceFactor,
            "startBid": obj.startBid,
            "createdBy": obj.createdBy,
            "id": obj.id,
            "description": obj.description,
            "endDate": obj.endDate,
            "linkedUserIds": obj.linkedUserIds,
            "name": obj.name,
            "startDate": obj.startDate,
            "status": obj.status,
            "updatedBy": obj.updatedBy
        }
    };

    return _services;

}/**
 * Created by System2 on 9/23/2016.
 */
