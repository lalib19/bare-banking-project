/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormikComponent from '../Components/FormikComponent';

const GrossRegister = () => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormikComponent page={"Gross"} />
      </View>
    </View>
  );
};

export default GrossRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    width:"100%"
  },
});
