import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {renderItem, transactions} from './Home';

const data = require('../data.json');
const user = data[0];

const Account = () => {
  return (
    <View>
      <FlatList data={transactions} renderItem={renderItem} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
