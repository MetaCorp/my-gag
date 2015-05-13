'use strict';

/**
 * @ngdoc service
 * @name myGagApp.Objects
 * @description
 * # Objects
 * Factory in the myGagApp.
 */
angular.module('myGagApp')
  .factory('Objects', function (Ref, $firebaseArray) {

    var objects = $firebaseArray(Ref.child('objects'));

    // Public API here
    return {
        all: objects
    };
  });
