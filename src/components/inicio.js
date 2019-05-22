import * as React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, StackActions } from 'react-navigation'
class Inicio extends React.Component {
    
    
    render(){
        return(
            <ImageBackground source={require('../resources/1.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={styles.containerTopo}>
                    <TouchableOpacity   style={{margin:10}} onPress={()=>
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName:'Login',params:{}}),
                            ],
                        }))
                    }>
                                        <Icon name="logout" size={30} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBotoes}>

                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate("Captura")}>
                                    <Icon name="qrcode-scan" size={100} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListaPromo")}>
                                    <Icon name="format-list-bulleted" size={100} color="#000" /> 
                    </TouchableOpacity>

                </View>
                </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    containerTopo:{
        flexDirection:'row',
       justifyContent:'flex-end',
    },
    containerFundo:{
        flex:1,
     
    },
    containerBotoes:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
   
});


const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, { })(Inicio);

