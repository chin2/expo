import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ApiGetService, ApiPostService } from './Db/Api';

export default function SignupPage({ navigation }) {
    const [Email, setEmail] = useState("")
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Error, setError] = useState("")

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false
        }
        else {
            return true
        }
    }


    const signUpValidate = async () => {
        if (Password == "" || ConfirmPassword == "" || UserName == "" || Email == "") {
            setError("Every Field is Required")
        }
        else if (Password != ConfirmPassword) {
            setError("Password And Confirm Password Must Be Unique")
        }
        else if (!validate(Email)) {
            setError("Enter Valid Email")
        }
        else {
            data = {
                email: Email,
                name: UserName,
                password: Password
            }
            var a = await ApiPostService('user/signup/', data)
            if (a.success == false) {
                setError("Email is Alread exists.. ")
            }
            else {
                setError("SignUp success ")
                await alert("Signup Success ")
                navigation.navigate("Login")
            }
        }
    }

    return (
        <KeyboardAwareScrollView >
            <SafeAreaView style={styles.container}>
                <View
                // style={{flex:1, justifyContent: 'space-around', height: windowHeight }}
                >
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 40 }}><Text style={{ color: 'blue' }}>G</Text><Text style={{ color: 'black' }}>E</Text><Text style={{ color: 'orange' }}>B</Text><Text style={{ color: 'green' }}>O</Text><Text style={{ color: 'red' }}>T</Text></Text>

                        <Text style={styles.createHead}>
                            Create Account,
                        </Text>
                        <Text style={styles.createHelp}>Sign up to get started!</Text>
                        <View style={styles.textInputView}>
                            <View style={styles.searchSection}>
                                <MaterialIcons style={styles.searchIcon} name="email" size={20} color="black" />
                                <TextInput style={styles.input} label="Email" placeholder="Enter the email" onChangeText={(e) => { setEmail(e); setError("") }} />
                            </View>
                            <View style={styles.searchSection}>
                                <FontAwesome name="user" style={styles.searchIcon} size={20} color="black" />
                                <TextInput style={styles.input} label="Username" placeholder="Enter the User Name" onChangeText={(e) => { setUserName(e); setError("") }} />
                            </View>
                            <View style={styles.searchSection}>
                                <FontAwesome5 style={styles.searchIcon} name="key" size={20} color="black" />
                                <TextInput style={styles.input} label="Password" placeholder="Enter the Password" secureTextEntry={true} onChangeText={(e) => { setPassword(e); setError("") }} />
                            </View>
                            <View style={styles.searchSection}>
                                <FontAwesome5 style={styles.searchIcon} name="key" size={20} color="black" />
                                <TextInput style={styles.input} label="ConfirmPassword" placeholder="Enter the Confirm Password" secureTextEntry={true} onChangeText={(e) => { setConfirmPassword(e); setError("") }} />
                            </View>
                            {Error == "" ? <Text></Text> : <Text style={{ color: 'red', alignContent: 'center', justifyContent: 'center' }}>{Error}</Text>}
                        </View>
                        <View style={styles.loginButtonView}>
                            <TouchableOpacity onPress={signUpValidate}>
                                <View style={styles.loginButton}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Sign up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.signinView}>
                        <Text style={styles.siginAlready}>
                            I'm Already a member! <Text style={styles.signinLink} onPress={() => { navigation.push("Login") }} >Sign In</Text>
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginHorizontal: (10 * windowWidth) / 100
    },
    createHead: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50
    },
    createHelp: {
        fontWeight: '900',
        fontSize: 21,
        color: '#888888',
        marginTop: -(1 * windowHeight) / 100
    },
    textInputView: {
        marginTop: 10,
    },
    inputBox: {
        borderWidth: 1,
        height: (6 * windowHeight) / 100,
        borderRadius: 8,
        borderColor: '#C0C0C0',
        paddingHorizontal: 20,
        marginTop: (2 * windowHeight) / 100,
    },
    loginButtonView: {
        marginTop: (6 * windowHeight) / 100,
    },
    loginButton: {
        backgroundColor: '#ec4646',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: (6 * windowHeight) / 100
    },
    signinView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginTop: 20,
    },
    siginAlready: {
        fontWeight: 'bold'
    },
    signinLink: {
        color: 'red'
    },
    searchSection: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight / 80
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        // height:1000,
        borderColor: '#C0C0C0',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
})


// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Profile Screen </Text>
//             <Image style={styles.imageView} source={{ uri: "https://i.imgur.com/TkIrScD.png" }} />
//             <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
//                 <Text style={styles.buttonText}>Pick a photo</Text>
//             </TouchableOpacity>
//         </View>