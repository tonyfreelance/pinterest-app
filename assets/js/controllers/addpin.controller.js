'use strict';

angular
    .module('PinterestApp')
    .controller('AddpinController', AddpinController);

AddpinController.$inject = ['logger', '$auth', 'pinService', '$location'];

function AddpinController(logger, $auth, pinService, $location) {
    var vm = this;
    var userId = $auth.getPayload().userId;
    vm.addPin = addPin;
    vm.title = '';
    vm.pinUrl = '';

    function addPin() {
        return pinService.addPin(userId, vm.title, vm.pinUrl)
            .then(function(result) {
                $location.path('/my-pins');
            })
            .catch(function(err) {
                logger.error(err);
            });
    }
}
