'use strict';

angular
    .module('PinterestApp')
    .controller('UserpinsController', UserpinsController);

UserpinsController.$inject = ['logger', '$auth', 'pinService', '$location', '$stateParams'];

function UserpinsController(logger, $auth, pinService, $location, $stateParams) {
    var vm = this;
    var userId = $stateParams.id;
    vm.username = '';
    vm.userPins = [];

    activate();

    function activate() {
        return showUserPins();
    }

    function showUserPins() {
        return pinService.getUserPins(userId)
            .then(function(results) {
                vm.userPins = results.data.pins;
                vm.username = results.data.displayName;
                return vm.userPins;
            })
            .catch(function(err) {
                logger.error(err);
            });
    }
}
