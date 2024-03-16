import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import axios from 'axios';

const ExpensesAdd = () => {
  const [selectedOption, setSelectedOption] = useState('Rent'); // Default option selected
  const [otherName, setOtherName] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const options = ['Rent', 'Tax', 'Bills', 'Spoiled', 'Others'];

  const handleOptionChange = (itemValue) => {
    console.log("Selected Option:", itemValue); // Check the selected option
    setSelectedOption(itemValue);
  };

  const handleOtherNameChange = (text) => {
    setOtherName(text);
  };

  const handleExpensesChange = (text) => {
    setSalary(text);
  };

  const handleAddExpenses = async () => {
    try {
      let name = '';
      let expenses = 0;
      const currentDate = new Date().toISOString().split('T')[0];

      switch (selectedOption) {
        case 'Rent':
          name = 'Rent Paid on ' + currentDate;
          expenses = salary;
          console.log("In Rent case");
          break;
        case 'Tax':
          name = 'Tax Paid on ' + currentDate;
          expenses = salary;
          break;
        case 'Bills':
          name = otherName + ' Bill';
          expenses = salary;
          break;
        case 'Spoiled':
          name = otherName;
          expenses = salary;
          break;
        case 'Others':
          name = otherName;
          expenses = salary;
          break;
        default:
          break;
      }

      console.log(name, expenses, currentDate);

      const response = await axios.post('http://192.168.56.1:5000/api/expensesAdd', {
        name: name,
        amount: expenses,
        date: currentDate,
      });

      setMessage('Expenses added successfully');
      // Clear text fields
      setOtherName('');
      setSalary('');
      
    } catch (error) {
      console.error('Error adding expenses:', error);
      setMessage('Error adding expenses');
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
        {selectedOption === 'Spoiled' && (
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
          onChangeText={handleExpensesChange}
          keyboardType="numeric"
        />
        <Button title="Add " onPress={handleAddExpenses} />
        {message ? <Text style={[styles.message, { color: message.includes('error') ? 'red' : 'green' }]}>{message}</Text> : null}
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
