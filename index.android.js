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
} = React;

var RnBootstrap = React.createClass({
  render: function() {
    if (!this.state.repositories){
      return this.renderLoadingView();
    }
    var repo = this.state.repositories[0]
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
      repositories: null,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() { 
     fetch(REQUEST_URL) 
       .then((response) => response.json()) 
       .then((responseData) => { 
         this.setState({ repositories: responseData.items, }); 
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
});

AppRegistry.registerComponent('RnBootstrap', () => RnBootstrap);
