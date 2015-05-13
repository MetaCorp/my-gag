'use strict';

/**
 * @ngdoc directive
 * @name myGagApp.directive:customOnChange
 * @description
 * # customOnChange
 */
angular.module('myGagApp')
    .directive('cOnChange', function () {
        return {
            restrict: 'A',
            scope: {
                cOnChange: '&'
            },
            link: function (scope, element) {
                element.on('change', function () {
                    scope.cOnChange();
                });
            }
        };
    });
