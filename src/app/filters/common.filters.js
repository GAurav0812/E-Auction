/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.filters', [])
        .filter('statusFullForm', statusFullForm)
        .filter('isVerifiedFullForm', isVerifiedFullForm)
        .filter('accountTypeFullForm', accountTypeFullForm)
        .filter('unassignedDeptFilter', unassignedDeptFilter);


    function statusFullForm() {
        return function (value) {
            return value == "I" ? "InActive" : "Active";
        };
    }

    function isVerifiedFullForm() {
        return function (value) {
            return value == "false" ? "No" : "Yes";
        };
    }

    function accountTypeFullForm() {
        return function (value) {
            if (value == "1")
                return "Administrator";
            else if (value == "4")
                return "Observer";
            else if (value == "3")
                return "Participator";
        };
    }


    function unassignedDeptFilter() {
        return function (value) {
            if (value == '')
                return "Not Assigned";
            else
                return value;
        };
    }

    /* function blankLogoFilter() {
     return function (value) {
     if (value == '') {
     return "";
     }else{
     return value;
     }

     };
     }*/

})();
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
