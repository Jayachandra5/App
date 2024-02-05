import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import interfacescreen from './Frontend/Skeleton';
import PurchaseList from './DisplayMenus/purchaselist';
import Menu from './Frontend/Menu';
import History from './Frontend/History';
import Cart from './Frontend/Cart';
import Profile from './Frontend/Profile';
import customerList from './DisplayMenus/customerList'


import Icon from 'react-native-vector-icons/FontAwesome';

const UpperTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Header = () => {
  return (
    <UpperTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 10
        },
        alignItems: 'center'
      }}
    >
      <UpperTab.Screen
        name="Product"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <Icon name="product-hunt" size={20} color="#333" />
          ),
        }}
      />
      <UpperTab.Screen
        name="Employee"
        component={PurchaseList}
        options={{
          tabBarIcon: () => (
            <Icon name="user" size={20} color="#333" />
          ),
        }}
      />
      <UpperTab.Screen
        name="Expenses"
        component={interfacescreen}
        options={{
          tabBarIcon: () => (
            <Icon name="rocket" size={20} color="#333" />
          ),
        }}
      />
      <UpperTab.Screen
        name="Dues"
        component={customerList}
        options={{
          tabBarIcon: () => (
            <Icon name="money" size={20} color="#333" />
          ),
        }}
      />
      <UpperTab.Screen
        name="Data"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <Icon name="bars" size={20} color="#333" />
          ),
        }}
      />
      <UpperTab.Screen
        name="Reports"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <Icon name="bar-chart" size={20} color="#333" />
          ),
        }}
      />
    </UpperTab.Navigator>
  );
};

const Footer = () => {
  return (
    <BottomTab.Navigator
      style={styles.footer}>
      <BottomTab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <Icon name="list" size={20} color="#333" />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: () => (
            <Icon name="history" size={20} color="#333" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={interfacescreen}
        options={{
          tabBarIcon: () => (
            <Icon name="home" size={20} color="#333" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={PurchaseList}
        options={{
          tabBarIcon: () => (
            <Icon name="shopping-cart" size={20} color="#333" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Icon name="user" size={20} color="#333" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomScreen" component={Footer} />
        <Stack.Screen name="Purchase List" component={PurchaseList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  footer: {
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


export default App;
