angular.module("UApps.pages.manage")
    .factory('ManageServices', ManageServices);

function ManageServices($http) {
    var _services = {};

    _services.InsertDepartment = function (obj, callback) {

        $http.post("../rest/department/create", {
            "logoPath": obj.logoPath,
            "name":obj.name
        }).then(function (response) {
            callback(response);
        });

    };


    _services.UpdateDepartment = function (obj, callback) {

        $http.put("../rest/department/update", {
            "id": obj.id.toString(),
            "logoPath": obj.logoPath,
            "name": obj.name,
            "status": obj.status
        }).then(function (response) {
            callback(response);
        });

    };

    _services.GetDepartmentList = function (scope, callback) {

        $http.get("../rest/department/list").then(function (response) {
            callback(response);
        });

    };
    _services.GetAuctionList = function (departmentId, callback) {

        $http.get("../rest/auction/list/"+departmentId).then(function (response) {
            callback(response);
        });

    };

    _services.GetLotsList = function (auctionId, callback) {

        $http.get("../rest/lots/list/"+auctionId).then(function (response) {
            callback(response);
        });

    };

    _services.convertDeptObj = function (obj) {
        var dtfd = (obj.dob != null && obj.dob != "") ? obj.dob.split("-") : "";
        var dt = null;
        if (dtfd != "" && dtfd.length == 3) {
            dt = new Date(dtfd[2] + "-" + dtfd[1] + "-" + dtfd[0]);
        }
        return {
            "id": obj.id,
            "logoPath": obj.logoPath,
            "name": obj.name,
            "status": obj.status
        }
    };



    return _services;

}