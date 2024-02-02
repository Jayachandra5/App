import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import axios from 'axios';

import styles from './styles';

const VendorList = () => {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.56.1:5000/api/vendours');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.vName}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Vendor List</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Name"
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Name</Text>
                <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>

            <FlatList
                data={data.filter((item) =>
                    (item.vName && item.vName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (item.amount && item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()))
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default VendorList;
