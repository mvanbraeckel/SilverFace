import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';

export default class MenuScreen extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.loggedIn != this.state.loggedIn) {
            this.setState({ loggedIn: this.props.loggedIn })
        }
    }

    previousOrder() {
        Alert.alert(
            'Your Previous Order',
            `
                1. Burger
                2. Drink
                   Total: $7
            `,
            [
                { text: 'Reorder', onPress: () => this.props.checkout(7) },
            ],
            { cancelable: true },
        );
    }

    recommendations() {
        Alert.alert(
            'Recommendations',
            "Based off your order history, we recommend you try our Burger and Ice Cream.",
            [
                { text: 'Add to Order ($7)', onPress: () => this.props.checkout(7) },
            ],
            { cancelable: true },
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => this.props.addItem(5)} style={styles.container}>
                        <ImageBackground style={styles.image} source={require('./images/burger-dark.jpg')}>
                            <Text style={styles.text}>Burgers</Text>
                            <Text style={styles.price}>$5</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.addItem(2)} style={styles.container}>
                        <ImageBackground style={styles.image} source={require('./images/drinks-dark.jpg')}>
                            <Text style={styles.text}>Drinks</Text>
                            <Text style={styles.price}>$2</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.addItem(3)} style={styles.container}>
                        <ImageBackground style={styles.image} source={require('./images/fries-dark.jpg')}>
                            <Text style={styles.text}>Fries</Text>
                            <Text style={styles.price}>$3</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.addItem(2)} style={styles.container}>
                        <ImageBackground style={styles.image} source={require('./images/ice-cream-dark.jpg')}>
                            <Text style={styles.text}>Ice Cream</Text>
                            <Text style={styles.price}>$2</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    {
                        // Only display these buttons if the customer has logged in successfully
                        this.state.loggedIn ?
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.previousOrder()} style={[styles.container, { backgroundColor: '#54B948' }]}>
                                    <Text style={styles.smallText}>Your Previous Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.recommendations()} style={[styles.container, { backgroundColor: '#54B948' }]}>
                                    <Text style={styles.smallText}>Your Recommendations</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    price: {
        marginLeft: 10,
        fontSize: 30,
        color: 'white',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    }
});