'use strict';

VCMS.controller('MainCtrl', ['$scope', 'Users',
    function ($scope, Users) {

        // Get users/me data. Will return isAuthenticated: false if not logged in.
        Users.get({
                userId: 'me'
            },
            function (data) {
                $scope.user = data;
            });
    }
]);