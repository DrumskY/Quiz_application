import React from 'react';
import { RefreshControl, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const Item = ({ data: { nick, score, total, type, createdOn } }) => (
    <View style={styles.ResoultRow}>
        <View style={styles.Resoult}><Text style={styles.tekst}> {nick} </Text></View>
        <View style={styles.Resoult}><Text style={styles.tekst}>{score}</Text></View>
        <View style={styles.Resoult}><Text style={styles.tekst}>{total}</Text></View>
        <View style={styles.Resoult}><Text style={styles.tekst}>{type}</Text></View>
        <View style={styles.Resoult}><Text style={styles.tekst}>{createdOn}</Text></View>
    </View>
);



function ResultScreen({ navigation }) {


    const renderItem = ({ item }) => (
        <Item data={item} />
    );

    const [refreshing, setRefreshing] = React.useState(false);
    const [isAppOffline, setIsAppOffline] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [totalReactPackages, setTotalReactPackages] = React.useState([]);
    React.useEffect(() => {
        if (isAppOffline) {
            getData()
        }
        else {
            // GET request using fetch inside useEffect React hook
            fetch('https://tgryl.pl/quiz/results')
                .then(response => response.json())
                .then(data => {
                    setTotalReactPackages(data)
                    AsyncStorage.setItem('@quizData', JSON.stringify(data))
                });
        }
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [isAppOffline]);


    const getData = async () => {
        try {
            AsyncStorage.getItem('@quizData')
                .then((value) => JSON.parse(value))
                .then((value) => {
                    setTotalReactPackages(value)
                    console.log("nazwa 1", value)
                })

        } catch (e) {
            console.log('error')
        }
    }

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                setIsAppOffline(false);
                console.log("Internet connection back");
            } else {
                setIsAppOffline(true);
                console.log("Internet connection lost");
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={totalReactPackages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatbox: {
        padding: 10,
        textAlign: 'center',

    },
    scrollView: {
        justifyContent: 'center',
    },
    ResoultRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        height: 50,

    },
    Resoult: {
        height: 50,
        width: '20%',

        backgroundColor: '#C6C6C6',
        justifyContent: 'center',
        textAlign: 'center',
    },
    tekst: {
        fontSize: 10,

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});


export default ResultScreen;