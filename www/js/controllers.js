angular.module('WarBuddy.controllers', [])
    .controller('HomeCtrl', function($scope) {})
    .controller('JsonCtrl', function($scope, $stateParams, $http) {
        var id = $stateParams.Id;
        $http.get("data/data.txt")
            .
        success(function(data, status, headers, config) {
                $scope.id = id;
                $scope.units = data.units.unit;
                $scope.rules = data.rules.rule;
                $scope.weapons = data.weapons.weapon;
                if ($scope.id != undefined) {
                    var splitRules = data.weapons.weapon[id].rules.split(",");
                    var newRules = [];
                    for (missingIndex = splitRules.length - 1; missingIndex >= 0; --missingIndex) {
                        var missingRule = {
                            "name": splitRules[missingIndex],
                            "text": "Rule could not be found.",
                        };
                        newRules[missingIndex] = missingRule;
                    }
                    for (splitRulesIndex = splitRules.length - 1; splitRulesIndex >= 0; --splitRulesIndex) {
                        for (ruleListIndex = $scope.rules.length - 1; ruleListIndex >= 0; --ruleListIndex) {
                            if (splitRules[splitRulesIndex] == $scope.rules[ruleListIndex].name) {
                                newRules[splitRulesIndex] = $scope.rules[ruleListIndex];
                            }
                        }
                    }
                    $scope.weapons.fullRules = newRules;
                }
            })
            .
        error(function(data, status, headers, config) {
            alert("Connection Failed");
        });
    });
