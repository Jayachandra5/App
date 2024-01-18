import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your preferred icon library
import axios from 'axios';
import PurchaseList from './purchaselist';

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('product');
  const [isMenuVisible, setMenuVisible] = useState(false); // State to manage menu visibility
  const [isMenuVisible2, setMenuVisible2] = useState(false);
  const [isMenuVisible3, setMenuVisible3] = useState(false);
  const [isMenuVisible4, setMenuVisible4] = useState(false);
  const [isMenuVisible5, setMenuVisible5] = useState(false);
  const [isMenuVisible6, setMenuVisible6] = useState(false);
  const [isBottomMenuVisible, setBottomMenuVisible] = useState(true); // Set to true by default
  const [isPurchaseListVisible, setPurchaseListVisible] = useState(false);

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

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const toggleMenu2 = () => {
    setMenuVisible2(!isMenuVisible2);
  };

  const closeMenu2 = () => {
    setMenuVisible2(false);
  };

  const toggleMenu3 = () => {
    setMenuVisible3(!isMenuVisible3);
  };

  const closeMenu3 = () => {
    setMenuVisible3(false);
  };

  const toggleMenu4 = () => {
    setMenuVisible4(!isMenuVisible4);
  };

  const closeMenu4 = () => {
    setMenuVisible4(false);
  };

  const toggleMenu5 = () => {
    setMenuVisible5(!isMenuVisible5);
  };

  const closeMenu5 = () => {
    setMenuVisible5(false);
  };

  const toggleMenu6 = () => {
    setMenuVisible6(!isMenuVisible6);
  };

  const closeMenu6 = () => {
    setMenuVisible6(false);
  };

  const togglePurchaseList = () => {
    setPurchaseListVisible(!isPurchaseListVisible);
    console.log("isPurchaseListVisible:", isPurchaseListVisible);
    
    // Close other menus when opening the Purchase List
    setMenuVisible(false);
    setMenuVisible2(false);
    setMenuVisible3(false);
    setMenuVisible4(false);
    setMenuVisible5(false);
    setMenuVisible6(false);
  };

  const renderPurchaseList = () => {
    if (isPurchaseListVisible) {
      console.log("Rendering Purchase List");
      return <PurchaseList data={data} searchQuery={searchQuery} />;
    }
    return null;
  };

  const renderBody = () => {
    switch (activeMenu) {
      case 'product':
      //  return <Text>Product List</Text>; // Replace with your actual product component
      case 'employee':
       // return <Text>Employee List</Text>; // Replace with your actual employee component
      case 'expenses':
      //  return <Text>Expenses List</Text>; // Replace with your actual expenses component
      // Add more cases for other menu items as needed
      case 'purchase':
      //  return <PurchaseList data={data} searchQuery={searchQuery} />;
      default:
        return null;
    }
  };


  const renderMenuItems = () => {
    if (isMenuVisible) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Sell</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderMenuItems2 = () => {
    if (isMenuVisible2) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Attandance</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderMenuItems3 = () => {
    if (isMenuVisible3) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Wages</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderMenuItems4 = () => {
    if (isMenuVisible4) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderMenuItems5 = () => {
    if (isMenuVisible5) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Vendor List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Customer List</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderMenuItems6 = () => {
    if (isMenuVisible6) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={togglePurchaseList}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Purchase List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Sales List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Expenses List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Monetizae</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  const renderBottomMenuItems = () => {
    if (isBottomMenuVisible) {
      return (
        <View style={styles.bottomMenuContainer}>
          {/* Additional Bottom Menu Items */}

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bars" size={20} color="#333" />
            <Text>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="history" size={20} color="#333" />
            <Text>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={20} color="#333" />
            <Text>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="shopping-cart" size={20} color="#333" />
            <Text>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="user" size={20} color="#333" />
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };


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
        <Text style={styles.heading}>IMS</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by stockname"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      </View>

      {/* Updated Menu with conditional rendering of menu items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu} >
          <Icon name="product-hunt" size={20} color="#333" />
          <Text>Product</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu2}>
          <Icon name="user" size={20} color="#333" />
          <Text>Employee</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu3} >
          <Icon name="rocket" size={20} color="#333" />
          <Text>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu4} >
          <Icon name="money" size={20} color="#333" />
          <Text>Dues</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu5} >
          <Icon name="bars" size={20} color="#333" />
          <Text>Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu6} >
          <Icon name="bar-chart" size={20} color="#333" />
          <Text>Reports</Text>
        </TouchableOpacity>


        {renderMenuItems()}
        {renderMenuItems2()}
        {renderMenuItems3()}
        {renderMenuItems4()}
        {renderMenuItems5()}
        {renderMenuItems6()}
        {renderPurchaseList()}
        {renderBody()}
        

      </View>

      <Text style={styles.heading}>Product List</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>stockname</Text>
        <Text style={styles.tableHeaderCell}>quantity</Text>
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

      {/* Render the bottom menu items without the need for a trigger button */}
      {renderBottomMenuItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#1E90FF',
    color: '#fff',
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
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
  bottomMenuTrigger: {
    marginTop: 16,
    backgroundColor: '#1E90FF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  bottomMenuTriggerText: {
    color: '#fff',
  },

  bottomMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
});

export default App;
