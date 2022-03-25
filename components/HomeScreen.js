import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Alert, FlatList, SafeAreaView, } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";



function HomeScreen({ navigation }) {

    

    const Item = ({ data: { id, name, description } }) => (
        <View style={styles.ResoultRow}>
            <View style={styles.Resoult}><Text style={styles.txt} >{name}</Text></View>
            <View style={styles.Resoult2}><Text style={styles.text}>{description}</Text></View>
            <TouchableHighlight
                onPress={() => navigation.navigate('Details', { id })}
                style={styles.button}>
                <Text style={{ color: 'white', fontWeight: 'bold', }}>Quiz!</Text>
            </TouchableHighlight>


        </View>);

    const renderItem = ({ item }) => (
        <Item data={item} />
    );

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
  
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
  
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
  
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
  
        return array;
    }

    const [totalQuizPackages, setTotalQuizPackages] = React.useState([]);
    const [isAppOffline, setIsAppOffline] = React.useState(false);

    React.useEffect(() => {
        console.log({isAppOffline})
        if(isAppOffline){
            getData()
        }
        else{
            fetch('https://tgryl.pl/quiz/tests')
            .then(response => response.json())
            .then(data => { 
                setTotalQuizPackages(shuffle(data))
                AsyncStorage.setItem('@quizData', JSON.stringify(data));
             });
        }
       
    }, [isAppOffline]);

    const getData = async () => {
        try {
            AsyncStorage.getItem('@quizData')
          .then((value) => JSON.parse(value))
          .then((value) => {
              setTotalQuizPackages(value)
              console.log("nazwa 1",value)
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



    //console.log(totalQuizPackages.map(quiz=>quiz.id))
    function getRandomTestId() {
        console.log('qwerty',totalQuizPackages)
        const ArrayId = totalQuizPackages.map(quiz => quiz.id);
        console.log(ArrayId)
        return ArrayId[Math.floor(Math.random() * ArrayId.length)];
        
    }


    console.log(getRandomTestId())

    return (

        <SafeAreaView style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Details', { id: getRandomTestId() })}
                style={styles.button2}>
                <Text style={{ color: 'white', fontWeight: 'bold', }}>Losowy Quiz!</Text>
            </TouchableHighlight>
            <FlatList
                data={totalQuizPackages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>




        

    );
}

const styles = StyleSheet.create({
    ResoultRow: {
        justifyContent: 'center',
        height: 400,
        
        backgroundColor: '#C6C6C6',
        margin: 5,
        //position: 'relative', left: '30%',
    },
    Resoult: {
        height: 100,

    },
    Resoult2: {
        height: 100,
        padding: 10,

    },
    container: {
        flex: 1,
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
        position: 'relative', left: '20%'
    },
    button2: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
        width: 250,
        position: 'relative', left: '18%'
    },
    text: {
        fontSize: 20,
        letterSpacing: 0.25,
        textAlign: 'center',
    },
    txt: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'center',
    },

});
export default HomeScreen;