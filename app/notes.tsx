import NoteList from "@/NoteList";
import { SQLiteProvider } from "expo-sqlite";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native"
import { router } from "expo-router";

export default function NotePage() {
  return (
    <SQLiteProvider
    databaseName="noteDatabase.db">
      <View style={style.page}>
        <TouchableOpacity
          style={style.goBack}
          onPress={() => router.push('/')}>
            <Text style={style.goBackText}>Close Pocket</Text>
        </TouchableOpacity>
        <Text style={style.title}>*Opens Pocket*</Text>
        <NoteList />
      </View>
    </SQLiteProvider>

  );
}

const style = StyleSheet.create({
  page: {
    backgroundColor: "orange",
    flex:1,
  },
  container: {
    padding: 20,
  },
  indexer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 100
  },
  title: {
      fontSize: 40,
      color: "#fff",
      marginTop: 60,
      fontStyle: "italic",
      fontWeight: "800",
  },
  note: {
      color: '#ffffffff',
      padding: 10,
      fontSize: 18,
      flexShrink: 1,
      paddingBottom: 80
  },
  noteTitle: {
    color: '#ffffffff',
    padding: 10,
    fontSize: 28,
    marginTop: 15,
    fontWeight: 'bold',
  },
  note_view: {
    marginTop: 20,
    flexDirection: 'row',
  },
  goBack: {
    marginTop: 40,
    padding: 20,
    marginLeft: 20,
    color: 'gray',
    alignItems: 'flex-end'
  },
  goBackText: {
    fontSize: 20,
    color: 'white',
  },

})