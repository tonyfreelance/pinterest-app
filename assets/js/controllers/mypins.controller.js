'use strict';

angular
    .module('PinterestApp')
    .controller('MypinsController', MypinsController);

MypinsController.$inject = ['logger', '$auth', 'pinService', '$location'];

function MypinsController(logger, $auth, pinService, $location) {
    var vm = this;
    var userId = $auth.getPayload().userId;
    vm.deletePin = deletePin;
    vm.myPins = [];

    activate();

    function activate() {
        return showMyPins();
    }

    function deletePin(pin, index) {
        return pinService.deletePin(pin.id)
            .then(function(results) {
                vm.myPins.splice(index, 1);
                return vm.myPins;
            })
            .catch(function(err) {
                logger.error(err);
            });
    }
    
    function showMyPins() {
        return pinService.getMyPins(userId)
            .then(function(results) {
                //   logger.success(results);
                vm.myPins = results.data;
                return vm.myPins;
            })
            .catch(function(err) {
                logger.error(err);
            });
    }




}
