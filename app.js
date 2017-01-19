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
  .controller('WeatherCtrl', function(weatherFactory, $routeParams, $scope) {
    console.log('I am a weather controller')
    weatherFactory
      .getWeather($routeParams.zipcode)
      .then((weather) => {
        $scope.temperature = weather.temp
        $scope.city = weather.city
      })
  })
  .factory('weatherFactory', ($http) => {
    return {
      getWeather (zipcode) {
        return $http
          .get(`http://api.wunderground.com/api/35084d7263fd2e96/conditions/q/${zipcode}.json`)
          .then((response) => {
            return {
              temp: response.data.current_observation.temp_f,
              city: response.data.current_observation.display_location.full,
            }
          })
      },
    }
  })
