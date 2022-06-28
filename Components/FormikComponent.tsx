/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import {string} from 'yup';
import {Picker} from '@react-native-picker/picker';
import * as yup from 'yup';
import DatePicker from '../Components/DatePicker';
import {realm, RegisterType} from '../Schemas/Schemas';
import {RouteParams} from '../App';

interface Page {
  page: string;
  navigation?: any;
}

const FormikComponent: React.FC<Page> = ({page}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [grossDate, setGrossDate] = useState('');

  const onSubmit = (values: any) => {
    navigation.navigate('Navigator', {screen: "Home"});
    if (page === 'Gross') {
      realm
        .then(realm => {
          realm.write(() => {
            realm.create<RegisterType>('Income', {
              beneficiary: values.beneficiary,
              amount: values.amount,
              date: values.date,
              category: values.category,
              comments: values.comments,
              _id_income: Date.now().toString(),
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      realm
        .then(realm => {
          realm.write(() => {
            realm.create<RegisterType>('Expense', {
              beneficiary: values.beneficiary,
              amount: values.amount,
              date: values.date,
              category: values.category,
              comments: values.comments,
              _id_expense: Date.now().toString(),
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const loginValidationSchema = yup.object({
    beneficiary: string().required('Field is required'),
    amount: string().required('Field is required'),
    date: string().required('Field is required'),
    category: string().matches(/\b(?!None\b)\w+/, 'Pick a category'),
    comments: string().required('Field is required'),
  });

  return (
    <View
      style={[
        styles.container,
        page === 'Gross' ? styles.gross : styles.spending,
      ]}>
      <Formik
        initialValues={{
          beneficiary: '',
          amount: '',
          date: '',
          category: 'None',
          comments: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.combo}>
              <Text style={styles.label}>Beneficiary</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('beneficiary')}
                onBlur={handleBlur('beneficiary')}
                value={values.beneficiary}
              />
              {errors.beneficiary && touched.beneficiary && (
                <Text style={styles.error}>{errors.beneficiary}</Text>
              )}
            </View>
            <View style={styles.combo}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
              />
              {errors.amount && touched.amount && (
                <Text style={styles.error}>{errors.amount}</Text>
              )}
            </View>
            <View style={styles.combo}>
              <Text style={styles.label}>Date</Text>
              <DatePicker
                setGrossDate={setGrossDate}
                handleChange={handleChange('date')}
                value={values.date}
              />
              {errors.date && touched.date && (
                <Text style={styles.error}>{errors.date}</Text>
              )}
            </View>
            <View style={styles.combo}>
              <Text style={styles.label}>Category</Text>
              {page === 'Gross' && (
                <Picker
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}
                  mode="dropdown" // Android only
                  style={styles.input}>
                  <Picker.Item label="None" value="None" />
                  <Picker.Item label="Salary" value="Salary" />
                  <Picker.Item
                    label="Financial gross"
                    value="Financial gross"
                  />
                  <Picker.Item label="Rent revenue" value="Rent revenue" />
                  <Picker.Item label="Child support" value="Child support" />
                  <Picker.Item label="Unemployment" value="Unemployment" />
                  <Picker.Item label="Welfare" value="Welfare" />
                  <Picker.Item
                    label="Property income"
                    value="Property income"
                  />
                  <Picker.Item
                    label="Exceptional income"
                    value="Exceptional income"
                  />
                  <Picker.Item label="Else" value="Else" />
                </Picker>
              )}
              {page === 'Spending' && (
                <Picker
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}
                  mode="dropdown" // Android only
                  style={styles.input}>
                  <Picker.Item label="None" value="None" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Bills" value="Bills" />
                  <Picker.Item label="Transportation" value="Transportation" />
                  <Picker.Item label="Housing" value="Housing" />
                  <Picker.Item label="Healthcare" value="Healthcare" />
                  <Picker.Item label="Entertainment" value="Entertainment" />
                  <Picker.Item label="Holidays" value="Holidays" />
                  <Picker.Item label="Shopping" value="Shopping" />
                  <Picker.Item label="Else" value="Else" />
                </Picker>
              )}
              {errors.category && touched.category && (
                <Text style={styles.error}>{errors.category}</Text>
              )}
            </View>
            <View style={styles.combo}>
              <Text style={styles.label}>Comments</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                value={values.comments}
              />
              {errors.comments && touched.comments && (
                <Text style={styles.error}>{errors.comments}</Text>
              )}
            </View>
            <View style={styles.button}>
              <Button
                onPress={handleSubmit}
                title="Submit"
                disabled={!isValid}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormikComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  gross: {
    backgroundColor: 'lightgreen',
  },
  spending: {
    backgroundColor: 'tomato',
  },
  form: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  combo: {
    width: '80%',
  },
  label: {
    width: '100%',
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  button: {
    width: '80%',
  },
  error: {
    color: 'black',
  },
});
