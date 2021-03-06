const AuthController = function(Auth, $state, $cookies) {
  let vm = this;

  vm.loggedIn = $cookies.get('jwt') || false;

  vm.signin = function(username, password) {
    Auth.login(username, password)
    .then((response) => {
      console.log('response from signin', response)
      $cookies.put('jwt', response.data.token);
      $cookies.put('userId', response.data.user._id)
      vm.loggedIn = true;
      $state.go('home');
    });
  };

  vm.signup = function(email, fullName, username, password, location, isVet) {
    console.log('location', location)
    Auth.signup(email, fullName, username, password, location, isVet)
    .then((response) => {
      $cookies.put('jwt', response.data.token);
      $cookies.put('userId', response.data.user._id);
      $cookies.put('location', response.data.user.location);
      $cookies.put('email', response.data.user.email);
      $state.go('home');
    });
  };

  vm.logout = function() {
    const jwt = $cookies.get('jwt');
    if(!jwt) {
      return;
    }

    $cookies.remove('jwt');
    vm.loggedIn = false;
    $state.go('home');
  }

  vm.state = $state.current.name;
};

AuthController.$inject = ['Auth', '$state', '$cookies'];

export default AuthController;
