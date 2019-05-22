import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
var Spinner = require('react-native-spinkit');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const Loader = props =>{
  const {loading} = props;
  return (
    <View  style={[styles.logo , loading ?  styles.enabled : styles.disabled] }>
      <Spinner  isVisible={true} size={150} type={'Wave'} color={'#fff'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position:'absolute',
        width:width,
        height:height,
    },
    enabled:{
      zIndex:50000,
    },
    disabled:{
      zIndex:-50000,
    }
});

export default Loader;