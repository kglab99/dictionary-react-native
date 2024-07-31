import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fbfcfe',
    },
    input: {
      height: 40,
      borderColor: '#e2e8f0',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20,
      paddingHorizontal: 8,
      backgroundColor: '#ffffff',
      fontFamily: 'Lora-Regular',
    },
    word: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
      color: '#0f172a',
      fontFamily: 'Lora-Bold',
    },
    phonetic: {
      fontSize: 18,
      color: '#475569',
      textAlign: 'center',
      marginBottom: 30,
      fontFamily: 'Lora-Regular',
    },
    partOfSpeechContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    partOfSpeechButton: {
      marginRight: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    selectedPartOfSpeechButton: {
      borderBottomWidth: 2,
      borderBottomColor: '#007bff',
    },
    partOfSpeechText: {
      color: '#334155',
      fontFamily: 'Lora-Regular',
    },
    selectedPartOfSpeechText: {
      textDecorationLine: 'underline',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 4,
    },
    bulletPoint: {
      fontSize: 18,
      color: '#1e293b',
      marginRight: 8,
    },
    listItemContent: {
      flex: 1,
    },
    divider: {
      height: 1,
      backgroundColor: '#e2e8f0',
      marginVertical: 8,
    },
    definition: {
      fontSize: 16,
      color: '#1e293b',
      fontFamily: 'Lora-Regular',
    },
    example: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#64748b',
      fontFamily: 'Lora-Regular',
    },
    scrollView: {
      paddingBottom: 20,
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;
