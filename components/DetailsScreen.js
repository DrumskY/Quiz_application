import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';




function DetailsScreen({ route, navigation }) {
    const {id} = route.params;
    console.log(id)
    const [postId, setPostId] = React.useState([]);
    const [test, setTest] = React.useState([])
    const [questionNumber, setQuestionNumber] = React.useState(0)
    //const [points, setPoints] = React.useState(0)
    let points = React.useRef(0)
    const [isAppOffline, setIsAppOffline] = React.useState(false);


    
 



    useEffect(() => {
        if(isAppOffline){
            getData()
        }
        else{
        // GET request using fetch inside useEffect React hook
        fetch('https://tgryl.pl/quiz/test/'+id)
            .then(response => response.json())
            .then(data => {
                setTest(data)
                AsyncStorage.setItem('@quizData', JSON.stringify(data));
            });
        }

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [id,isAppOffline]);


    const getData = async () => {
        try {
            AsyncStorage.getItem('@quizData')
          .then((value) => JSON.parse(value))
          .then((value) => {
              setTest(value)
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


    function handleOnPress(answerNumber) {
        
        if (test.tasks[questionNumber].answers[answerNumber].isCorrect === true) {
            points.current++
        }
        if (questionNumber+1 >= test.tasks.length) {
            console.log('gudaz')
            setQuestionNumber(0)
            navigation.navigate('Score', { points: points.current })
            points.current = 0
            return
        }
        setQuestionNumber(questionNumber + 1);
        
    }

    return (
        test.length != 0 ? (
            <View style={{ flex: 1 }}>
                <View style={styles.quest}>
                    <Text style={styles.text}>{test.tasks[questionNumber].question}</Text>
                </View>

                <TouchableHighlight style={styles.button} onPress={() => handleOnPress(0)}>
                    <Text style={styles.text_answer}>{test.tasks[questionNumber].answers[0].content}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => handleOnPress(1)}>
                    <Text style={styles.text_answer}>{test.tasks[questionNumber].answers[1].content}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => handleOnPress(2)}>
                    <Text style={styles.text_answer}>{test.tasks[questionNumber].answers[2].content}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => handleOnPress(3)}>
                    <Text style={styles.text_answer}>{test.tasks[questionNumber].answers[3].content}</Text>
                </TouchableHighlight>


                <View><Text style={styles.text}>Points:{points.current}</Text></View>
            </View>
        ) : <Text>Loading...</Text>

    );




}

const styles = StyleSheet.create({
    quest: {
        height: 200,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    text_answer: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        //width: '98%',
        margin: 5,
        borderRadius: 4,
        backgroundColor: 'grey',

    },
});
export default DetailsScreen;