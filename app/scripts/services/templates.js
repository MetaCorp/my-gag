'use strict';

/**
 * @ngdoc service
 * @name myGagApp.Templates
 * @description
 * # Templates
 * Factory in the myGagApp.
 */
angular.module('myGagApp')
  .factory('Templates', function (Ref, $firebaseArray) {

    var templates = $firebaseArray(Ref.child('templates'));

    // Public API here
    return {
        all: templates
    };
  });
