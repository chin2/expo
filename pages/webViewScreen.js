import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
const WebViewScreen = (props) => {
    console.log("params", props.route.params.url);
    return (
        <WebView
            style={{ flex: 1 }}
            source={{ uri: props.route.params.url }}
            mediaPlaybackRequiresUserAction={true}
            allowsBackForwardNavigationGestures={true}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
        />
    );
}

export default WebViewScreen;