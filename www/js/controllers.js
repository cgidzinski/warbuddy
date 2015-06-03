//TODO
//Add No Rule Found if not found
//Remove Possible Dupe Rules when adding both Weapon Rules and Rules for Unit
//Unit Movement

angular.module('WarBuddy.controllers', ['ngStorage'])
    .controller('HomeCtrl', function($scope, $ionicModal, $localStorage, $stateParams, $state) {

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
        //////////////////////////////////////////////////////////////////////
    .controller('ChartCtrl', function($scope, $http, $state) {
        console.log("Chart Page Loaded");
 $scope.tohitroll="";
$scope.towoundroll = "";


$scope.setActivea = function(type) {
    $scope.activea = type;
    calcstats();
};

$scope.isActivea = function(type) {
    return type === $scope.activea;
};

$scope.setActiveb = function(type) {
    $scope.activeb = type;
    calcstats();
};

$scope.isActiveb = function(type) {
    return type === $scope.activeb;
};

$scope.tohitchart = [
            ['4+', '4+', '5+','5+', '5+', '5+','5+', '5+', '5+','5+'],
            ['3+', '4+', '4+','5+', '5+', '5+','5+', '5+', '5+','5+'],
            ['3+', '3+', '4+','4+', '4+', '4+','5+', '5+', '5+','5+'],
            ['3+', '3+', '3+','4+', '4+', '4+','4+', '4+', '5+','5+'],
            ['3+', '3+', '3+','3+', '4+', '4+','4+', '4+', '4+','4+'],
            ['3+', '3+', '3+','3+', '3+', '4+','4+', '4+', '4+','4+'],
            ['3+', '3+', '3+','3+', '3+', '3+','4+', '4+', '4+','4+'],
            ['3+', '3+', '3+','3+', '3+', '3+','3+', '4+', '4+','4+'],
            ['3+', '3+', '3+','3+', '3+', '3+','3+', '3+', '4+','4+'],
            ['3+', '3+', '3+','3+', '3+', '3+','3+', '3+', '3+','4+']
           ];

           $scope.towoundchart = [
            ['4+', '5+', '6+','6+', '-', '-','-', '-', '-','-'],
            ['3+', '4+', '5+','6+', '6+', '-','-', '-', '-','-'],
            ['2+', '3+', '4+','5+', '6+', '6+','-', '-', '-','-'],
            ['2+', '2+', '3+','4+', '5+', '6+','6+', '-', '-','-'],
            ['2+', '2+', '2+','3+', '4+', '5+','6+', '6+', '-','-'],
            ['2+', '2+', '2+','2+', '3+', '4+','5+', '6+', '6+','-'],
            ['2+', '2+', '2+','2+', '2+', '3+','4+', '5+', '6+','6+'],
            ['2+', '2+', '2+','2+', '2+', '2+','3+', '4+', '5+','6+'],
            ['2+', '2+', '2+','2+', '2+', '2+','2+', '3+', '4+','5+'],
            ['2+', '2+', '2+','2+', '2+', '2+','2+', '2+', '3+','4+']
           ];

function calcstats() {
$scope.tohitroll=$scope.tohitchart[$scope.activea][$scope.activeb]
$scope.towoundroll=$scope.towoundchart[$scope.activea][$scope.activeb]
}



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