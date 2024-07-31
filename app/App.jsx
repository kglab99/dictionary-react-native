import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import styles from './styles'; 

const fetchFonts = () => {
  return Font.loadAsync({
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
    'Lora-Bold': require('../assets/fonts/Lora-Bold.ttf'),
  });
};

const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <Text style={styles.bulletPoint}>•</Text>
    <View style={styles.listItemContent}>{children}</View>
  </View>
);

const Divider = () => <View style={styles.divider} />;

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [word, setWord] = useState('programming');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
    fetchDefinition(word);
  }, []);

  const fetchDefinition = async (searchWord) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      const data = response.data[0];
      setDefinition(data);
      const initialPartOfSpeech = data.meanings[0]?.partOfSpeech || '';
      setSelectedPartOfSpeech(initialPartOfSpeech);
    } catch (err) {
      setError('Word not found');
      setDefinition(null);
      setWord('');
    } finally {
      setLoading(false);
    }
  };
  

  const handlePartOfSpeechChange = (partOfSpeech) => {
    setSelectedPartOfSpeech(partOfSpeech);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={word}
        onChangeText={setWord}
        onSubmitEditing={() => fetchDefinition(word)}
      />
      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.word}>{error}</Text>}
      {definition && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.word}>{definition.word}</Text>
          {definition.phonetic && <Text style={styles.phonetic}>{definition.phonetic}</Text>}
          
          {definition.meanings.length > 0 && (
            <View>
              <View style={styles.partOfSpeechContainer}>
                {definition.meanings.map((meaning, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.partOfSpeechButton,
                      selectedPartOfSpeech === meaning.partOfSpeech && styles.selectedPartOfSpeechButton
                    ]}
                    onPress={() => handlePartOfSpeechChange(meaning.partOfSpeech)}
                  >
                    <Text style={[
                      styles.partOfSpeechText,
                      selectedPartOfSpeech === meaning.partOfSpeech && styles.selectedPartOfSpeechText
                    ]}>
                      {meaning.partOfSpeech}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {definition.meanings
                .filter(meaning => meaning.partOfSpeech === selectedPartOfSpeech)
                .map((meaning, index) => (
                  <View key={index}>
                    {meaning.definitions.map((def, i) => (
                      <View key={i}>
                        <ListItem>
                          <Text style={styles.definition}>{def.definition}</Text>
                          {def.example && (
                            <Text style={styles.example}>Example: {def.example}</Text>
                          )}
                        </ListItem>
                        <Divider />
                      </View>
                    ))}
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}