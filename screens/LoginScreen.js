import * as React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';

import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

preventAutoHideAsync();

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
            email: "",
            password: "",
            userSignedIn: false,
        }
    }

    async loadFonts() {
        await loadAsync({
            "rem": require("../assets/REM-Regular.ttf"),
        });
        this.setState({
            fontsLoaded: true
        })
    }

    componentDidMount() {
        this.loadFonts()
    }

    signIn = async (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.replace("Dashboard"))
            .catch((err) => Alert.alert(err.message))
    }

    render() {
        if (this.state.fontsLoaded) {
            hideAsync();
            const { email, password } = this.state;

            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />

                    <Text style={styles.appTitleText}>Story Telling</Text>
                    <Image source={appIcon} style={styles.appIcon} />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={text => this.setState({ email: text })}
                        placeholder={"Enter Email"}
                        placeholderTextColor={"#FFFFFF"}
                        autoFocus
                    />
                    <TextInput
                        style={[styles.textinput, { marginTop: 20 }]}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder={"Enter Password"}
                        placeholderTextColor={"#FFFFFF"}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={[styles.button, { marginTop: 20 }]}
                        onPress={() => this.signIn(email, password)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Register Screen");
                        }}
                    >
                        <Text
                            style={styles.buttonTextNewUser}
                        >Register</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        fontFamily: "rem",
        marginBottom: RFValue(20)
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        borderColor: "#FFFFFF",
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: "#FFFFFF",
        backgroundColor: "#15193c",
        fontFamily: "rem"
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#15193c",
        fontFamily: "rem"
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#FFFFFF",
        fontFamily: "rem",
        textDecorationLine: 'underline'
    }
});