import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your preferred icon library
import axios from 'axios';


import ProductList from '../DisplayMenus/productList';
import CustomerList from '../DisplayMenus/customerList';
import VendourList from  '../DisplayMenus/vendourList';
import PurchaseList from '../DisplayMenus/purchaselist';
import SalesList from '../DisplayMenus/salesList';
import ExpensesList from '../DisplayMenus/expensesList';
import VendourDue from '../DisplayMenus/vendourDue';
import CustomerDue from '../DisplayMenus/customerDue';
import TotalDueList from '../DisplayMenus/totalDue';
import EmployeeListData from '../DisplayMenus/employeeList';
import EmployeeAttendanceList from '../DisplayMenus/EmployeeAttendanceList';

import EmployeeAdd from '../DisplayMenus/EmployeeAdd';
import EmployeeAttendance from '../DisplayMenus/EmployeeAttendance';

import Report from '../DisplayMenus/Report';

const Skeleton = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false); // State to manage menu visibility
  const [isMenuVisible2, setMenuVisible2] = useState(false);
  const [isMenuVisible3, setMenuVisible3] = useState(false);
  const [isMenuVisible4, setMenuVisible4] = useState(false);
  const [isMenuVisible5, setMenuVisible5] = useState(false);
  const [isMenuVisible6, setMenuVisible6] = useState(false);
  const [isBottomMenuVisible, setBottomMenuVisible] = useState(true); // Set to true by default

  const [selectedMenuItem, setSelectedMenuItem] = useState('list');

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'product':
        return <ProductList />;

      case 'employeeAdd':
        return <EmployeeAdd />;

      case 'employeeList':
        return <EmployeeListData />;

      case 'employeeAttendance':
        return <EmployeeAttendance />;

      case 'employeeAttendanceList':
        return <EmployeeAttendanceList />;

      case 'customerList':
        return <CustomerList />;

      case 'vendourList':
        return <VendourList />;

      case 'purchaseList':
        return <PurchaseList />;
      
      case 'salesList':
        return <SalesList />;

      case 'expensesList':
        return <ExpensesList />;

      case 'totalDue':
        return <TotalDueList />;

      case 'vendourDue':
        return <VendourDue />;

      case 'customerDue':
        return <CustomerDue />;

      case 'report':
        return <Report />;
      
      // Add cases for other menu items as needed
      default:
        return null;
    }
  };

  const renderMenuItems = () => {
    if (isMenuVisible) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}  onPress={() => setSelectedMenuItem('product')}>
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
        <View style={styles.menuDropdown2}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('employeeAdd')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('employeeList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('employeeAttendance')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Attandance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('employeeAttendanceList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Attandance List</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
    return null;
  };

  const renderMenuItems3 = () => {
    if (isMenuVisible3) {
      return (
        <View style={styles.menuDropdown3}>
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
        <View style={styles.menuDropdown4}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('totalDue')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('vendourDue')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('customerDue')}>
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
        <View style={styles.menuDropdown5}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('vendourList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Vendor List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('customerList')}>
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
        <View style={styles.menuDropdown6}>
          <TouchableOpacity
            style={styles.menuItem} onPress={() => setSelectedMenuItem('purchaseList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Purchase List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('salesList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Sales List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('expensesList')}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Expenses List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedMenuItem('report')}>
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

  return (
    <View style={styles.container}>
     
        <Text style={styles.heading}>IMS</Text>

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
      </View>

      {renderContent()}
      
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginBottom: 16,
    backgroundColor: '#1E90FF',
    color: '#fff',
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
    left: -10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
  menuDropdown2: {
    position: 'absolute',
    top: 40,
    left: 60,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
  menuDropdown3: {
    position: 'absolute',
    top: 40,
    left: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
  menuDropdown4: {
    position: 'absolute',
    top: 40,
    left: 210,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
  menuDropdown5: {
    position: 'absolute',
    top: 40,
    left: 250,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
  menuDropdown6: {
    position: 'absolute',
    top: 40,
    left: 300,
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
    bottom: 20,
  },
});

export default Skeleton;
