'use strict';

angular
    .module('PinterestApp')
    .controller('NavbarController', NavbarController);

NavbarController.$inject = ['logger', '$auth', '$location'];

function NavbarController(logger, $auth, $location) {
    var vm = this;
    vm.authenticate = authenticate;
    vm.getUsername = getUsername;
    vm.isActive = isActive;
    vm.isAuthenticated = isAuthenticated;
    

    function authenticate(provider) {
        $auth.authenticate(provider)
        .then(function(result) {
            $location.path('/');
            logger.success('You\'ve successfully signed in!');
        })
        .catch(function(err) {
           logger.error(err) ;
        });
    }
    
    function getUsername() {
        if($auth.getPayload()) {
            vm.displayName = $auth.getPayload().displayName;
        }
        return vm.displayName;
    }
    
    function isActive(viewLocation) {
        return viewLocation === $location.path();
    }
    
    function isAuthenticated() {
        return $auth.isAuthenticated();
    }
}
