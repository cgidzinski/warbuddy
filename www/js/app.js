// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('WarBuddy', ['ionic', 'WarBuddy.controllers'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            // Each tab has its own nav history stack:
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('tab.charts', {
                url: '/charts',
                views: {
                    'tab-charts': {
                        templateUrl: 'templates/tab-charts.html',
                        controller: 'ChartCtrl'
                    }
                }
            })
            .state('tab.units', {
                url: '/units',
                views: {
                    'tab-units': {
                        templateUrl: 'templates/tab-units.html',
                        controller: 'UnitListCtrl'
                    }
                }
            })
            .state('tab.units-detail', {
                url: '/units/:Id',
                views: {
                    'tab-units': {
                        templateUrl: 'templates/units-detail.html',
                        controller: 'UnitCtrl'
                    }
                }
            })
            .state('tab.weapons', {
                url: '/weapons',
                views: {
                    'tab-weapons': {
                        templateUrl: 'templates/tab-weapons.html',
                        controller: 'WeaponListCtrl'
                    }
                }
            })
            .state('tab.weapons-detail', {
                url: '/weapons/:Id',
                views: {
                    'tab-weapons': {
                        templateUrl: 'templates/weapons-detail.html',
                        controller: 'WeaponCtrl'
                    }
                }
            })
            .state('tab.rules', {
                url: '/rules',
                views: {
                    'tab-rules': {
                        templateUrl: 'templates/tab-rules.html',
                        controller: 'RuleListCtrl'
                    }
                }
            })
            .state('tab.rules-detail', {
                url: '/rules/:Id',
                views: {
                    'tab-rules': {
                        templateUrl: 'templates/rules-detail.html',
                        controller: 'RuleCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');
    });




