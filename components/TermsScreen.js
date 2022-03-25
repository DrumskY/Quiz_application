import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@isAccepted', value)
    } catch (e) {
        console.log('error');
    }
}

function TermsScreen({ setisTermsAccepted }) {
    return (
        <View style={{ flex: 1 }}>
            <Text>Warunki umowy</Text>
            <TouchableHighlight
                onPress={() => {
                    storeData('yes');
                    setisTermsAccepted(true);
                }}
                style={styles.button}>
                <Text style={{ color: 'white', fontWeight: 'bold', }}>Quiz!</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
        width: 250,

    },
});

export default TermsScreen;