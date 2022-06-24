import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { balance} from './Home';
import { realm, RegisterType } from '../Schemas/Schemas';

const json = require('../data.json');
const user = json[0];

const transactions = () =>
  realm
    .then(realm => {
      const allExpenses = realm.objects<RegisterType>('Expense');
      const allIncomes = realm.objects<RegisterType>('Income');
      return user.incomes
        .concat(...user.expenses, ...allExpenses, ...allIncomes)
        .sort(
          (
            a: {date: string | number | Date},
            b: {date: string | number | Date},
          ) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    })
    .catch(error => {
      console.log(`This is the catch :${error}`);
    });

const renderList = ({item}: any) => {
  const operator = item.hasOwnProperty('_id_income') ? '' : '-';
  return (
    <View style={styles.flatlist}>
      <View style={styles.transaction}>
        <View style={styles.transactionHeader}>
          <Text style={{fontSize: 20}}>{new Date(item.date).toLocaleDateString()}</Text>
          <Text
            style={[
              item.hasOwnProperty('_id_income')
                ? styles.income
                : styles.expense,
            ]}>
            {operator + item.amount}
          </Text>
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
  const [filter, setFilter] = useState('All');
  const [allTransactions, setAllTransactions] = useState(undefined);
  useEffect(() => {
    transactions().then(allT => {
      setAllTransactions(allT);
    });
  }, []);

  let filteredTransactions  
  if(filter === "All") {
    filteredTransactions = allTransactions
  } else if (filter === "Incomes") {
    filteredTransactions = user.incomes
  } else {
    filteredTransactions = user.expenses
  }

  return (
    <View style={styles.container}>
      <Text style={styles.user}>{user.user}'s account</Text>
      <Text style={styles.balance}>Balance {balance.toFixed(2)}€</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <TouchableOpacity
          style={styles.filters}
          onPress={() => setFilter('All')}>
          <Text style={{textAlign: 'center'}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filters}
          onPress={() => setFilter('Incomes')}>
          <Text style={{textAlign: 'center'}}>Incomes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filters}
          onPress={() => setFilter('Expenses')}>
          <Text style={{textAlign: 'center'}}>Expenses</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={filteredTransactions} renderItem={renderList} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  flatlist: {
    flex: 1,
  },
  user: {
    fontSize: 30,
    marginBottom: 10,
    color: '#2dadfc',
  },
  filters: {
    width: '25%',
    height: 35,
    margin: 5,
    backgroundColor: '#acdcf9',
    borderRadius: 5,
    justifyContent: 'center',
  },
  balance: {
    fontSize: 30,
    color: 'green',
    backgroundColor: '#acdcf9',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    marginBottom: 10,
  },
  transaction: {
    backgroundColor: '#acdcf9',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 150,
    elevation: 5,
  },
  comments: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expense: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
