VCMS.factory("Users", ['$resource',
    function ($resource) {
        return $resource('users/:userId', {
            userId: '@_id'
        });
    }
]);