/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.register').

    factory('RegistrationService',
        ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
            function (Base64, $http, $cookieStore, $rootScope) {
                var service = {};

                service.InsertUser = function (obj,callback) {

                    $http.post("../rest/user/register", {
                        typeId:obj.typeId,
                        name: obj.name,
                        phone: obj.phone,
                        mobile: obj.mobile,
                        email: obj.email,
                        password: obj.password,
                        companyName: obj.companyName,
                        material: obj.material,
                        address: obj.address,
                        city: obj.city,
                        country: obj.country,
                        state: obj.state,
                        pin: obj.pin,
                        panNumber: obj.panNumber,
                        vatNumber: obj.vatNumber,
                        website: obj.website

                    }).then(function (response) {
                        callback(response);
                    });

                };

                service.getUserType = function (obj, callback) {

                    $http.get("../rest/user/userTypes").then(function (response) {
                        callback(response);
                    });
                };


                service.SetCredentials = function (username, password, userid, sessionId) {
                    var authdata = Base64.encode(username + ':' + password);
                    $rootScope.globals = {
                        currentUser: {
                            userid : userid,
                            authdata: authdata
                        }
                    };

                    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                    $http.defaults.headers.common['sessionId'] = sessionId;
                    $cookieStore.put('globals', $rootScope.globals);
                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    $http.defaults.headers.common.Authorization = 'Basic ';
                    $http.defaults.headers.common.sessionId = ''; // jshint ignore:line
                };

                return service;
            }])


})();
