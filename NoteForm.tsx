import {useState} from 'react';
import {View, Text, TextInput,ScrollView, TouchableOpacity, Button, StyleSheet, Alert, Pressable} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

const NoteForm = () => {
  const [form, setForm] = useState({
    title: '',
    note: '',
  });

  const db=useSQLiteContext();

  const handleSubmit = async () => {
    try{
      if (!form.title || !form.note){
        throw new Error('All fields are required');
      }
      await db.runAsync(
        `INSERT INTO notes(title, note) VALUES(?, ?)`,
        [form.title, form.note]
      );
      Alert.alert('Success', 'Note Pocketed Succesfully!');
      setForm({
        title: '',
        note: '',
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error an error occured while saving the note');
    }
  };

  return(
    <ScrollView style={styles.page}>
      <View style={styles.indexer}>
        
        <Text style={styles.title}>PocketNotes</Text>
        <TextInput 
          style={styles.noteTitle}
          placeholder="Title"
          placeholderTextColor={'#be793cff'}
          onChangeText={(text) => setForm({ ...form, title: text })}
          value={form.title}
        />
        <View style={styles.note_view}>
          <TextInput 
            style={styles.note}
            placeholder="Hmm so if 1 + 1 = 2..."
            placeholderTextColor={'#be793cff'}
            onChangeText={(text) => setForm({ ...form, note: text })}
            value={form.note}
            multiline={true}
          />
        </View>
        <TouchableOpacity
        style={styles.listButtonContainer}
        onPress={handleSubmit}>
          <Text style={styles.listButton} >Pocket Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.listButtonContainer} 
        onPress={() => router.push('/notes')}>
          <Text style={styles.listButton}>Note List</Text>  
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}

const styles= StyleSheet.create({
  page: {
    backgroundColor: 'orange',
  },
  indexer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 100
  },
  title: {
      fontSize: 40,
      color: "#fff",
      marginTop: 150,
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
  listButton:{
    fontSize: 20,
    color: 'white',
  },
  listButtonContainer: {
    padding:20,
  }
})

export default NoteForm;