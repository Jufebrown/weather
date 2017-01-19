angular
  .module('anguweather', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider.when('/', {
      controller: 'RootCtrl',
      templateUrl: 'partials/root.html'
    })

  })
  .controller('RootCtrl', function() {
    console.log('I am a root controller')
  })
