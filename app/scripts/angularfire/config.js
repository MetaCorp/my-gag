angular.module('firebase.config', [])
  .constant('FBURL', 'https://my-gag.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
