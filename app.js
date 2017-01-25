angular
  .module('anguweather', ['ngRoute'])
  .config(($routeProvider) => {

    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyA83A4Nz9ZO32NiPeNF8zdcYPTTPb3PYCQ",
      authDomain: "c17-firebase-auth-jufe.firebaseapp.com",
      databaseURL: "https://c17-firebase-auth-jufe.firebaseio.com",
      storageBucket: "c17-firebase-auth-jufe.appspot.com",
      messagingSenderId: "653707776406"
    };
    firebase.initializeApp(config);

    const checkForAuth = {
      checkForAuth: function($location) {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe()
          if(!user) {
            $location.url('/')
          }
        })
      })
    }

    $routeProvider
      .when('/', {
        controller: 'RootCtrl',
        templateUrl: 'partials/root.html'
      })
      .when('/weather/:zipcode', {
        controller: 'WeatherCtrl',
        templateUrl: '/partials/weather.html',
        resolve: checkForAuth
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

  .controller('LoginCtrl', function($scope, authFactory, $location) {
    $scope.login = () => {
      authFactory.login($scope.email, $scope.password)
      .then(() => {
        $location.url('/')
        // $scope.apply()
      })
    }
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

  .factory('authFactory', () => {
    return {
      login(email,pass) {
        firebase.signInWithEmailAndPassword(email,pass)
      },
      getUserId () {
        return firebase.auth().currentUser.uid
      }
    }
  })
