/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

// interface Expenses {
//   date?: string;
//   amount?: string;
//   category?: string;
//   comments?: string;
//   _id_expense?: string;
// }

const data = require('../data.json');
const user = data[0];
const expenses = user.expenses.map((el: { amount: string; }) =>
  parseFloat(el.amount.replace(/[^\d.-]/g, '')),
);

// const monthlyExpenses = user.expenses.reduce( (pV, cV) => {
//   if(parseInt(cV.date.split('T')[1]) === parseInt(pV.date.split('T')[1])){
//     pV + parseFloat(cV.amount.replace(/[^\d.-]/g, ''))
//   }
// }, parseFloat(user.expenses[0].amount.replace(/[^\d.-]/g, '')))

const graphData = {
  labels: ['Apr', 'May', 'June'],
  datasets: [
    {
      data: expenses,
      // data: [20, 45, 28, 80, 99, 43]
    },
  ],
};

const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text>Statistics</Text>
      <View style={styles.graph}>
        <BarChart
          data={graphData}
          width={350}
          height={220}
          // showBarTops={false}
          yAxisSuffix="€"
          fromZero={true}
          chartConfig={{
            // withInnerLines={true}
            // backgroundColor: '#e26a00',
            barPercentage: 0.5,
            // barRadius: 40,
            backgroundGradientFrom: 'tomato',
            backgroundGradientTo: 'tomato',
            // decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
            // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            // style: {
            //   borderRadius: 16,
            // },
            // propsForDots: {
            //   r: '6',
            //   strokeWidth: '2',
            //   stroke: '#ffa726',
            // },
          }}
          verticalLabelRotation={0}
        />
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graph: {
    elevation: 5,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "tomato",
    // width: "80%"
  },
});
