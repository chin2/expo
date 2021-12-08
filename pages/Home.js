
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
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { MyChat } from './Mychat';
import { ChatScreen } from './ChatScreen';
import CreateSpace from './CreateSpace';
import JoinSpace from './JoinSpace';
const Drawer = createDrawerNavigator();

export default function Home({ navigation }) {
    
    

    return (
     
                <Drawer.Navigator>
                    <Drawer.Screen name="MyChat" component={MyChat} />
                    <Drawer.Screen name="ChatScreen" component={ChatScreen} />
                    <Drawer.Screen name="CreateSpace" component={CreateSpace} />
                    <Drawer.Screen name="JoinSpace" component={JoinSpace} />

                </Drawer.Navigator>
    )
}


