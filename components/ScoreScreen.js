
import React from 'react';
import { RefreshControl, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';



function ScoreScreen({ navigation,route }) {

    React.useEffect(() => {
        // POST request using fetch inside useEffect React hook
        
        fetch('https://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: 'Drumek',
                score: '15',
                total: '20',
                type: 'historia',
            },)
        })
            .then(()=>{
                console.log('new blog added');
            });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <View>
            <Text style={styles.text}>Twój wynik wynosi:{route.params.points}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    }
});


export default ScoreScreen;