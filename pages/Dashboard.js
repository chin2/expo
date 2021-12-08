import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Dashboard({ navigation }) {
    return (
        <View>
            <Text>Hello Dashbaord</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login2")} ><Text>Dashboard1</Text></TouchableOpacity> */}
        </View>
    )
}