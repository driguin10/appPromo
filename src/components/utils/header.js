import React from 'react';
import { StyleSheet, View, Dimensions,TouchableOpacity,Text ,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Header = props =>{
  const {navigation,nome} = props;




  return (
    
    <View style={styles.header}>
      <TouchableOpacity style={styles.btVoltar} onPress={()=>{navigation.goBack()}}>
          <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.ContainerTituloHeader}><Text style={styles.tituloHeader} >{nome}</Text></View>  
    
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
      flexDirection:'row',
      width: width,
      height: 60,
      position:'absolute',
      zIndex:50000,
      elevation:10,
      backgroundColor:"#25203c"
  },
  ContainerTituloHeader:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      left:-20
  },
  tituloHeader:{
      color:'#fff',
      fontSize:20,
      top:0
  },
  btVoltar:{
      marginTop:15,
      marginLeft:10
  },
});

export default Header;