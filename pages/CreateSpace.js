import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { aColor, bColor } from '../components/color';
import WebViewScreen from './webViewScreen';
import {Audio} from 'expo-av';

export default function CreateSpace({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:25}}>Create a space</Text>
            <TouchableOpacity onPress={()=>{
                // await Audio.requestPermissionAsyn()
                // await Audio.setAudioModeAsync({
                //     allowsRecordingIOS:true,
                //     playsInSilentModeIOS:true,
                // })
                navigation.navigate("webview", {
                    url: "https://meet.jit.si/chin2"
                })
            }}>
                <View style={{marginTop:20,backgroundColor:aColor,color:'white',padding:10,borderRadius:20}}>
                    <Text  style={{color:'white',fontWeight:'bold',fontSize:20}}>Create</Text>
                </View>
            </TouchableOpacity>
{/* 
            <Button>

            </Button> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login2")} ><Text>Dashboard1</Text></TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
        // marginTop: StatusBar.currentHeight,
        // marginHorizontal: (10 * windowWidth) / 100
    }
})