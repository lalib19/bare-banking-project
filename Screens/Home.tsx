import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavProps} from '../Components/Navigator';
import {realm, RegisterType} from '../Schemas/Schemas';

const json = require('../data.json');
const user = json[0];

const transactions = () =>
  realm
    .then(realm => {
      const allExpenses = realm.objects<RegisterType>('Expense');
      const allIncomes = realm.objects<RegisterType>('Income');
      // console.log(`These are the expenses : ${allExpenses}`);
      // console.log(`These are the incomes : ${JSON.stringify(allIncomes)}`);
      // console.log(allExpenses);
      // console.log(allIncomes);
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

const renderItem = ({item}: any) => {
  const toto = item.hasOwnProperty('_id_income') ? '' : '-';
  return (
    <View style={styles.list}>
      {/* .replace(/-/g, ' ')  removes dash in the date */}
      <Text>{item.date.split('T')[0]}</Text>
      {item.comments && <Text>{item.comments.substring(0, 15)}... </Text>}
      <Text>{toto + item.amount}</Text>
    </View>
  );
};

let income = user.incomes.reduce(
  (pV: number, cV: {amount: string}) =>
    pV + parseFloat(cV.amount.replace(/[^\d.-]/g, '')),
  0,
);
let expense = user.expenses.reduce(
  (pV: number, cV: {amount: string}) =>
    pV + parseFloat(cV.amount.replace(/[^\d.-]/g, '')),
  0,
);

export let balance = income - expense;
const renderBalance = () => {
  return (
    <View style={styles.title}>
      <Text style={{fontSize: 35, textAlign: 'center'}}>
        Balance: {balance.toFixed(2)}€
      </Text>
    </View>
  );
};
const Home: React.FC<NavProps> = ({navigation}) => {
  const [allTransactions, setAllTransactions] = useState(undefined);
  useEffect(() => {
    transactions().then(allT => {
      setAllTransactions(allT);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        {allTransactions != undefined ? (
          <View style={styles.balance}>
            {renderBalance()}
            <FlatList
              style={{width: '90%'}}
              data={allTransactions}
              renderItem={renderItem}
              initialNumToRender={3}
            />
          </View>
        ) : (
          <ActivityIndicator />
        )}

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.navButton, styles.toIncome]}
            onPress={() => navigation.navigate('GrossRegister')}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Register an income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.toExpense]}
            onPress={() => navigation.navigate('SpendingRegister')}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Register an expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7dede',
  },
  subcontainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '60%',
  },
  balance: {
    backgroundColor: 'white',
    height: '70%',
    width: '90%',
    elevation: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  list: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor:"blue",
    justifyContent: 'space-between',
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'lightyellow',
    borderRadius: 5,
    elevation: 10,
    height: 70,
    width: '40%',
  },
  toIncome: {
    backgroundColor: 'lightgreen',
  },
  toExpense: {
    backgroundColor: 'tomato',
  },
});
