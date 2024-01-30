import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import {Fontisto} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


/* 
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("pressed")} activeOpacity={0}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity> 
        <TouchableHighlight onPress={() => console.log("pressed")} activeOpacity={0.5} underlayColor="tomato">
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
} 
*/



////////////////////////////////////////////////////




STORAGE_KEY = "@toDo";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);


  ///////////////////


  const saveToDos = async(toSave) => { 
	await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave)) 
  }

  const loadToDos = async() => {
	const s = await AsyncStorage.getItem(STORAGE_KEY)
	if (s) {
		setToDos(JSON.parse(s))
	}
  }

  useEffect(() => {
	loadToDos();
  }, []);


  ///////////////////


  const addToDo = async() => { 
    if(text === "") {
      return
    }
    // toDos[[Date.now()]] = {text, work: working}
	// state를 변형시킴. -> 잘못된 코드

    // const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, work:working}})
    // setToDos(newToDos) // state를 변형시키지 않음. -> 올바른 코드

	const newToDos = {...toDos, [Date.now()]: {text, working}}
	setToDos(newToDos) // state를 변형시키지 않음. -> 올바른 코드

	await saveToDos(newToDos)
    setText("")
  } 
  console.log(toDos);


///////////////////
  

const deleteToDo = (key) => {
	if(Platform.OS === "web") {
		const yes = confirm("Do you wanna delete this To-Do?");
		if(yes) {
			const newToDos = {...toDos} 
			delete newToDos[key]
			setToDos(newToDos)
			saveToDos(newToDos)
		}
	} else {
	Alert.alert("Delete To Do", "Are you sure?", [
		{ text: "No" },
		{ text: "Yes", 
		  style: "destructive",
		  onPress: () => {
				const newToDos = {...toDos} 
				delete newToDos[key]
				setToDos(newToDos)
				saveToDos(newToDos)
			}}
		])
	}
};

/////////////////

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey  }}>Work</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={travel}> 
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? "Add To Do" : "Where Wanna Go"} 
          style={styles.input}
        />
		<ScrollView>
			{Object.keys(toDos).map((key) => (
				toDos[key].working === working ? (
					<View key={key} style={styles.toDo} >
						<Text style={styles.toDoText}>{toDos[key].text}</Text>
						<TouchableOpacity onPress={() => deleteToDo(key)}>
							<Fontisto name="trash" size={18} color={theme.gray} />
						</TouchableOpacity>
					</View>) : (
						null
					)
				))
			}
		</ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 40,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
	backgroundColor: theme.grey,
	marginBottom: 10,
	paddingVertical: 20,
	paddingHorizontal: 20,
	borderRadius: 15,
	flexDirection: "row",
	allignItems: "center",
	justifyContent:"space-between",
  },
  toDoText: {
	color: "white",
	fontSize: 16,
	fontWeight: "500"
  }
});
