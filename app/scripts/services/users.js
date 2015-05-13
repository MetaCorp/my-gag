'use strict';

/**
 * @ngdoc service
 * @name myGagApp.Users
 * @description
 * # Users
 * Factory in the myGagApp.
 */
angular.module('myGagApp')
    .factory('Users', function (Ref, $firebaseObject, $firebaseArray) {

        var usersRef = Ref.child('users');

        var getUser = function(userId) {
            return $firebaseObject(usersRef.child(userId));
        };

        var postMeme = function(userId, meme) {
            var userPosts = $firebaseArray(usersRef.child(userId + '/posts'));

            userPosts.$loaded(function(data) {
                var dataExists = data.$value !== null;

                if (!dataExists) {
                    usersRef.child(userId + '/posts').set(meme);
                }
                else {
                    userPosts.$add(meme);
                }
            });

        };

        return {
            get: getUser,
            postMeme: postMeme
        };
    });
