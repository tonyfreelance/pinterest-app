'use strict';

angular
    .module('PinterestApp', ['ui.router', 'toastr', 'satellizer', 'akoenig.deckgrid', 'dcbImgFallback'])
    .config(config);

config.$inject = ['$locationProvider', '$authProvider', 'toastrConfig', '$stateProvider', '$urlRouterProvider'];

function config($locationProvider, $authProvider, toastrConfig, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin + '/auth/twitter/callback',
        type: '1.0',
        popupOptions: {
            width: 495,
            height: 645
        }
    });

    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right'
    });

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "partials/home",
            controller: 'HomepageController',
            controllerAs: 'vm'
        })
        .state('logout', {
            url: "/logout",
            template: null,
            controller: "LogoutController"
        })
        .state('recent', {
            url: "/recent",
            templateUrl: "partials/recent",
            controller: 'RecentController',
            controllerAs: 'vm'
        })
        .state('myPins', {
            url: "/my-pins",
            templateUrl: "partials/mypins",
            controller: "MypinsController",
            controllerAs: 'vm',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('addPin', {
            url: "/add-pin",
            templateUrl: "partials/addpin",
            controller: "AddpinController",
            controllerAs: 'vm',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('userPins', {
            url: "/user/:id",
            templateUrl: "partials/userpins",
            controller: "UserpinsController",
            controllerAs: 'vm',
        });

    loginRequired.$inject = ['$q', '$location', '$auth'];

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        }
        else {
            $location.path('/login');
        }
        return deferred.promise;
    }

    skipIfLoggedIn.$inject = ['$q', '$auth'];

    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        }
        else {
            deferred.resolve();
        }
        return deferred.promise;
    }
}