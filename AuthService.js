import Buffer from 'buffer';
var asyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb) {
    asyncStorage.multiGet([authKey, userKey], (err, val) => {
      if(err) {
        return cb(err);
      }

      if(!val) {
        return cb();
      }

      var zippedObj = _.zipObject(val);

      if(!zippedObj[authKey]) {
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }

      return cb(null, authInfo);
    });
  }
  login(creds, cb) {
    var authObject = Buffer.Buffer(creds.username + ":" + creds.password);
    var encodedAuth = authObject.toString('base64');

    fetch('https://api.github.com/user', {
        headers: {
          'Authorization': 'Basic ' + encodedAuth
        }
      }).
      then((response) => {
        console.log(response)
        if(response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      }).
      then((response) => {
        return response.json();
      }).
      then((results) => {
        asyncStorage.multiSet([
            [authKey, encodedAuth],
            [userKey, JSON.stringify(results)]
          ], (err) => {
            if(err) {
              throw err;
            }

            return cb({success: true});
          });
      }).
      catch((error) => {
        return cb(error)
      });
  }
}

export default new AuthService();
