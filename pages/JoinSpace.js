import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { aColor, bColor } from '../components/color';

export default function JoinSpace({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Join a space</Text>
            <View style={styles.searchSection}>
                {/* <MaterialIcons style={styles.searchIcon} name="email" size={24} color="black" /> */}
                <TextInput style={styles.input} label="Email" placeholder="Enter the email" />
            </View>
            <TouchableOpacity>
                <View style={{ marginTop: 20, backgroundColor: aColor, color: 'white', padding: 10, borderRadius: 20 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Join</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login2")} ><Text>Dashboard1</Text></TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // marginTop: StatusBar.currentHeight,
        // marginHorizontal: (10 * windowWidth) / 100
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        height:10,
        borderColor: '#C0C0C0',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    searchSection: {
        flex: 1,
        height:10,
        width:200,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 8,

    },
})