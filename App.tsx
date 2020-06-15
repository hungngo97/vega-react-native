import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Vega } from './components/Vega';

export default function App() {
  return (
    <View style={styles.container}>
      <Vega/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
