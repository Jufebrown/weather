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
  .controller('RootCtrl', function($scope, $location) {
    console.log('I am a root controller')
    $scope.gotoWeather = () => {$location.url(`/weather/${$scope.zip}`)}
  })
  .controller('WeatherCtrl', function($http, $routeParams, $scope) {
    console.log('I am a weather controller')
    $http.get(`http://api.wunderground.com/api/35084d7263fd2e96/conditions/q/${$routeParams.zipcode}.json`)
    .then((response) => {
      return response.data.current_observation.temp_f
    })
    .then((temp) => {
      $scope.temperature = temp
    })
  })
