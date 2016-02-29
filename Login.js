'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
  Image
} from 'react-native';

import AuthService from './AuthService';
import Buffer from 'buffer';

const octocat = require('./img/Octocat.png');

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showProgress: false
    }
  }
  render() {
      var errorDisplay = <View />;

      if(!this.state.success && this.state.badCredentials) {
        errorDisplay = <Text style={styles.error}>
          The Username / Password provided were incorrect
        </Text>
      }
      if(!this.state.success && this.state.unknownError) {
        errorDisplay = <Text style={styles.error}>
          An unexpected error was encountered
        </Text>
      }

      return(
          <View
            style={styles.container}>
            <Image
              style={styles.logo}
              source={octocat} />
            <Text
              style={styles.heading}>
                GitHub Browser
              </Text>
            <TextInput
              onChangeText={(text) => this.setState({username: text})}
              style={styles.input}
              placeholder="username" />
            <TextInput
              onChangeText={(text) => this.setState({password: text})}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true} />
            <TouchableHighlight
              onPress={this.onLoginPressed.bind(this)}
              style={styles.button}>
              <Text
                style={styles.buttonText}>
                  Log In
                </Text>
            </TouchableHighlight>

            {errorDisplay}

            <ActivityIndicatorIOS
              animating={this.state.showProgress}
              size="large"
              style={styles.loader} />
          </View>
      )
  }
  onLoginPressed() {
    this.setState({
      showProgress: true
    });

    AuthService.login({
        username: this.state.username,
        password: this.state.password
      }, (results) => {
        this.setState(Object.assign({
          showProgress: false
        }, results));

        if(results.success && this.props.onLogin) {
          this.props.onLogin();
        }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    padding: 10,
    alignItems: 'center'
  },
  logo: {
    width: 55,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    paddingTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 20
  }
})

module.exports = Login;
