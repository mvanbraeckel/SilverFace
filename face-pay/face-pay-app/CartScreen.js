import React from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default class CartScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 0, margin: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={styles.text}>Total: ${this.props.total}</Text>
                <TouchableOpacity onPress={() => this.props.checkout()}>
                    <Text style={styles.text}>Checkout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25
    }
});