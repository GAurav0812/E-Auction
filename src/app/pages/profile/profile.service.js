angular.module('UApps.pages.profile')
    .factory('ProfileServices', ProfileServices);

function ProfileServices($http) {
    var _services = {};


   /* _services.GetUserList = function (obj, callback) {

        $http.get("../rest/user/list").then(function (response) {
            callback(response);
        });

    };

*/


    return _services;


}
/**
 * Created by System2 on 9/13/2016.
 */
