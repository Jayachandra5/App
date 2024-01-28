import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


const Menu = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  useFocusEffect(() => {
    setMenuVisible(false); 
  });

  const handleToggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const renderMenuItems = () => {
    if (isMenuVisible) {
      return (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="circle" size={15} color="#333" />
            <Text>Hi</Text>
          </TouchableOpacity>
          {/* Add other menu items as needed */}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.menuDropdown}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Purchase List')}>
      <Icon name="circle" size={15} color="#333" />
            <Text>List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    zIndex: 1,
  },
});

export default Menu;
