import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

preventAutoHideAsync()

export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false
        }
    }

    loadFonts = async () => {
        await loadAsync({
            "rem": require("../assets/REM-Regular.ttf")
        });
        this.setState({
            fontsLoaded: true
        });
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        if (!this.props.route.params) {
            this.props.navigation.navigate("Home");
        } else if (this.state.fontsLoaded) {
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
                    <View style={styles.postContainer}>
                        <ScrollView style={styles.postCard}>
                            <View style={styles.dataContainer}>
                                <View style={styles.postAuthorContainer}>
                                    <Image source={require("../assets/profile.png")}></Image>
                                    <Text style={styles.postTitleText}>{this.props.route.params.post.author}</Text>
                                </View>
                                <Image
                                    // source={require(`../assets/${this.props.route.params.post.image}`)}
                                    source={require("../assets/post-1.jpeg")}
                                    style={styles.image}
                                ></Image>
                                <View style={styles.captionTextContainer}>
                                    <Text style={styles.captionText}>
                                        {this.props.route.params.post.caption}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </ScrollView>
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
    postContainer: {
        flex: 1
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    image: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
    },
    dataContainer: {
        flexDirection: "column",
        padding: RFValue(20)
    },
    postAuthorContainer: {
        flex: 0.8
    },
    postTitleText: {
        fontFamily: "rem",
        fontSize: RFValue(25),
        color: "white"
    },
    postAuthorText: {
        fontFamily: "rem",
        fontSize: RFValue(18),
        color: "white"
    },
    iconContainer: {
        flex: 0.2
    },
    captionTextContainer: {
        padding: RFValue(20)
    },
    captionText: {
        fontFamily: "rem",
        fontSize: RFValue(15),
        color: "white"
    },

    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "rem",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
})