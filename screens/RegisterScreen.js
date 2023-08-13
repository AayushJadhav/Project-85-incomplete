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
    Text,
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

preventAutoHideAsync();

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    async loadFonts() {
        await loadAsync({
            "rem": require("../assets/REM-Regular.ttf")
        });
        this.setState({
            fontsLoaded: true
        })
    }

    registerUser = (firstName, lastName, email, password, confirmPassword) => {
        if (password === confirmPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    this.props.navigation.replace("Login");
                    firebase
                        .database()
                        .ref("/users/" + userCredential.user.uid)
                        .set({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            "current-theme": "dark"
                        })
                })
                .catch(err => Alert.alert(err.message));
        } else {
            Alert.alert("Passwords are not matching!")
        }
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        if (this.state.fontsLoaded) {
            hideAsync()
            const { email, password } = this.state;

            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />

                    <Text style={styles.appTitleText}>Register</Text>

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ firstName: text })}
                        placeholder={'Enter first name'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ lastName: text })}
                        placeholder={'Enter last name'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder={'Enter Email'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ password: text })}
                        placeholder={'Enter Password'}
                        placeholderTextColor={'#FFFFFF'}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                        placeholder={'Confirm password'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 20 }]}
                        onPress={() => {
                            let { firstName, lastName, email, password, confirmPassword } = this.state
                            this.registerUser(
                                firstName,
                                lastName,
                                email,
                                password,
                                confirmPassword
                            );
                        }}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15193c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    droidSafeArea: {
        marginTop:
            Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: 'contain',
        marginBottom: RFValue(20),
    },
    appTitleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: RFValue(40),
        fontFamily: 'rem',
        marginBottom: RFValue(20),
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(40),
        padding: RFValue(10),
        marginTop: RFValue(10),
        borderColor: '#FFFFFF',
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(15),
        color: '#FFFFFF',
        backgroundColor: '#15193c',
        fontFamily: 'rem',
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: RFValue(30),
        backgroundColor: 'white',
        marginBottom: RFValue(20),
    },
    buttonText: {
        fontSize: RFValue(24),
        color: '#15193c',
        fontFamily: 'rem',
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: '#FFFFFF',
        fontFamily: 'rem',
        textDecorationLine: 'underline',
    },
})