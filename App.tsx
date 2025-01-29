import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import axios from 'axios'

export default function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    
    const sendMessage = async () => {
        try {
            const res = await axios.post("http://10.0.0.233:5000/chat", { message });
            setResponse(res.data.response);
        } catch (e) {
            console.error("ERROR: An error occured while sending message: ", e);
        }
    }
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Type a message..."
                value={message}
                onChangeText={setMessage}
                style={styles.inputBox}
            />
            <Button title="Send" onPress={sendMessage} />
            <Text style={styles.responseText}>{response}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    inputBox: {
        borderBottomWidth: 1,
        marginBottom: 10
    },
    responseText: {
        marginTop: 20
    }
});
