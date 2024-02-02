import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import axios from 'axios';

import styles from './styles';

const customerList = () => {

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

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name"
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery}
                    />
                </View>

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


export default customerList;