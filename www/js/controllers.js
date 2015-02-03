angular.module('WarBuddy.controllers', [])

.controller('HomeCtrl', function($scope) {})












.controller('UnitsCtrl', function($scope, $http) {
    $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.units = data.units.unit;
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
})


.controller('UnitsDetailCtrl', function($scope, $stateParams, $http) {
  var id = $stateParams.Id;
     $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.units = data.units.unit[id];
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
})

.controller('WeaponsCtrl', function($scope, $http) {
    $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.weapons = data.weapons.weapon;
        console.log($scope.weapons);
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
})


.controller('WeaponsDetailCtrl', function($scope, $stateParams, $http) {
  var id = $stateParams.Id;
     $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.weapons = data.weapons.weapon[id];
        $scope.rules = data.rules.rule;
        var splitRules = $scope.weapons.rules.split(",");
        var newRules = [];
 for (missingIndex = splitRules.length - 1; missingIndex >= 0; --missingIndex) {
  var missingRule ={"name": splitRules[missingIndex],"text": "Rule could not be found.",};
    newRules[missingIndex] = missingRule;
}
for (splitRulesIndex = splitRules.length - 1; splitRulesIndex >= 0; --splitRulesIndex) {
    for (ruleListIndex = $scope.rules.length - 1; ruleListIndex >= 0; --ruleListIndex) {
    if (splitRules[splitRulesIndex] == $scope.rules[ruleListIndex].name)
    {
newRules[splitRulesIndex] = $scope.rules[ruleListIndex];
    }
}} 
        $scope.weapons.fullRules = newRules;
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
})






.controller('RulesCtrl', function($scope, $http) {
    $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.rules = data.rules.rule;
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
})

.controller('RulesDetailCtrl', function($scope, $stateParams, $http) {
  var id = $stateParams.Id;
     $http.get("data/data.txt").
    success(function(data, status, headers, config) {
        $scope.rules = data.rules.rule[id];
    }).
    error(function(data, status, headers, config) {
        alert("Connection Failed");
    });
});
