'use strict';

VCMS.directive('header', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'views/includes/header.html',
        link: {
            pre: function (scope, linkElement, attrs) {

            }
        }
    };
});