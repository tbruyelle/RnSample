/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var REQUEST_URL = 'https://api.github.com/search/repositories?q=hots'

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} = React;

var RnBootstrap = React.createClass({
  render: function() {
    if (!this.state.loaded){
      return this.renderLoadingView();
    }
    return (
        <ListView
         dataSource={this.state.dataSource} 
         renderRow={this.renderRepo} 
         style={styles.listView}
        />
        );
  },
  renderRepo: function(repo){
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: repo.owner.avatar_url}}/>
        <View styles={styles.rightContainter}>
        <Text style={styles.title}>{repo.name}/{repo.owner.login}</Text>
        <Text style={styles.description}>{repo.description}</Text>
        </View>
      </View>
    );
  },
  renderLoadingView: function() {
    return (
        <View style={styles.container}>
          <Text>Loading repositories...</Text>
          </View>
        );
  },
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }), 
      loaded: false, 
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() { 
     fetch(REQUEST_URL) 
       .then((response) => response.json()) 
       .then((responseData) => { 
         this.setState({ 
           dataSource: this.state.dataSource.cloneWithRows(responseData.items),
           loaded: true,
         }); 
       }) 
       .done(); 
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize:20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 96,
    height: 96,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('RnBootstrap', () => RnBootstrap);
