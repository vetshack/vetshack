const SoS = function($http, $cookies) {

  const regAsSupport = () => {
    console.log('inside regassupport', $cookies);

    let userId = $cookies.get('userId');

    return $http({
      method: 'POST',
      url: 'api/sos/' + userId
    })
    .then((response) => {
      return response.data.data[0];
    })
    .catch((err) => {
      console.log('Error from attempted sos register: ', err);
      return err;
    });
  };

  const sendDistressMsg = (message, email, location) => {
    let params = {
      message: message
    };

    let config = {
      params: params
    };

    return $http.get('api/sos/' + location + '/' + email, config)
    .then(function(response) {
      return response;
    })
    
  };

  let service = {
    regAsSupport: regAsSupport,
    sendDistressMsg: sendDistressMsg
  };

  return service;
};

SoS.$inject = ['$http', '$cookies'];

export default SoS;
