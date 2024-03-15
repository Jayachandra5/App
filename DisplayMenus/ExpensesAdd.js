import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker, PickerIOS } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import axios from 'axios';

const ExpensesAdd = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [otherName, setOtherName] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const options = ['Rent', 'Tax', 'Bills', 'Spolied', 'Others'];

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  const handleOtherNameChange = (text) => {
    setOtherName(text);
  };

  const handleSalaryChange = (text) => {
    setSalary(text);
  };

  const handleAddEmployee = async () => {
    try {
      const name = selectedOption === 'Others' ? otherName : selectedOption;
      const response = await axios.post('http://192.168.56.1:5000/api/expensesAdd', {
        name: name,
        salary: salary,
      });
      setMessage(response.data.message);
      if (!response.data.message.includes('already exists')) {
        // Clear input fields only if employee doesn't already exist
        setSelectedOption('');
        setOtherName('');
        setSalary('');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage('Error adding employee');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expenses</Text>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}>
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        {selectedOption === 'Others' && (
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={otherName}
            onChangeText={handleOtherNameChange}
          />
        )}
        {selectedOption === 'Bills' && (
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={otherName}
            onChangeText={handleOtherNameChange}
          />
        )}
        {selectedOption === 'Spolied' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={otherName}
              onChangeText={handleOtherNameChange}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              value={otherName}
              onChangeText={handleOtherNameChange}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={salary}
          onChangeText={handleSalaryChange}
          keyboardType="numeric"
        />
        <Button title="Add " onPress={handleAddEmployee} />
        {message ? <Text style={[styles.message, { color: message.includes('already exists') ? 'red' : 'green' }]}>{message}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 10,
  },
});

export default ExpensesAdd;
