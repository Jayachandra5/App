
import {  StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10, // Increased vertical padding for better spacing
        backgroundColor: '#1E90FF',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase', // Convert text to uppercase for a stylish look
        borderRadius: 15, // Rounded corners for a modern appearance
        marginHorizontal: 5, // Added margin for better alignment with screen edges
        marginTop: -10, // Increased top margin for better separation from other elements
        shadowColor: '#000', // Added shadow to create depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Android shadow elevation
    },
    
    searchContainer: {
        paddingVertical: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
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

export default Styles;
