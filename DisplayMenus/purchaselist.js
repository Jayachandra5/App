import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PurchaseList = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://192.168.56.1:5000/api/data');
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.stockname}</Text>
          <Text style={styles.tableCell}>{item.quantity}</Text>
          <Text style={styles.tableCell}>{item.mrp}</Text>
          <Text style={styles.tableCell}>{item.price}</Text>
          <Text style={styles.tableCell}>{item.tax}</Text>
        </View>
      );

      return (
        
        <View style={styles.container}>
          <View style={styles.headerContainer}>
          <Text style={styles.heading}>stock list</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>name</Text>
            <Text style={styles.tableHeaderCell}>qnt</Text>
            <Text style={styles.tableHeaderCell}>mrp</Text>
            <Text style={styles.tableHeaderCell}>price</Text>
            <Text style={styles.tableHeaderCell}>tax</Text>
          </View>
    
          <FlatList
            data={data.filter((item) =>
              item.stockname.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.quantity &&
                item.quantity.toString().toLowerCase().includes(searchQuery.toLowerCase()))
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