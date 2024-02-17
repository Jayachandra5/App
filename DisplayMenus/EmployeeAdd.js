import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EmployeeAdd = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleSalaryChange = (text) => {
    setSalary(text);
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post('http://192.168.56.1:5000/api/employeeAdd', {
        name: name,
        salary: salary,
      });
      setName('');
      setSalary('');
      console.log('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Employee</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={handleNameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Salary"
          value={salary}
          onChangeText={handleSalaryChange}
          keyboardType="numeric"
        />
        <Button title="Add Employee" onPress={handleAddEmployee} />
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
});

export default EmployeeAdd;
