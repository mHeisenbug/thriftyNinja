/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import Login from './Login';
import AppContainer from './AppContainer';

import React, {
  ActivityIndicatorIOS,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AuthService from './AuthService';

class thriftyNinja extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })

  }
  render() {
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS animating={true} size="large" style={styles.loader} />
        </View>
      )
    }
    if(this.state.isLoggedIn) {
      return(
        <AppContainer />
      );
    } else {
      return(
        <Login onLogin={this.onLogin.bind(this)}/>
      )
    }
  }
  onLogin() {
    this.setState({
      isLoggedIn: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('thriftyNinja', () => thriftyNinja);
