import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavProps} from '../Components/Navigator';

const Home: React.FC<NavProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text
        style={{color: 'blue', borderBottomWidth: 1, borderBottomColor: 'blue'}}
        onPress={() => navigation.navigate('GrossRegister')}>
        To GrossRegister
      </Text>
      <Text
        style={{color: 'blue', borderBottomWidth: 1, borderBottomColor: 'blue'}}
        onPress={() => navigation.navigate('SpendingRegister')}>
        To SpendingRegister
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
  },
});
