
// npm i @expo/vector-icons
// npm i react-native-keyboard-aware-scroll-view
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// import { aColor, bColor } from '../components/color';
export default function Login({ navigation }) {
    const aColor='white'
    const bColor='blue'
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")

    async function loginValidate() {

        if (Email != "" && Password != "" && Email == Password) {
            // alert(Email, Password)
            navigation.navigate("Home")
        }
        else {
            setError("")
            setError("User Name And Password Should not be Empty !!")
        }
    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: bColor }}>
            {/* <Fragment> */}
            <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 40 }}><Text style={{ color: aColor, backgroundColor: bColor, borderTopLeftRadius: 15, paddingLeft: 10, borderBottomLeftRadius: 15 }}>Dis</Text><Text style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, color: bColor, paddingRight: 10, backgroundColor: aColor }}>cord</Text></Text>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 100 }}>
                    <Text style={styles.createHelp}>Log in! </Text>
                </View>
                {/* <Image style={{height:300,width:200}} source={require('../assets/images/login.png')} /> */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.searchSection}>
                        <MaterialIcons style={styles.searchIcon} name="email" size={24} color="black" />
                        <TextInput style={styles.input} label="Email" placeholder="Enter the email" onChangeText={(e) => { setEmail(e); setError("") }} />
                    </View>
                    <View style={styles.searchSection}>
                        <FontAwesome5 style={styles.searchIcon} name="key" size={24} color="black" />
                        <TextInput style={styles.input} label="Password" placeholder="Enter the Password" secureTextEntry={true} onChangeText={(e) => { setPassword(e); setError("") }} />
                    </View>
                    {Error == "" ? <Text></Text> : <Text style={{ color: 'red', alignContent: 'center', justifyContent: 'center' }}>User Name And Password Doesn't Match !!</Text>}
                </View>
                <View style={styles.loginButtonView}>
                    <TouchableOpacity onPress={loginValidate}>
                        <View style={styles.loginButton} >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.signinView}>
                    <Text style={styles.siginAlready}>
                        I'm a new member! <Text style={styles.signinLink}
                            onPress={() => { navigation.push("Signup") }}
                        >
                            Sign Up</Text>
                    </Text>
                </View>
            </SafeAreaView>
            {/* </Fragment> */}
        </KeyboardAwareScrollView>
    )
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
        fontWeight: 'bold',
        fontSize: 21,
        color: 'black',
        alignItems: 'center',
        marginTop: -(1 * windowHeight) / 100
    },


    loginButtonView: {
        marginTop: (6 * windowHeight) / 100,
    },
    loginButton: {
        backgroundColor: aColor,
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
        color: aColor
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
        borderColor: '#C0C0C0',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
})
