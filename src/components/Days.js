import {StyleSheet, Text, View} from 'react-native';

const Days = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        <Text style={styles.title}>Tarih</Text> : {data.datetime}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.title}>Hissedilen</Text>: {data.feelslike}
      </Text>
    </View>
  );
};

export default Days;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 10,
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  content: {color: '#000', fontSize: 18, padding: 8},
  title: {
    fontWeight: 'bold',
  },
});
