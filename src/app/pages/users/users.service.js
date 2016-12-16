angular.module('UApps.pages.users')
    .factory('UsersServices', UsersServices);

function UsersServices($http, $rootScope) {
    var _services = {};

    _services.InsertUser = function (obj, callback) {

        $http.post("../rest/user/register", {

            "typeId": obj.typeId,
            "name": obj.name,
            "companyName": obj.companyName,
            "email": obj.email,
            "password": obj.password,
            "material": obj.tring,
            "address": obj.address,
            "country": objcountry,
            "state": obj.state,
            "city": obj.city,
            "pin": obj.pin,
            "panNumber": obj.panNumber,
            "vatNumber": obj.vatNumber,
            "mobile": obj.mobile,
            "phone": obj.phone

        }).then(function (response) {
            callback(response);
        });

    };

    _services.GetUsersList = function (scope, callback) {

        $http.get("../rest/user/list").then(function (response) {
            callback(response);
        });

    };
    _services.UpdateUser = function (obj, callback) {

        $http.post("../rest/user/update", {

            "typeId": obj.typeId,
            "id":obj.id,
            "name": obj.name,
            "status":obj.status,
            "companyName": obj.companyName,
            "email": obj.email,
            "material": obj.material,
            "address": obj.address,
            "country": obj.country,
            "state": obj.state,
            "city": obj.city,
            "pin": obj.pin,
            "panNumber": obj.panNumber,
            "vatNumber": obj.vatNumber,
            "mobile": obj.mobile,
            "phone": obj.phone

        }).then(function (response) {
            callback(response);
        });
    };

    _services.AddAssignDept = function (obj, callback) {

        $http.post("../rest/user/assignDept", {
            "userId": obj.userId,
            "departmentId": obj.departmentId,
        }).then(function (response) {
            callback(response);
        });

    };

    _services.getUserInfo = function (userid, callback ) {

        $http.get("../rest/user/userInfo/" + userid).then(function (response) {
            callback(response);
        });

    };


    _services.ChangePassword = function (obj, callback) {

        $http.post("../rest/user/changePassword", {
            "newPassword": obj.newPassword,
            "oldPassword": obj.oldPassword,
            "userId":$rootScope.globals.currentUser.userid,
        }).then(function (response) {
            callback(response);
        });

    };


    _services.convertUserObj = function (obj) {
        var dtfd = (obj.dob != null && obj.dob != "") ? obj.dob.split("-") : "";
        var dt = null;
        if (dtfd != "" && dtfd.length == 3) {
            dt = new Date(dtfd[2] + "-" + dtfd[1] + "-" + dtfd[0]);
        }
        return {
            "id": obj.id,
            "status": obj.status,
            "name": obj.name,
            "mobile": obj.mobile,
            "email": obj.email,
            "address": obj.address,
            "typeId": obj.typeId,
            "companyName": obj.companyName,
            "material": obj.material,
            "country": obj.country,
            "state": obj.state,
            "city": obj.city,
            "pin": obj.pin,
            "panNumber": obj.panNumber,
            "vatNumber": obj.vatNumber,
            "phone": obj.phone
        }
    };

return _services;

}/**
 * Created by System2 on 9/13/2016.
 */
