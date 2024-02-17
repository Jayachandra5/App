import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

import styles from './styles';

const TotalDueList = () => {
    const [totalourdues, setTotalOurDues] = useState(0);
    const [totalcsdues, setTotalCsDues] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.56.1:5000/api/displaytotalDues');
                setTotalOurDues(response.data.totalourdues);
                setTotalCsDues(response.data.totalcsdues);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Total Due Data</Text>

            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Name</Text>
                <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>

            <FlatList
                data={[
                    { name: 'totalourdues', amount: totalourdues },
                    { name: 'totalcsdues', amount: totalcsdues }
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.name}</Text>
                        <Text style={styles.tableCell}>{item.amount}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default TotalDueList;
