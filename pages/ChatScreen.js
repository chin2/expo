import React, { useEffect, useState } from 'react';
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
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    Dimensions,
    Pressable, Keyboard, Button
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, Icon } from 'react-native-elements';
import firebase from '../firebase/index'
import { MaterialIcons } from '@expo/vector-icons';
// import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

const db = firebase.database();
import { Entypo } from '@expo/vector-icons';
import { aColor,bColor } from '../components/color';


export function ChatScreen({ navigation, route }) {
    console.log(route.params)
    // // console.log("hello chat screen", JSON.parse(JSON.stringify(route.params.chatId)))
    // <Text>{ JSON.stringify(route.params.chatId)}</Text>
    // <Text>{ JSON.stringify(route.params.anotherEmail)}</Text>
    var email = route.params.email
    var chatId = route.params.chatId
    var emailId = route.params.anotherEmail
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (chatId != null) console.log(chatId);
        let length = 0;
        firebase
            .database()
            .ref('chats')
            .child(chatId)
            .on('value', snapshot => {
                length = allMessages.length;
                let messages = [];
                snapshot.forEach(value => {
                    messages.push(value.val());
                });
                // console.log(snapshot.val());
                console.log(messages.length + ' ' + length);
                if (length == 0) setAllMessages(messages);
                else setAllMessages([...allMessages, messages[messages.length - 1]]);
                console.log(allMessages)
            });
    }, []);

    async function sendMessage() {
        if (message.length != 0) {
            setRefresh(true);
            await firebase
                .database()
                .ref('chats')
                .child(chatId)
                .push({
                    sender: email.split('@')[0],
                    message: message,
                    time: Date.now(),
                });

            Keyboard.dismiss();
            setMessage('');
        }
    }

    return (
        // {/* invertStickyHeaders={true}  */}
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <View>
                <View style={{ color: 'black' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: aColor,
                        }}>
                        <Avatar
                            rounded
                            titleStyle={{ color: aColor, fontSize: 20 }}
                            title={emailId.split('@')[0].substring(0, 2).toUpperCase()}
                            containerStyle={{ backgroundColor: 'white', margin: 7 }}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'left',
                                margin: 9,
                                fontWeight: 'bold',
                            }}>
                            {emailId.split('@')[0]}
                        </Text>
                    </View>
                </View>
                {/* stickyHeaderIndices={[0]} */}
                <View style={{ height: '87%', backgroundColor: 'white', flexDirection: 'column-reverse' }}>
                    <ScrollView
                    >
                        <View style={{ flex: 1 }}>
                            {/* <FlatList
                            data={allMessages}
                            scrollToOverflowEnabled={true}
                            style={{ paddingBottom: 40, minHeight: 'auto' }}
                            // inverted={true}
                            // inverted={-1}          refreshControl={refresh}
                            // contentContainerStyle={{flexDirection: 'column-reverse'}}
                            // initialScrollIndex={allMessages.length - 1}
                            // automaticallyAdjustContentInsets={true}
                            renderItem={({ item }) => {
                                // console.log(item); */}
                            {allMessages.map(item => (
                                item && item.sender == email.split('@')[0]) ?

                                <View
                                    style={{
                                        minWidth: 'auto',
                                        maxWidth: '80%',
                                        margin: 5,
                                        marginRight: 35,
                                        padding: 6,
                                        alignSelf: 'flex-end',
                                        justifyContent: 'flex-end',
                                        backgroundColor: 'whitesmoke',
                                        color: 'black',
                                    }}>
                                    <Text style={{fontWeight:'bold',color:'black'}}>
                                        {item != null ? item.message : 'say hi to friend'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: 'blue',
                                            margin: 2,
                                            textAlign: 'right',
                                        }}>
                                        {item && new Date(item.time).toLocaleTimeString()}
                                    </Text>
                                </View>

                                :

                                <View
                                    style={{
                                        minWidth: 'auto',
                                        maxWidth: '80%',
                                        margin: 5,
                                        marginLeft: 25,
                                        padding: 6,
                                        alignSelf: 'flex-start',
                                        justifyContent: 'flex-start',
                                        backgroundColor: 'lightblue',
                                        color: 'black',
                                    }}>
                                    <Text>
                                        {item != null ? item.message : 'say hi to friend'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: 'blue',
                                            margin: 2,
                                            textAlign: 'right',
                                        }}>
                                        {item && new Date(item.time).toLocaleTimeString()}
                                    </Text>
                                </View>

                            )}
                            {/* }} */}
                            {/* /> */}
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: aColor,
                        color: 'black',
                    }}>
                    <TextInput
                        placeholder={'Type message...'}
                        value={message}
                        onChangeText={setMessage}
                        style={{

                            borderWidth: 2,
                            backgroundColor: 'white',
                            paddingHorizontal: 15,
                            height: 40,
                            margin: 5,
                            borderRadius: 10,
                            width: '90%',
                            borderColor: aColor,
                        }}></TextInput>
                    <TouchableOpacity onPress={sendMessage} style={{ flex: 1 }}>
                        <Text
                            style={{
                                backgroundColor: aColor,
                                color: 'white',
                                marginTop: 10,
                                height: 30,
                                textAlign: 'center',
                                borderRadius: 10,
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>

                            <Icon
                                // size={30}
                                name="paper-plane"
                                type="font-awesome"
                                color={'white'}
                            />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create(theme => ({
    floatingActionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'green',
        height: 200,
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 10,
    }
}));

{/* <ScrollView stickyHeaderIndices={[0]}>
              
</ScrollView> */}

// <View style={{ color: 'black' }}>
// <View
//     style={{
//         flex: 1,
//         flexDirection: 'row',
//         backgroundColor: "#ec4646",
//     }}>
//     {/* <Button title={chatId.name} color="black" /> */}
//     <Avatar
//         rounded
//         titleStyle={{ color: "#ec4646", fontSize: 20 }}
//         title={emailId.split('@')[0].substring(0, 2).toUpperCase()}
//         containerStyle={{ backgroundColor: 'white', margin: 7 }}
//     />
//     <Text
//         style={{
//             color: 'white',
//             fontSize: 20,
//             textAlign: 'left',
//             margin: 9,
//             fontWeight: 'bold',
//         }}>
//         {emailId.split('@')[0]}
//     </Text>
// </View>
// </View>
{/* <View style={{ flex: 1, backgroundColor: 'white' }}>
<FlatList
    data={allMessages}
    scrollToOverflowEnabled={true}
    style={{ paddingBottom: 40, minHeight: 'auto' }}
    // inverted={true}
    // inverted={-1}          refreshControl={refresh}
    // contentContainerStyle={{flexDirection: 'column-reverse'}}
    // initialScrollIndex={allMessages.length - 1}
    // automaticallyAdjustContentInsets={true}
    renderItem={({ item }) => {
        // console.log(item);
        if (item && item.sender == email.split('@')[0])
            return (
                <View
                    style={{
                        minWidth: 'auto',
                        maxWidth: '80%',
                        margin: 5,
                        marginRight: 35,
                        padding: 6,
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        backgroundColor: 'lightgreen',
                        color: 'black',
                    }}>
                    <Text>
                        {item != null ? item.message : 'say hi to friend'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            color: 'blue',
                            margin: 2,
                            textAlign: 'right',
                        }}>
                        {item && new Date(item.time).toLocaleTimeString()}
                    </Text>
                </View>
            );
        else
            return (
                <View
                    style={{
                        minWidth: 'auto',
                        maxWidth: '80%',
                        margin: 5,
                        marginLeft: 25,
                        padding: 6,
                        alignSelf: 'flex-start',
                        justifyContent: 'flex-start',
                        backgroundColor: 'lightblue',
                        color: 'black',
                    }}>
                    <Text>
                        {item != null ? item.message : 'say hi to friend'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            color: 'blue',
                            margin: 2,
                            textAlign: 'right',
                        }}>
                        {item && new Date(item.time).toLocaleTimeString()}
                    </Text>
                </View>
            );
    }}
/>
</View> */}
{/* <View
style={{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#ec4646",
}}>
<TextInput
    placeholder={'Type message...'}
    value={message}
    onChangeText={setMessage}
    style={{

        borderWidth: 2,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 40,
        margin: 5,
        borderRadius: 10,
        width: '90%',
        borderColor: "#ec4646",
    }}></TextInput>
<TouchableOpacity onPress={sendMessage} style={{ flex: 1 }}>
    <Text
        style={{
            backgroundColor: "#ec4646",
            color: 'white',
            marginTop: 10,

            height: 30,

            textAlign: 'center',
            borderRadius: 10,
            alignContent: 'center',
            justifyContent: 'center',
        }}>
        {' '}
        <Icon
            // size={30}
            name="paper-plane"
            type="font-awesome"
            color={'white'}
        />
    </Text>
</TouchableOpacity>
</View> */}



