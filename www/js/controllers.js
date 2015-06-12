//TODO
//Add No Rule Found if not found
//Remove Possible Dupe Rules when adding both Weapon Rules and Rules for Unit
//Unit Movement
angular.module('WarBuddy.controllers', ['ngStorage']).controller('HomeCtrl', function ($scope, $ionicModal, $localStorage, $stateParams, $state) {})
    //////////////////////////////////////////////////////////////////////
    .controller('UnitListCtrl', function ($scope, $http, $state, $ionicModal) {
        console.log("Unit List Page Loaded");
        unitGet();
        $ionicModal.fromTemplateUrl('templates/modal-Unit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal
        })
        $scope.openModal = function (item) {
            if (item._id == undefined) {
                $scope.item = {};
            } else {
                $scope.item = item
            }
            $scope.modal.show()
        }
        $scope.closeModal = function (item) {
            if (item._id == undefined) {
                unitPost(item);
            } else {
                unitPut(item);
            }
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        $scope.unitDelete = function (item) {
            $http.delete('http://evg31337.com:3001/API_Units/' + item._id).
            success(function (data, status, headers, config) {
                unitGet();
            });
        }

        function unitPost(item) {
            $http.post('http://evg31337.com:3001/API_Units/', item).
            success(function (data, status, headers, config) {
                console.log("added");
                unitGet();
            });
        }

        function unitPut(item) {
            $http.put('http://evg31337.com:3001/API_Units/' + item._id, item).
            success(function (data, status, headers, config) {
                unitGet();
            });
        }

        function unitGet() {
            $http.get('http://evg31337.com:3001/API_Units').
            success(function (data, status, headers, config) {
                $scope.units = data;
            });
        }
    })
    ///////////////////////////
    .controller('UnitCtrl', function ($scope, $http, $stateParams, $state) {
        console.log("Unit Detail Page Loaded");
        $scope.unit = [];
        $scope.unit.rules = [];
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Units/' + id).
        success(function (data, status, headers, config) {
            //Success Log
            $scope.unit = data;
            switch ($scope.unit.type) {
            case "Infantry":
                $scope.unit.move = 'Movement: 6", Charge: D6';
                break;
            case "Jump Infantry":
                $scope.unit.move = 'Movement: 12", Charge: 2D6,RR';
                break;
            case "Beast":
                $scope.unit.move = 'Movement: 12", Charge: 2D6';
                break;
            case "Cavalary":
                $scope.unit.move = 'Movement: 12", Charge: 2D6';
                break;
            case "Bikes":
                $scope.unit.move = 'Movement: 12", Charge: 2D6';
                break;
            case "Jetbikes":
                $scope.unit.move = 'Movement: 12", Charge: 2D6';
                break;
            case "Artillery":
                $scope.unit.move = 'Movement: 6", Charge:2 D6';
                break;
            case "Jet Pack Infantry":
                $scope.unit.move = 'Movement: 6", Charge: 2D6';
                break;
            case "Monsterous Creature":
                $scope.unit.move = 'Movement: 6", Charge: 2D6';
                break;
            case "Chariots":
                $scope.unit.move = 'Movement: 12", Charge: 2D6';
                break;
            case "Walkers":
                $scope.unit.move = 'Movement: 6", Charge: 2D6';
                break;
            case "Skimmer":
                $scope.unit.move = 'Movement: 12", Charge: X';
                break;
            default:
                $scope.unit.move = 'Movement Not Found';
                break;
            }
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $scope.ruleList = [];
        $scope.weaponList = [];
        $http.get('http://evg31337.com:3001/API_Weapons/').
        success(function (data, status, headers, config) {
            //Success Log
            $scope.unit.weapons.split(",").forEach(function (uWeapon) {
                data.forEach(function (rWeapon) {
                    if (uWeapon == rWeapon.name) {
                        console.log(rWeapon);
                        $scope.weaponList.push(rWeapon);
                        $http.get('http://evg31337.com:3001/API_Rules/').
                        success(function (data, status, headers, config) {
                            //Success Log
                            rWeapon.rules.split(",").forEach(function (wRule) {
                                data.forEach(function (rRule) {
                                    if (wRule == rRule.name) {
                                        console.log(rRule);
                                        $scope.ruleList.push(rRule);
                                    }
                                });
                            });
                        }).
                        error(function (data, status, headers, config) {
                            //Fail Log
                            console.log("Connection Failed");
                            console.log(data + status + headers);
                        });
                    }
                });
            });
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $http.get('http://evg31337.com:3001/API_Rules/').
        success(function (data, status, headers, config) {
            //Success Log
            $scope.unit.rules.split(",").forEach(function (uRule) {
                data.forEach(function (rRule) {
                    if (uRule == rRule.name) {
                        console.log(rRule);
                        $scope.ruleList.push(rRule);
                    }
                });
            });
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    }) 
    //////////////////////////////////////////////////////////////////////
    .controller('WeaponListCtrl', function ($scope, $http, $state, $ionicModal) {
        console.log("Weapon List Page Loaded");
       weaponGet();
        $ionicModal.fromTemplateUrl('templates/modal-Weapon.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal
        })
        $scope.openModal = function (item) {
            if (item._id == undefined) {
                $scope.item = {};
            } else {
                $scope.item = item
            }
            $scope.modal.show()
        }
        $scope.closeModal = function (item) {
            if (item._id == undefined) {
                weaponPost(item);
            } else {
                weaponPut(item);
            }
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        $scope.weaponDelete = function (item) {
            $http.delete('http://evg31337.com:3001/API_weapons/' + item._id).
            success(function (data, status, headers, config) {
                weaponGet();
            });
        }

        function weaponPost(item) {
            $http.post('http://evg31337.com:3001/API_weapons/', item).
            success(function (data, status, headers, config) {
                console.log("added");
                weaponGet();
            });
        }

        function weaponPut(item) {
            $http.put('http://evg31337.com:3001/API_weapons/' + item._id, item).
            success(function (data, status, headers, config) {
                weaponGet();
            });
        }

        function weaponGet() {
            $http.get('http://evg31337.com:3001/API_weapons').
            success(function (data, status, headers, config) {
                $scope.weapons = data;
            });
        }
    })
    ///////////////////////////
    .controller('WeaponCtrl', function ($scope, $http, $stateParams) {
        console.log("Weapon Detail Page Loaded");
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Weapons/' + id).
        success(function (data, status, headers, config) {
            //Success Log
            $scope.weapon = data;
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
        $scope.ruleList = [];
        $http.get('http://evg31337.com:3001/API_Rules/').
        success(function (data, status, headers, config) {
            //Success Log
            $scope.weapon.rules.split(",").forEach(function (wRule) {
                data.forEach(function (rRule) {
                    if (wRule == rRule.name) {
                        console.log(rRule);
                        $scope.ruleList.push(rRule);
                    }
                });
            });
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    })
    //////////////////////////////////////////////////////////////////////
    .controller('RuleListCtrl', function ($scope, $http, $state, $ionicModal) {
        console.log("Rule List Page Loaded");
        ruleGet();
        $ionicModal.fromTemplateUrl('templates/modal-Rule.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal
        })
        $scope.openModal = function (item) {
            if (item._id == undefined) {
                $scope.item = {};
            } else {
                $scope.item = item
            }
            $scope.modal.show()
        }
        $scope.closeModal = function (item) {
            if (item._id == undefined) {
                rulePost(item);
            } else {
                rulePut(item);
            }
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        $scope.ruleDelete = function (item) {
            $http.delete('http://evg31337.com:3001/API_Rules/' + item._id).
            success(function (data, status, headers, config) {
                ruleGet();
            });
        }

        function rulePost(item) {
            $http.post('http://evg31337.com:3001/API_Rules/', item).
            success(function (data, status, headers, config) {
                console.log("added");
                ruleGet();
            });
        }

        function rulePut(item) {
            $http.put('http://evg31337.com:3001/API_Rules/' + item._id, item).
            success(function (data, status, headers, config) {
                ruleGet();
            });
        }

        function ruleGet() {
            $http.get('http://evg31337.com:3001/API_Rules').
            success(function (data, status, headers, config) {
                $scope.rules = data;
            });
        }
    })
    //////////////////////////////////////////////////////////////////////
    .controller('ChartCtrl', function ($scope, $http, $state) {
        console.log("Chart Page Loaded");
        $scope.tohitroll = "";
        $scope.towoundroll = "";
       $scope.attacker=1;
       $scope.defender=1;





        $scope.tohitchart = [
            ['4+', '4+', '5+', '5+', '5+', '5+', '5+', '5+', '5+', '5+'],
            ['3+', '4+', '4+', '5+', '5+', '5+', '5+', '5+', '5+', '5+'],
            ['3+', '3+', '4+', '4+', '4+', '4+', '5+', '5+', '5+', '5+'],
            ['3+', '3+', '3+', '4+', '4+', '4+', '4+', '4+', '5+', '5+'],
            ['3+', '3+', '3+', '3+', '4+', '4+', '4+', '4+', '4+', '4+'],
            ['3+', '3+', '3+', '3+', '3+', '4+', '4+', '4+', '4+', '4+'],
            ['3+', '3+', '3+', '3+', '3+', '3+', '4+', '4+', '4+', '4+'],
            ['3+', '3+', '3+', '3+', '3+', '3+', '3+', '4+', '4+', '4+'],
            ['3+', '3+', '3+', '3+', '3+', '3+', '3+', '3+', '4+', '4+'],
            ['3+', '3+', '3+', '3+', '3+', '3+', '3+', '3+', '3+', '4+']
        ];
        $scope.towoundchart = [
            ['4+', '5+', '6+', '6+', '-', '-', '-', '-', '-', '-'],
            ['3+', '4+', '5+', '6+', '6+', '-', '-', '-', '-', '-'],
            ['2+', '3+', '4+', '5+', '6+', '6+', '-', '-', '-', '-'],
            ['2+', '2+', '3+', '4+', '5+', '6+', '6+', '-', '-', '-'],
            ['2+', '2+', '2+', '3+', '4+', '5+', '6+', '6+', '-', '-'],
            ['2+', '2+', '2+', '2+', '3+', '4+', '5+', '6+', '6+', '-'],
            ['2+', '2+', '2+', '2+', '2+', '3+', '4+', '5+', '6+', '6+'],
            ['2+', '2+', '2+', '2+', '2+', '2+', '3+', '4+', '5+', '6+'],
            ['2+', '2+', '2+', '2+', '2+', '2+', '2+', '3+', '4+', '5+'],
            ['2+', '2+', '2+', '2+', '2+', '2+', '2+', '2+', '3+', '4+']
        ];

       $scope.calcstats = function(atk,def) {
             $scope.tohitroll = $scope.tohitchart[atk-1][def-1]
             $scope.towoundroll = $scope.towoundchart[atk-1][def-1]
        }
        $scope.calcstats(1,1);
    })
    ///////////////////////////
    .controller('RuleCtrl', function ($scope, $http, $stateParams) {
        console.log("Rule Detail Page Loaded");
        var id = $stateParams.Id;
        $http.get('http://evg31337.com:3001/API_Rules/' + id).
        success(function (data, status, headers, config) {
            //Success Log
            $scope.rule = data;
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            //Fail Log
            console.log("Connection Failed");
            console.log(data + status + headers);
        });
    });