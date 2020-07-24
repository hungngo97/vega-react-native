import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Vega } from './components/Vega';
import { VegaRenderTest } from './VegaRenderTest';


export default function App() {
  return (
    <View style={styles.container}>
      <VegaRenderTest/>
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
