import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Form from './Form';

const TestForm = () => {
  return (
    <View style={styles.container}>
      <Form
        data={{
          beneficiary: '',
          amount: '',
          date: '',
          category: '',
          comments: '',
        }}
      />
    </View>
  );
};

export default TestForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
