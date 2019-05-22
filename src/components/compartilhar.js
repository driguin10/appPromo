import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Image} from 'react-native';
import { connect } from 'react-redux';
import Header from './utils/header'
import ViewShot from "react-native-view-shot"
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


  const manager = null;

class Compartilhar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            code:'',
            titulo:'',
            desconto:'',
            validade:'',
            descricao:''
        };
      }


      componentDidMount() {
      }
    
    

       componentWillMount(){
       // const { code , titulo, desconto,validade} = this.props.navigation.state.params;
        this.setState(this.props.navigation.state.params)
    
      }

     

      captura = (rede)=>{
        this.refs.viewShot.capture().then(uri =>{
            const shareOptions={
                title:'Cupom',
                message:"Cupom " + this.state.desconto +"% " + this.state.titulo,
                url:"data:image/png;base64," + uri ,
                social:rede
            }
            Share.shareSingle(shareOptions)
        })
    }
    


    render(){
        return(
            <View style={styles.containerFundo}>
                <Header navigation={this.props.navigation} nome={"Compartilhar QRcode"}/>
                
                
                <ViewShot ref="viewShot" options={{format:"png",quality:0.9, result:"base64"}} style={styles.shot}>
                     <ImageBackground source={require('../resources/1.jpg')} style={styles.imgBack}>
                    <View style={styles.containerLogo}>
                        <Image source={require('../resources/sanca.png')} style={{width: 200, height: 200}} />
                    </View>
                        <Text style={{fontSize:25 , color:"#000",marginTop:10}}>{this.state.titulo} {this.state.desconto}%</Text>
                        <Text style={{fontSize:18 , color:"#000",marginTop:10,marginBottom:10}}>{this.state.descricao}</Text>
                        <QRCode
                            value={this.state.code !="" && this.state.code !=null? this.state.code: "0"}
                            size={150}
                            backgroundColor={"transparent"}
                        />
                      

                        <Text style={{fontSize:18 , color:"#000",marginTop:10}}>Válido até {this.state.validade}</Text>
                    </ImageBackground>
                </ViewShot>
                
                <View style={{flexDirection:'row' ,justifyContent:'center', alignItems:'center'}}>
                   

                    <TouchableOpacity style={styles.botao} onPress={()=>this.captura(Share.Social.FACEBOOK)}>
                            <Icon name="facebook-square" size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={()=>this.captura(Share.Social.INSTAGRAM)}>
                        <Icon name="instagram" size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={()=>this.captura(Share.Social.EMAIL)}>
                        <Icon2 name="email" size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={()=>this.captura(Share.Social.WHATSAPP)}>
                        <Icon name="whatsapp" size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={()=>this.captura(Share.Social.INSTAGRAM)}>
                        <Icon2 name="content-copy" size={30} color="#000" />
                    </TouchableOpacity>
                    
                </View>
                
                

                   
            </View>
        );
    }
}


const styles = StyleSheet.create({
    
    containerFundo:{
        flex:1,
        color:'#fff',
    },
    shot:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    imgBack:{
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '100%'
    },
    containerLogo:{
       
        justifyContent:'center',
        alignItems:'center'
    },
    botao:{
        margin:10
    }

});


const mapStateToProps = state => ({
   
});

export default connect(mapStateToProps, {})(Compartilhar);

