import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Api from './services/Api';
import CameraScreen from './CameraScreen';
import MenuScreen from './MenuScreen';
import CartScreen from './CartScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Api()
    this.goodbye = 'Thank you for shopping with us, have a nice day!'
  }

  state = {
    name: '',
    logout: false,
    total: 0
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <MenuScreen loggedIn={this.state.name !== ''} addItem={price => this.setState({ total: this.state.total + price })} checkout={total => this.setState({ total: total + this.state.total })} />
          <CartScreen total={this.state.total} checkout={() => {
            if (this.state.name === '') {
              Alert.alert(
                'FacePay',
                "Sorry we did not recognized you. Please create an account.",
                [
                  { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false },
              );
            } else {
              Alert.alert(
                'Checkout',
                `${this.state.name}, your total is $${this.state.total}. Your order will be ready soon.`,
                [
                  {text: 'OK', onPress: () => {
                    let response = this.api.sendMail(this.state.name, "Your FacePay Receipt!", `Thank you for using FacePay! your total has come to  $${this.state.total}`);
                    this.setState({name: this.goodbye, total: 0})
                    setTimeout(() => this.setState({logout: true, name: ''}), 5000)
                  }},
                ],
                { cancelable: false },
              );
            }

          }} />
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#ededed' }}>
          <View style={{ flex: 0, height: 125, width: 125, justifyContent: 'flex-start', margin: 10 }}>
            <CameraScreen logout={this.state.logout} onIdentify={(name) => this.setState({ name, logout: false })} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'flex-end', alignContent: 'center' }}>
              <ActivityIndicator animating={this.state.name === ''} size="large" color="#00ff00" style={{ margin: 5 }} />
              <Text style={{ fontSize: 25 }}>{this.state.name}</Text>
            </View>
            {
              this.state.name !== '' && this.state.name !== this.goodbye ?
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 5 }}>
                  <TouchableOpacity onPress={() => {
                    this.setState({ name: this.goodbye })
                    setTimeout(() => this.setState({ logout: true, name: '' }), 5000)
                  }}>
                    <Text style={{ fontSize: 10 }}>logout</Text>
                  </TouchableOpacity>
                </View>
                : <View style={{ flex: 1 }} />
            }
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
});
