import {useEffect, useState} from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const NoteList = () => {
  const [Notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const db = useSQLiteContext();

  const loadNotes = async () => {
    try{
      setIsLoading(true);
      const results = await db.getAllAsync(`SELECT * FROM notes
        ORDER BY id DESC`);
      setNotes(results);
    } catch (error) {
      console.error("Database Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadNotes();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#fff"/>
  }

  const handleDelete = async (id: number) => {
      try{
        await db.runAsync(
          `DELETE FROM notes WHERE id = ?`,
          [id]
        );
        Alert.alert('Success', 'Note tossed successfully!');
        await loadNotes();
      } catch (error) {
        console.error(error);
        Alert.alert('Error an error occured while deleting the note');
      }
    };
  

  return (
    <FlatList
      data={Notes}
      refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={loadNotes} tintColor="#007AFF"/>
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem = {({ item }) => (
        <View style={{ padding:10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text>{`${item.title}`}</Text>
          <Text>{`${item.note}`}</Text>
          <TouchableOpacity
          style={{
            // backgroundColor:'red',
            alignItems: 'flex-end', 
          }} 
          onPress={() => handleDelete(item.id)}>
            <Text
            style={{
              color: 'red',
            }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text>"No Notes Found"</Text>}
      />
  )


}

export default NoteList;