'use strict';

angular
    .module('PinterestApp')
    .factory('pinService', pinService);

pinService.$inject = ['$http'];

function pinService($http) {
    var service = {
        addPin: addPin,
        deletePin: deletePin,
        getAllPins: getAllPins,
        getMyPins: getMyPins,
        getUserPins: getUserPins,
    };

    return service;
    ////////////////////////////////////

    function addPin(userId, title, url) {
        var data = {
            owner: userId,
            title: title,
            url: 'https://process.filestackapi.com/A8QX4Z6BFTaOB4A6rz0vgz/resize=width:188/' + url
        };

        return $http.post('/pin', data);
    }

    function deletePin(pinId) {
        return $http.delete('/pin/' + pinId);
    }
    
    function getAllPins() {
        return $http.get('/pin');
    }
    
    function getMyPins(userId) {
        return $http.get('/user/' + userId + '/pins');
    }

    function getUserPins(userId) {
        return $http.get('/user/' + userId);
    }
}