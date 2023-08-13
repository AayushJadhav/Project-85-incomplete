import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

preventAutoHideAsync();

export default class PostCard extends React.Component {
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

  render() {
    if (this.state.fontsLoaded) {
      hideAsync()

      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.navigation.navigate("PostScreen", {
            post: this.props.post
          })}
        >
          <View style={styles.cardContainer}>
            <View style={styles.authorContainer}>
              <View>
                <Image
                  source={require("../assets/profile.png")}
                /** style={styles.profileImage} */
                ></Image>
              </View>
              <View style={styles.authorNameContainer}>
                <Text style={styles.authorNameText}>{this.props.post.author}</Text>
              </View>
            </View>
            <Image
              source={require("../assets/post-1.jpeg")}
              style={styles.postImage}
            ></Image>
            <View /* style={styles.captionContainer} **/>
              <Text style={styles.captionText}>{this.props.post.caption}</Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    color: "white",
    fontFamily: "rem",
  },
  authorNameContainer: {
    flexDirection: 'row',
  },
  authorNameText: {
    fontSize: RFValue(18),
    color: "white",
    paddingTop: RFValue(20),
    paddingLeft: RFValue(5),
    fontFamily: "rem",
  },
  captionContainer: {
    height: 10
  },
  captionText: {
    fontSize: RFValue(15),
    color: "white",
    paddingTop: RFValue(10),
    fontFamily: "rem",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
    fontFamily: "rem",
  }
})