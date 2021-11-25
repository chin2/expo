
// npm i @expo/vector-icons
// npm i react-native-keyboard-aware-scroll-view
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { aColor, bColor } from '../components/color';
import { FontAwesome } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';

const firebase=require('firebase')


export default function Home ({ navigation }) {
const db= firebase.initializeApp( {
  apiKey: "AIzaSyDPqdsbLEAWGrUcX_a63T1s49cFBvenCLs",
  authDomain: "expo-chat-28e9e.firebaseapp.com",
  databaseURL: "https://expo-chat-28e9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expo-chat-28e9e",
  storageBucket: "expo-chat-28e9e.appspot.com",
  messagingSenderId: "462193908692",
  appId: "1:462193908692:web:91c30887d773e4c4a15441",
  measurementId: "G-XFM3Z5N32W"
}).firestore()

console.log(db)

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: bColor }}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, backgroundColor: bColor, alignItems: 'center' }}>
                    <View style={{ fontSize: 30, fontWeight: 'bold' }}>
                        <Text style={{ color: aColor, backgroundColor: bColor, borderTopLeftRadius: 15, paddingLeft: 10, borderBottomLeftRadius: 15 }}>Dis</Text><Text style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, color: bColor, paddingRight: 10, backgroundColor: aColor }}>cord</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ paddingRight: 20 }}><TouchableOpacity><FontAwesome name="search" size={24} color="black" /> </TouchableOpacity></Text>
                        <View><AntDesign name="menufold" size={24} color="black" /> </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}


