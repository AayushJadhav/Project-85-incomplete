import * as React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Platform, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard';
import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

let posts = require("./temp_posts.json");

preventAutoHideAsync()

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontsLoaded: false
    }
  }

  loadFonts = async () => {
    await loadAsync({
      "rem": require("../assets/REM-Regular.ttf"),
    });
    this.setState({
      fontsLoaded: true
    })
  }

  componentDidMount() {
    this.loadFonts();
  }

  keyExtractor = (item, index) => {
    index.toString();
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />
  }

  render() {
    if (this.state.fontsLoaded) {
      hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={posts}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  androidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "rem"
  },
  cardContainer: {
    flex: 0.85
  }
})