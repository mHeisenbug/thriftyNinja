'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Feed from './Feed';

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'feed'
    }
  }
  render() {
    return(
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title='feed'
          selected={this.state.selectedTab == 'feed'}
          onPress={() => this.setState({selectedTab: 'feed'})}>
            <Feed />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='search'
          selected={this.state.selectedTab == 'search'}
          onPress={() => this.setState({selectedTab: 'search'})}>
            <Text style={styles.welcome}>Search</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

export default AppContainer;
