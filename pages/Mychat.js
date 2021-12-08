import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Image,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    ScrollView,
    FlatList,
    ContentThatGoesBelowTheFlatList,
    ContentThatGoesAboveTheFlatList,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Pressable
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../firebase/index'
import { Avatar, Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const db = firebase.database();
import { Entypo } from '@expo/vector-icons';
import { aColor,bColor } from '../components/color';


export function MyChat({ navigation, route }) {
    const emailId = "maniprepal@gmail.com"
    const [modalVisible, setModalVisible] = useState(false);
    const [chatDetail, setChatDetail] = useState([]);
    const [email, setEmail] = useState('');

    const myFunction = async () => {
        if (chatDetail == null || chatDetail.length == 0) {
            const getDetail = await db.ref('user').child(emailId.split('@')[0]).get();
            let chat = [];
            getDetail.forEach(data => {
                chat.push(data.val());
            });
            setChatDetail(chat);
            console.log(chat);
        }
    };

    useEffect(() => {
        myFunction();
    });


    async function AddUser() {
        setModalVisible(!modalVisible);
        let isEmail = -1;
        if (chatDetail != null) {
            console.log(chatDetail);
            isEmail = chatDetail.findIndex(val => val.email == email);
        }
        console.log(isEmail);
        if (isEmail != -1) {
            alert('Chat already added');
            console.log('already Email');
            return;
        }
        let newDate = Date.now();
        await db
            .ref('user')
            .child(emailId.split('@')[0])
            .push({
                name: email.split('@')[0],
                email: email,
                chatId: newDate,
            });
        await db
            .ref('user')
            .child(email.split('@')[0])
            .push({
                name: emailId.split('@')[0],
                email: emailId,
                chatId: newDate,
            });
        let tempDetail = [...chatDetail];
        tempDetail.push({
            name: email.split('@')[0],
            email: email,
            chatId: newDate,
        });
        setChatDetail(tempDetail);
    }
    async function EnterChatScreen(chatId) {
        var chatId = JSON.parse(JSON.stringify(chatId))
        // // console.log("chat id mychat page, ,", chatId["email"]);
        // await route.params.setUser('chatId', chatId["chatId"]);
        // await route.params.setUser('anotherEmail', chatId['email']);
        // await route.params.setUser('anotherName', chatId['name']);

        navigation.navigate('ChatScreen', {
            email: "maniprepal@gmail.com",
            // setUser: route.params.setUser,
            // getUser: route.params.getUser,
            chatId: chatId["chatId"],
            anotherEmail: chatId['email'],
            anotherName: chatId['name']

        });
    }
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>

                <ScrollView>
                    <View style={{ flex: 1, width: '100%' }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#ec4646', borderColor: '#ec4646', borderRadius: 20, borderWidth: 1 }}>
                                    <View style={{ padding: 5, paddingLeft: 15 }}><Icon name="user-plus" size={18} type="font-awesome" color={'white'} /></View>
                                    <View>
                                        <Text style={{ paddingRight: 15, paddingTop: 5, color: 'white', fontWeight: 'bold' }}>Add Chat</Text>
                                    </View>
                                </View>
                            </View> */}

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: aColor, fontWeight: 'bold' }}>Add new chat</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'white', marginTop: 5, color: 'black' }}>
                            <FlatList
                                style={{ flex: 1 }}
                                data={chatDetail}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => EnterChatScreen(item)}
                                        style={{
                                            width: '100%',
                                            height: 65,
                                            backgroundColor: 'white',
                                            borderBottomWidth: 0.5,
                                            borderColor: aColor,
                                            flexDirection: 'row',
                                            padding: 10,
                                            // alignItems: 'flex-end',
                                        }}>
                                        <Avatar
                                            rounded
                                            size="medium"
                                            titleStyle={{ color: 'grey', fontWeight: 'bold' }}
                                            title={item.name.substring(0, 2).toUpperCase()}
                                            containerStyle={{
                                                backgroundColor: 'white',
                                                borderColor: aColor,
                                                borderWidth: 1,
                                            }}
                                        />
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 13 }}>
                                            {item.name}
                                            {'\n'}
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '900',
                                                    margin: 2,
                                                    color: 'grey',
                                                }}>
                                                {item.email}
                                            </Text>
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={ContentThatGoesAboveTheFlatList}
                                ListFooterComponent={ContentThatGoesBelowTheFlatList}
                            />
                        </View>

                        {/* </ScrollView> */}
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', width: 'auto', justifyContent: 'space-between' }}>
                                    <View style={{ marginTop: 5, marginLeft: 25 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>To Start Chat </Text>
                                    </View>
                                    <View style={{ marginTop: 15, marginRight: 10 }}>
                                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                            <Entypo name="circle-with-cross" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>

                                    <TextInput
                                        style={{ borderColor: "grey", borderRadius: 20, padding: 10, borderWidth: 2, marginTop: 50, marginBottom: 30, width: "70%" }}
                                        placeholder="enter email"
                                        onChangeText={setEmail}
                                    />

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => AddUser()}>
                                        <Text style={styles.textStyle}>Add user</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>


            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    }, modalView: {
        margin: 20,
        backgroundColor: "white",
        width: 300,
        borderRadius: 10,
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginBottom: 30

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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

