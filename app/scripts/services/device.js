'use strict';

/**
 * @ngdoc service
 * @name myGagApp.Device
 * @description
 * # Device
 * Factory in the myGagApp.
 */
angular.module('myGagApp')
    .factory('Device', function () {

        var isMobile = function () {
            return typeof window.orientation !== 'undefined';
        };

        var getWidth = function () {
            var width = $(window).width();
            return width;
        };
        var getHeight = function () {
            var height = $(window).height();
            return height;
        };

        // Public API here
        return {
            isMobile: isMobile,
            getWidth: getWidth,
            getHeight: getHeight
        };
    });
