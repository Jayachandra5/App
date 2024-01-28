import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PurchaseList = () => {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.56.1:5000/api/customers');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.cName}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
            <Text style={styles.tableCell}>{item.mobile}</Text>
            <Text style={styles.tableCell}>{item.mail}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>customerList list</Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>name</Text>
                    <Text style={styles.tableHeaderCell}>amount</Text>
                    <Text style={styles.tableHeaderCell}>mobile</Text>
                    <Text style={styles.tableHeaderCell}>mail</Text>
                </View>

                <FlatList
                    data={data.filter((item) =>
                        item.cName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (item.amount &&
                            item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (item.mobile && item.mobile.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (item.mail && item.mail.toLowerCase().includes(searchQuery.toLowerCase()))
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />


            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        top: 22,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: '#1E90FF',
        color: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default PurchaseList;