import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import axios from 'axios';

import styles from './styles';

const SalesList = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:5000/api/salesList');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.stockName}</Text>
      <Text style={styles.tableCell}>{item.qnt}</Text>
      <Text style={styles.tableCell}>{item.stock}</Text>
      <Text style={styles.tableCell}>{item.amount}</Text>
      <Text style={styles.tableCell}>{item.profit}</Text>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.customer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Sales list</Text>

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
          <Text style={styles.tableHeaderCell}>qnt</Text>
          <Text style={styles.tableHeaderCell}>stock</Text>
          <Text style={styles.tableHeaderCell}>sold at</Text>
          <Text style={styles.tableHeaderCell}>profit</Text>
          <Text style={styles.tableHeaderCell}>date</Text>
          <Text style={styles.tableHeaderCell}>Customer</Text>
        </View>

        <FlatList
          data={data.filter(
            (item) =>
              item.stockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.customer && item.customer.toLowerCase().includes(searchQuery.toLowerCase()))
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

export default SalesList;
