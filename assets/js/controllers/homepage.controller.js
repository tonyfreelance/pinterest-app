'use strict';

angular
    .module('PinterestApp')
    .controller('HomepageController', HomepageController);

HomepageController.$inject = ['logger', '$auth', 'pinService', '$location'];

function HomepageController(logger, $auth, pinService, $location) {
    var vm = this;
    vm.allPins = [];
    vm.loading = true;

    activate();

    function activate() {
        return showAllPins();
    }

    function showAllPins() {
        return pinService.getAllPins()
            .then(function(results) {
                vm.allPins = results.data;
                return vm.allPins;
            })
            .catch(function(err) {
                logger.error(err);
            })
            .finally(function(){
                vm.loading = false;
            });
    }
}
