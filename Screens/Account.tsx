import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {transactions} from './Home';

const data = require('../data.json');
const user = data[0];

const renderList = ({item}: any) => {
  const toto = item.hasOwnProperty('_id_income') ? '' : '-';
  return (
    <View style={styles.flatlist}>
      <View style={styles.transaction}>
        <View style={styles.transactionHeader}>
          <Text style={{fontSize: 20}}>{item.date.split('T')[0]}</Text>
          <Text style={[item.hasOwnProperty('_id_income') ? styles.income : styles.expense]}>{toto + item.amount}</Text>
        </View>
        <Text>{item.category}</Text>
        <View style={styles.comments}>
          <Text style={{fontSize: 17}}>{item.comments}</Text>
        </View>
      </View>
    </View>
  );
};

const Account = () => {
  return (
    <View style={styles.container}>
      {/* <Text>yooo</Text> */}
      <Text style={styles.user}>{user.user}'s account</Text>
      <FlatList data={transactions} renderItem={renderList} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  flatlist: {
    flex: 1,
  },
  user: {
    fontSize: 30,
    margin: 15,
    color: "#2dadfc"
  },
  transaction: {
    backgroundColor: '#acdcf9',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 150,
  },
  comments: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  expense: {
    color: "red",
    fontSize: 30
  },
  income: {
    color: "green",
    fontSize: 30
  }
});
