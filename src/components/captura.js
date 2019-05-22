import * as React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {mod_codigo,mod_sucess} from '../actions/ActionPrincipal';
import QRCodeScanner from "react-native-qrcode-scanner";
import Header from './utils/header'



class Captura extends React.Component {
  
      componentDidMount(){
        this.scanner.reactivate();
      }
    
      openLink = () => {
      };
    
      handleButton = () => {
      }
    
      onSuccess = (e) => {
        this.scanner.reactivate()
        this.props.navigation.navigate("Resultado",{codigoPromo:e.data});
      };



   
    render(){
        return(
            <View style={styles.containerFundo}>
              <Header navigation={this.props.navigation} nome={"Scanner Promocional"}/>
                <QRCodeScanner
                  onRead={this.onSuccess}
                  showMarker={true}
                  vibrate={false}
                  checkAndroid6Permissions={true}
                  ref={(elem) => { this.scanner = elem }}
                  cameraStyle={styles.cameraContainer}
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
      cameraContainer: {
        height: Dimensions.get('window').height,
      },
});


const mapStateToProps = state => ({
   
});

export default connect(mapStateToProps, {})(Captura);

