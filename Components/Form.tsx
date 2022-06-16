import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik, Field, ErrorMessage} from 'formik';
import {string, StringSchema} from 'yup';
import {Picker} from '@react-native-picker/picker';
import * as yup from 'yup';

interface Values {
  data: {
    beneficiary: string;
    amount: string;
    date: string;
    category: string;
    comments: string;
  };
}

const Form: React.FC<Values> = ({data}) => {
  // const Form = () => {
  const onSubmit = (values: string) => {
    console.log(values);
  };


return (<View></View>) // placeholder to erase when try again


  // 
  // return (
  // for (const property in data) {
  //   const loginValidationSchemaTest = yup.object({
  //     property: string().required('Field is required'),
  //   });

  //     <View style={styles.container}>
  //       <Formik
  //         initialValues={{
  //           property: '',
  //         }}
  //         validationSchema={loginValidationSchemaTest}
  //         onSubmit={onSubmit}>
  //         {({handleChange, handleBlur, handleSubmit, isValid, values}) => (
  //           <View style={styles.form}>
  //             <View style={styles.combo}>
  //               <Text style={styles.label}>{property}</Text>
  //               <TextInput
  //                 style={styles.input}
  //                 onChangeText={handleChange(`${property}`)}
  //                 onBlur={handleBlur(`${property}`)}
  //                 value={data[property]}
  //               />
  //             </View>
  //             <Button
  //               onPress={handleSubmit}
  //               title="Submit"
  //               disabled={!isValid}
  //             />
  //           </View>
  //         )}
  //       </Formik>
  //     </View>
  //   );
  // }


//   const loginValidationSchema = yup.object({
//     beneficiary: string().required(),
//     amount: string().required(),
//     date: string().required(),
//     category: string().required(),
//     comments: string().required(),
//   });

//   return (
//     <View style={styles.container}>
//       <Formik
//         initialValues={{
//           beneficiary: '',
//           amount: '',
//           date: '',
//           category: '',
//           comments: '',
//         }}
//         validationSchema={loginValidationSchema}
//         onSubmit={onSubmit}>
//         {({handleChange, handleBlur, handleSubmit, isValid, values}) => (
//           <View style={styles.form}>
//             <View style={styles.combo}>
//               <Text style={styles.label}>Beneficiary</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('beneficiary')}
//                 onBlur={handleBlur('beneficiary')}
//                 value={values.beneficiary}
//               />
//             </View>
//             <View style={styles.combo}>
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('amount')}
//                 onBlur={handleBlur('amount')}
//                 value={values.amount}
//               />
//             </View>
//             <View style={styles.combo}>
//               <Text style={styles.label}>Date</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('date')}
//                 onBlur={handleBlur('date')}
//                 value={values.date}
//                 // keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.combo}>
//               <Text style={styles.label}>Category</Text>
//               <Picker
//                 selectedValue={values.category}
//                 onValueChange={handleChange('category')}
//                 mode="dropdown" // Android only
//                 style={styles.input}>
//                 <Picker.Item label="Pick a category" value="Unknown" />
//                 <Picker.Item label="Salary" value="Salary" />
//                 <Picker.Item label="Financial gross" value="Financial gross" />
//                 <Picker.Item label="Rent revenue" value="Rent revenue" />
//                 <Picker.Item label="Child support" value="Child support" />
//                 <Picker.Item label="Unemployment" value="Unemployment" />
//                 <Picker.Item label="Welfare" value="Welfare" />
//                 <Picker.Item label="Property income" value="Property income" />
//                 <Picker.Item
//                   label="Exceptional income"
//                   value="Exceptional income"
//                 />
//                 <Picker.Item label="Else" value="Else" />
//               </Picker>
//             </View>
//             <View style={styles.combo}>
//               <Text style={styles.label}>Comments</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('comments')}
//                 onBlur={handleBlur('comments')}
//                 value={values.comments}
//               />
//             </View>
//             <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
  },
  form: {
    width: '80%',
    height: '70%',
    justifyContent: 'space-around',
  },
  combo: {
    width: '100%',
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
});
