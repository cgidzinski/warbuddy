//TODO
//Add No Rule Found if not found
//Remove Possible Dupe Rules when adding both Weapon Rules and Rules for Unit
//Unit Movement

angular.module('WarBuddy.controllers', ['ngStorage'])
    .controller('HomeCtrl', function($scope, $ionicModal, $localStorage, $stateParams, $state) {
        //   $ionicModal.fromTemplateUrl('templates/settings.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        //   }).then(function(modal) {
        //     $scope.modal = modal;
        //   });
        //   $scope.openModal = function() {
        //     $scope.modal.show();
        //     $scope.InputAddr = angular.copy($localStorage.Repo);
        //   };
        //   $scope.closeModal = function() {
        //    $localStorage.Repo=this.InputAddr;
        // //UPDATE FILES
        //     $scope.modal.hide();
        //   };
        //   //Cleanup the modal when we're done with it!
        //   $scope.$on('$destroy', function() {
        //     $scope.modal.remove();
        //   });
        //   // Execute action on hide modal
        //   $scope.$on('modal.hidden', function() {
        //     // Execute action
        //   });
        //   // Execute action on remove modal
        //   $scope.$on('modal.removed', function() {
        //     // Execute action
        //   });
    })
    //////////////////////////////////////////////////////////////////////
    .controller('UnitListCtrl', function($scope, $http, $state) {
        console.log("Unit List Page Loaded");
        $http.get('http://evg31337.com:3001/API_Units')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.units = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    ///////////////////////////
    .controller('UnitCtrl', function($scope, $http, $stateParams) {
        console.log("Unit Detail Page Loaded");
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Units/' + id)
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.unit = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $scope.ruleList = [];
        $scope.weaponList = [];
        $http.get('http://evg31337.com:3001/API_Weapons/')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.unit.weapons.split(",")
                    .forEach(function(uWeapon) {
                        data.forEach(function(rWeapon) {
                            if (uWeapon == rWeapon.name) {
                                console.log(rWeapon);
                                $scope.weaponList.push(rWeapon);
                                $http.get('http://evg31337.com:3001/API_Rules/')
                                    .
                                success(function(data, status, headers, config) {
                                        //Success Log
                                        rWeapon.rules.split(",")
                                            .forEach(function(wRule) {
                                                data.forEach(function(rRule) {
                                                    if (wRule == rRule.name) {
                                                        console.log(rRule);
                                                        $scope.ruleList.push(rRule);
                                                    }
                                                });
                                            });
                                    })
                                    .
                                error(function(data, status, headers, config) {
                                    //Fail Log
                                    console.log("Connection Failed");
                                    console.log(data + status + headers);
                                });
                            }
                        });
                    });
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $http.get('http://evg31337.com:3001/API_Rules/')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.unit.rules.split(",")
                    .forEach(function(uRule) {
                        data.forEach(function(rRule) {
                            if (uRule == rRule.name) {
                                console.log(rRule);
                                $scope.ruleList.push(rRule);
                            }
                        });
                    });
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    //////////////////////////////////////////////////////////////////////
    .controller('WeaponListCtrl', function($scope, $http, $state) {
        console.log("Weapon List Page Loaded");
        $http.get('http://evg31337.com:3001/API_Weapons')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.weapons = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    ///////////////////////////
    .controller('WeaponCtrl', function($scope, $http, $stateParams) {
        console.log("Weapon Detail Page Loaded");
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Weapons/' + id)
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.weapon = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $scope.ruleList = [];
        $http.get('http://evg31337.com:3001/API_Rules/')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.weapon.rules.split(",")
                    .forEach(function(wRule) {
                        data.forEach(function(rRule) {
                            if (wRule == rRule.name) {
                                console.log(rRule);
                                $scope.ruleList.push(rRule);
                            }
                        });
                    });
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    //////////////////////////////////////////////////////////////////////
    .controller('RuleListCtrl', function($scope, $http, $state) {
        console.log("Rule List Page Loaded");
        $http.get('http://evg31337.com:3001/API_Rules')
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.rules = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    ///////////////////////////
    .controller('RuleCtrl', function($scope, $http, $stateParams) {
        console.log("Rule Detail Page Loaded");
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Rules/' + id)
            .
        success(function(data, status, headers, config) {
                //Success Log
                $scope.rule = data;
                console.log(data);
            })
            .
        error(function(data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    });