import * as React from "react";
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, ScrollView, Image, TextInput } from 'react-native';
import { loadAsync } from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

preventAutoHideAsync();

export default class CreatePostScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            previewImage: "image_1",
            dropdownHeight: 40
        }
    }

    loadfonts = async () => {
        await loadAsync({
            "rem": require("../assets/REM-Regular.ttf"),
        });
        this.setState({
            fontsLoaded: true
        })
    }

    componentDidMount() {
        this.loadfonts()
    }

    render() {
        if (this.state.fontsLoaded) {
            hideAsync();
            let preview_images = {
                image_1: require("../assets/post-1.jpeg"),
                image_2: require("../assets/post-2.jpeg"),
                image_3: require("../assets/post-3.jpeg"),
                image_4: require("../assets/post-4.jpeg"),
                image_5: require("../assets/post-5.jpeg"),
            };
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
                            <Text style={styles.appTitleText}>New post</Text>
                        </View>
                    </View>
                    <View style={styles.fieldsContainer}>

                        <Image
                            source={preview_images[this.state.previewImage]}
                            style={styles.previewImage}
                        ></Image>
                        <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                            <DropDownPicker
                                items={[
                                    { label: "Image 1", value: "image_1" },
                                    { label: "Image 2", value: "image_2" },
                                    { label: "Image 3", value: "image_3" },
                                    { label: "Image 4", value: "image_4" },
                                    { label: "Image 5", value: "image_5" },
                                ]}
                                defaultValue={this.state.previewImage}
                                open={this.state.dropdownHeight == 170 ? true : false}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{
                                    backgroundColor: "transparent",
                                    borderWidth: 1,
                                    borderColor: "white",
                                }}
                                textStyle={{
                                    color: this.state.dropdownHeight == 170 ? "black" : "white",
                                    fontFamily: "rem",
                                }}
                                onSelectItem={(item) =>
                                    this.setState({
                                        previewImage: item.value,
                                    })
                                }
                            />
                        </View>
                        <ScrollView>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={(title) => this.setState({ title })}
                                placeholder={"Title"}
                                placeholderTextColor="white"
                            />

                            <TextInput
                                style={[
                                    styles.inputFont,
                                    styles.inputFontExtra,
                                    styles.inputTextBig,
                                ]}
                                onChangeText={(caption) => this.setState({ caption: caption })}
                                placeholder={"caption"}
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="white"
                            />
                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c",
    },
    androidSafeArea: {
        marginTop:
            Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row",
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center",
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "rem",
    },
    fieldsContainer: {
        flex: 0.85,
    },
    previewImage: {
        width: "50%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain",
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "rem",
    },
    inputFontExtra: {
        marginTop: RFValue(15),
    },
    inputTextBig: {
        textAlignVertical: "top",
        padding: RFValue(5),
    },
})