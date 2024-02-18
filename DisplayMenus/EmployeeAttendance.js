import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';

const EmployeeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:5000/api/employeeList');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    // Set default attendance status for all employees as Absent
    const defaultAttendance = {};
    employees.forEach((employee) => {
      defaultAttendance[employee.id] = 'Absent';
    });
    setAttendanceStatus(defaultAttendance);
  }, [employees]);

  const handleAttendanceChange = (status) => {
    // Update attendance for all employees
    const updatedAttendance = {};
    Object.keys(attendanceStatus).forEach((employeeId) => {
      updatedAttendance[employeeId] = status;
    });
    setAttendanceStatus(updatedAttendance);
  };

  const markAttendance = async () => {
    try {
      // Update attendance for all employees in the backend
      await Promise.all(
        Object.keys(attendanceStatus).map((employeeId) =>
          axios.post('http://192.168.56.1:5000/api/employeeAttendance', {
            empId: employeeId,
            attendance: attendanceStatus[employeeId],
          })
        )
      );
      console.log('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee Attendance</Text>

      <View style={styles.headingRow}>
        <Text style={styles.subHeading}>Present</Text>
        <Text style={styles.subHeading}>Half Present</Text>
        <Text style={styles.subHeading}>Absent</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {employees.map((employee) => (
          <View key={employee.id} style={styles.employeeRow}>
            <Text>{employee.empname}</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  attendanceStatus[employee.id] === 'Present' && styles.radioButtonSelected,
                ]}
                onPress={() => setAttendanceStatus({ ...attendanceStatus, [employee.id]: 'Present' })}
              />
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  attendanceStatus[employee.id] === 'Half Present' && styles.radioButtonSelected,
                ]}
                onPress={() => setAttendanceStatus({ ...attendanceStatus, [employee.id]: 'Half Present' })}
              />
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  attendanceStatus[employee.id] === 'Absent' && styles.radioButtonSelected,
                ]}
                onPress={() => setAttendanceStatus({ ...attendanceStatus, [employee.id]: 'Absent' })}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={markAttendance} />
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
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subHeading: {
    fontWeight: 'bold',
  },
  employeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  radioButtonSelected: {
    backgroundColor: 'black',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default EmployeeAttendance;
