import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {theme} from './color.js'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:30,
    //리액트 네이티브에만 있는 속성! 가로 세로로 패딩 줄 수 있음

  },
  header : {
    flexDirection : "row",
    marginTop : 100,
    justifyContent:"space-between",

  },
  btnText : {
    color : "white",
    fontSize :44,
    fontWeight : 600,
  }
});
