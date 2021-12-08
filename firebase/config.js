import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyDPqdsbLEAWGrUcX_a63T1s49cFBvenCLs",
    authDomain: "expo-chat-28e9e.firebaseapp.com",
    databaseURL: "https://expo-chat-28e9e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expo-chat-28e9e",
    storageBucket: "expo-chat-28e9e.appspot.com",
    messagingSenderId: "462193908692",
    appId: "1:462193908692:web:91c30887d773e4c4a15441",
    measurementId: "G-XFM3Z5N32W"
}
const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()
const getData = async () => {
    let data = await db.collection("users").get();
    data.forEach((e) => {
        console.log(`${e.id}-->> ${JSON.stringify(e.data())}`)
    })
}
const pushData = async () => {
    let data = await db.collection("users/").add({
        "id": 1,
        "d": 1
    });

}
const deleteData = async () => {
    let data = await db.collection('users').get();
    data.forEach(res => {
        if (res.data().name && res.data().name == 1) {
            db.collection('users').doc(res.id
            ).delete()
        }
    })
    data.forEach(res => {
        console.log(res.data())
    }
    )
}
const updateData = async () => {
    let data = await db.collection('users').doc("K9SvGPEYqTE3zdm9iw1z").set({name:'manikandan'})
    
}

updateData()

export default db