angular
  .module('anguweather', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        controller: 'RootCtrl',
        templateUrl: 'partials/root.html'
      })
      .when('/weather/:zipcode', {
        controller: 'WeatherCtrl',
        templateUrl: '/partials/weather.html'
      })
  })
  .controller('RootCtrl', function() {
    console.log('I am a root controller')
  })
  .controller('WeatherCtrl', function() {
    console.log('I am a weather controller')
  })
