'use strict';

angular
    .module('PinterestApp')
    .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$location', '$auth', 'logger'];

function LogoutController($location, $auth, logger) {
    var vm = this;
    
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout()
        .then(function() {
            logger.success('You have been logged out');
            $location.path('/');
        });
}
