import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const Report = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formattedStartDate = startDate.toDateString();
    const formattedEndDate = endDate.toDateString();

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    const displayReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const startDateISOString = startDate.toISOString();
            const endDateISOString = endDate.toISOString();
    
            const response = await axios.get('http://192.168.56.1:5000/api/reportData', {
                params: {
                    date1: startDateISOString,
                    date2: endDateISOString
                }
            });
            setData(response.data);
            console.log('hi');
        } catch (error) {
            setError('Error fetching report data');
            console.error('Error fetching report data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        displayReport();
    }, []);

    const handleDoneButtonPress = () => {
        displayReport();
    };
    
    
    const renderItem = ({ item }) => {
    
        return (
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.stockName}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.qntAvl}</Text>
                <Text style={styles.tableCell}>{item.totalAmount}</Text>
                <Text style={styles.tableCell}>{item.totalQnt}</Text>
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Report</Text>

                <View style={styles.datePickerContainer}>
                    <Text style={styles.datePickerLabel}>Start Date: {formattedStartDate}</Text>
                    <Button title="Select Start Date" onPress={() => setShowStartDatePicker(true)} />
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleStartDateChange}
                        />
                    )}
                </View>

                <View style={styles.datePickerContainer}>
                    <Text style={styles.datePickerLabel}>End Date: {formattedEndDate}</Text>
                    <Button title="Select End Date" onPress={() => setShowEndDatePicker(true)} />
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            minimumDate={startDate} // Set minimum date to start date
                            onChange={handleEndDateChange}
                        />
                    )}
                </View>

                <Button title="Done" onPress={handleDoneButtonPress} />

                {loading && <Text>Loading...</Text>}
                {error && <Text>{error}</Text>}

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Name</Text>
                    <Text style={styles.tableHeaderCell}>Qnt Avl</Text>
                    <Text style={styles.tableHeaderCell}>Opening</Text>
                    <Text style={styles.tableHeaderCell}>Purchased</Text>
                    <Text style={styles.tableHeaderCell}>Sold</Text>
                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <View style={{ paddingHorizontal: 15 }}>
                            {/* Optional: You can add a header if needed */}
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ paddingHorizontal: 15 }}>
                            {/* Optional: You can add a footer if needed */}
                        </View>
                    }
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerLabel: {
        marginRight: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
    },
    tableHeaderCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default Report;
