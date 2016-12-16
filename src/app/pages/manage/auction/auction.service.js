/**
 * Created by System2 on 9/23/2016.
 */
angular.module("UApps.pages.manage.auction")
    .factory('AuctionServices', AuctionServices);

function AuctionServices($http) {
    var _services = {};

    _services.InsertAuction = function (obj, callback) {

        $http.post("../rest/department/create", {

            "name": obj.name,
            "auctionTypeId": obj.auctionTypeId,
            "description": obj.description,
            "deptId": obj.deptId,
            "startDate": obj.startDate, //YYYY-MM-DD HH:MM:SS
            "endDate": obj.endDate, //YYYY-MM-DD HH:MM:SS
            "catalog": obj.catalog,
            "createdBy": obj.createdBy,
            "updatedBy": obj.updatedBy

        }).then(function (response) {
            callback(response);
        });

    };


    _services.UpdateAuction = function (obj, callback) {

        $http.put("../rest/auction/update", {

            "auctionTypeId": obj.auctionTypeId,
            "autoBidLimit": obj.autoBidLimit,
            "autoTimeExtensionLimit": obj.autoTimeExtensionLimit,
            "catalog": obj.catalog,
            "deptId": obj.deptId,
            "id": obj.id,
            "description": obj.description,
            "endDate": obj.endDate,
            "isAuctionTender": obj.isAuctionTender,
            "lotsDisplayType": obj.lotsDisplayType,
            "name": obj.name,
            "startDate": obj.startDate,
            "status": obj.status,
            "tenderEndDate": obj.tenderEndDate,
            "tenderStartDate": obj.tenderStartDate,
            "updatedBy": obj.updatedBy

        }).then(function (response) {
            callback(response);
        });

    };

    _services.GetAuctionList = function (departmentId, callback) {

        $http.get("../rest/auction/list/"+departmentId).then(function (response) {
            callback(response);
        });

    };


    _services.convertAuctionObj = function (obj) {
        var dtfd = (obj.dob != null && obj.dob != "") ? obj.dob.split("-") : "";
        var dt = null;
        if (dtfd != "" && dtfd.length == 3) {
            dt = new Date(dtfd[2] + "-" + dtfd[1] + "-" + dtfd[0]);
        }
        return {
            "auctionId": obj.auctionId,
            "auctionTypeId": obj.auctionTypeId,
            "autoBidLimit": obj.autoBidLimit,
            "autoTimeExtensionLimit": obj.autoTimeExtensionLimit,
            "catalog": obj.catalog,
            "createdBy": obj.createdBy,
            "deptId": obj.deptId,
            "description": obj.description,
            "endDate": obj.endDate,
            "isTender": obj.isTender,
            "lotsDisplayType": obj.lotsDisplayType,
            "name": obj.name,
            "startDate": obj.startDate,
            "status": obj.status,
            "tenderEndDate": obj.tenderEndDate,
            "tenderStartDate": obj.tenderStartDate,
            "updatedBy": obj.updatedBy
        }
    };

    return _services;

}