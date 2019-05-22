
import React, {Component} from 'react';
import {StyleSheet, Text, View ,Dimensions,TouchableOpacity} from 'react-native';
import QRCodeScanner from "react-native-qrcode-scanner";
import QRCode from 'react-native-qrcode-svg';



export default class App extends Component {

  state = {
    modalVisible: false,
    success: null,
    url: '',
  };


  openLink = () => {
console.log(this.state.url);
  };

  handleButton = () => {
    this.setState({ modalVisible: !this.state.modalVisible, success: false })
    this.scanner.reactivate()
  }

  onSuccess = async (e) => {
    await this.setState({ success: true, modalVisible: true, url: e.data });
    console.log(this.state.url);
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={(elem) => { this.scanner = elem }}
          cameraStyle={styles.cameraContainer}
          // reactivate={true}
          bottomContent={
            <View style={styles.touchable}>
              {this.state.success && (
                <Text style={styles.text}>OK. Got it!</Text>
              )}
            </View>
          }
        />


      <TouchableOpacity onPress={this.handleButton}>
          <Text>Ler outro QRCode</Text>
        </TouchableOpacity>


        <QRCode
      value="http://awesome.link.qr"
      />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },

  touchable: {
    padding: 16
  },

  text: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },

  cameraContainer: {
    height: Dimensions.get('window').height,
  }

});

