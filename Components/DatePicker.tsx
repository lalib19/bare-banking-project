import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DateProps {
  setGrossDate: any;
  handleChange: any;
  value: any;
}

const DatePicker: React.FC<DateProps> = ({setGrossDate, handleChange, value}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const handleConfirm = (date: any) => {
    setDatePickerVisibility(false);
    setDate(date.toLocaleDateString());
    setGrossDate(date.toLocaleDateString());
    handleChange(date.toLocaleDateString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <TextInput
          style={styles.input}
          onPressIn={() => setDatePickerVisibility(true)}
          placeholder="Date of Birth"
          value={value}
        />
        <Ionicons name="calendar" size={20} style={styles.icon} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: '6%',
  },
});
