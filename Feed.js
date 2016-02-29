'use strict';

import React, {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

import Moment from 'moment';

import authService from './AuthService';

class Feed extends Component {
  constructor(props) {
    super(props)

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(['A', 'B', 'C']),
      showProgess: true
    };
  }
  componentDidMount() {
    this.fetchFeed();
  }
  fetchFeed() {
    authService.getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/' +
                authInfo.user.login +
                '/received_events';
      fetch(url, {
        headers: authInfo.header
      }).
      then((response) => response.json()).
      then((responseData) => {
        var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgess: false
        })
      })
    })
  }
  renderRow(rowData) {
    return(
      <View
        style={styles.row}>
        <Image
          source={{uri: rowData.actor.avatar_url}}
          style={styles.rowImage} />
        <View style={styles.rowRight}>
          <Text style={{backgroundColor: '#fff'}}>
            {moment(rowData.created_at).fromNow()}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            {rowData.actor.login}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            {rowData.payload.ref.replace('refs/heads/', '')}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    if(this.state.showProgess == true) {
      return(
        <View style={styles.showProgess}>
          <ActivityIndicatorIOS
            size='large'
            aniimating={true} />
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  listText: {
    color: '#333'
  },
  showProgess: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  rowImage: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  rowRight: {
    paddingLeft: 20,
  }
})

export default Feed;
