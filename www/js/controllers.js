angular.module('WarBuddy.controllers', [])
    .controller('HomeCtrl', function($scope) {})
    .controller('JsonCtrl', function($scope, $stateParams, $http, $state) {
        var id = $stateParams.Id;
        $http.get("data/data.txt")
            .
        success(function(data, status, headers, config) {
                $scope.id = id;
                $scope.units = data.units.unit;
                $scope.rules = data.rules.rule;
                $scope.weapons = data.weapons.weapon;

                function removeDups(array) {
                    var index = {};
                    // traverse array from end to start so removing the current item from the array
                    // doesn't mess up the traversal
                    for (var i = array.length - 1; i >= 0; i--) {
                        if (array[i] in index) {
                            // remove this item
                            array.splice(i, 1);
                        } else {
                            // add this value index
                            index[array[i]] = true;
                        }
                    }
                }
                if ($state.current.name == "tab.units-detail") {
                    var splitWeapons = data.units.unit[id].weapons.split(",");
                    var newWeapons = [];
                    for (missingIndex = splitWeapons.length - 1; missingIndex >= 0; --missingIndex) {
                        var missingRule = {
                            "name": splitWeapons[missingIndex],
                            "text": "Weapon could not be found.",
                        };
                        newWeapons[missingIndex] = missingRule;
                    }
                    for (splitWeaponsIndex = splitWeapons.length - 1; splitWeaponsIndex >= 0; --splitWeaponsIndex) {
                        for (WeaponsListIndex = $scope.weapons.length - 1; WeaponsListIndex >= 0; --WeaponsListIndex) {
                            if (splitWeapons[splitWeaponsIndex] == $scope.weapons[WeaponsListIndex].name) {
                                newWeapons[splitWeaponsIndex] = $scope.weapons[WeaponsListIndex];
                            }
                        }
                    }
                    $scope.fullWeapons = newWeapons;
                }
                if ($state.current.name == "tab.units-detail" || $state.current.name == "tab.weapons-detail") {
                    var joinedRules = data.weapons.weapon[id].rules.split(",")
                        .concat(data.units.unit[id].rules.split(","));
                    removeDups(joinedRules);
                    var splitRules = joinedRules;
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
                    $scope.fullRules = newRules;
                }
            })
            .
        error(function(data, status, headers, config) {
            alert("Connection Failed");
        });
    });
