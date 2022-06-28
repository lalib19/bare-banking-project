import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {balance} from './Home';
import {realm, RegisterType} from '../Schemas/Schemas';
import {NavProps} from '../Components/Navigator';

const json = require('../data.json');
const user = json[0];

const renderList = ({item}: any) => {
  const operator = '_id_income' in item ? '' : '-';
  const currency = item.amount.includes('€') ? '' : '€';

  return (
    <View style={styles.flatlist}>
      <View style={styles.transaction}>
        <View style={styles.transactionHeader}>
          <Text style={{fontSize: 20}}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={['_id_income' in item ? styles.income : styles.expense]}>
            {operator + currency + item.amount}
          </Text>
        </View>
        <Text>{item.category}</Text>
        <View style={styles.comments}>
          <Text style={{fontSize: 17}}>
            {item.comments}
            {item._id_expense}
            {item._id_income}
          </Text>
        </View>
      </View>
    </View>
  );
};
type Callback = (callback: any) => void


const Account: React.FC<NavProps> = ({navigation}) => {
  const [filter, setFilter] = useState('All');
  const [allTransactions, setAllTransactions] = useState<any[] | undefined>(undefined);
  const [allExpenses, setAllExpenses] = useState<any[]>([]);
  const [allIncomes, setAllIncomes] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const transactions = () =>
        realm
          .then(realm => {
            const allExpenses = realm.objects<RegisterType>('Expense');
            const allIncomes = realm.objects<RegisterType>('Income');
            return {
              allT: user.incomes
                .concat(...user.expenses, ...allExpenses, ...allIncomes)
                .sort(
                  (
                    a: {date: string | number | Date},
                    b: {date: string | number | Date},
                  ) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                ),
              allE: allExpenses,
              allI: allIncomes,
            };
          })
          .catch(error => {
            console.log(`This is the catch :${error}`);
          });
      transactions().then(data => {
        setAllTransactions(data.allT);
        setAllExpenses(data.allE);
        setAllIncomes(data.allI);
      });
    });
    return unsubscribe;
  }, [navigation]);

  let income = user.incomes.reduce(
    (pV: number, cV: {amount: string}) =>
      pV + parseFloat(cV.amount.replace(/[^\d.-]/g, '')),
    0,
  );
  let newIncome = allIncomes.reduce(
    (pV: number, cV: {amount: string}) => pV + parseFloat(cV.amount),
    0,
  );

  let expense = user.expenses.reduce(
    (pV: number, cV: {amount: string}) =>
      pV + parseFloat(cV.amount.replace(/[^\d.-]/g, '')),
    0,
  );
  let newExpense = allExpenses.reduce(
    (pV: number, cV: {amount: string}) => pV + parseFloat(cV.amount),
    0,
  );

  let balance = income + newIncome - newExpense - expense;

  const renderBalance = () => {
    return (
      <View>
        <Text style={{fontSize: 35, textAlign: 'center'}}>
          Balance: {balance.toFixed(2)}€
        </Text>
      </View>
    );
  };

  let filteredTransactions;
  if (filter === 'All') {
    filteredTransactions = allTransactions;
  } else if (filter === 'Incomes') {
    filteredTransactions = user.incomes
      .concat(...allIncomes)
      .sort(
        (
          a: {date: string | number | Date},
          b: {date: string | number | Date},
        ) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  } else {
    filteredTransactions = user.expenses
      .concat(...allExpenses)
      .sort(
        (
          a: {date: string | number | Date},
          b: {date: string | number | Date},
        ) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.user}>{user.user}'s account</Text>
      <Text style={styles.balance}>{renderBalance()}</Text>
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
