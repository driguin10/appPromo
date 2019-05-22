import * as React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import {mod_codigo,mod_sucess} from '../actions/ActionPrincipal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BaseManager } from "../database/index";
import moment from "moment"



const manager = null;

class Resultado extends React.Component {

    
    constructor(props) {
        super(props);
    
        this.state = {
            id: '',
            nome:'',
            codigo:'',
            data:'',
            vencimento:'',
            desconto:'',
            descricao:'',
            valor:'',
            status:''
        };
      }
 
    async componentWillMount(){
        this.manager =  await new BaseManager();
        const { params } = this.props.navigation.state;
        if(params!=null){
            this.getTable(params.codigoPromo);
        }
    }

    calculoData = (data) =>{
        var dataAtual = moment().format("DD-MM-YYYY")
        var dataInicio = moment(dataAtual,"DD-MM-YYYY");
        var dataFim = moment(data, "DD-MM-YYYY");

        if(dataInicio>dataFim)
            return false
        else 
            return true;
    }

    getTable(codigoPromo) {
        this.manager.buscaCodigo(codigoPromo).then(val => {
            if(val.length > 0 ){
               if( this.calculoData(val[0].vencimento))
                    this.setState(val[0])
                else
                    this.setState({status:'0'})
            }
            else
                this.setState({status:'-1'})
        }).catch(err => {
                alert("Houve um erro: " + err);
        });
    }

    voltar = () => {
        this.props.navigation.goBack();
    };

 
    
    render(){

        if(this.state.id !=""){
            return(
                <ImageBackground source={require('../resources/1.jpg')} style={{width: '100%', height: '100%'}}>
                        <View>
                            <TouchableOpacity  style={styles.btVoltar} onPress={()=>this.voltar()}>
                                        <Icon name="arrow-back" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    <View style={styles.container}>

                        

                        <View style={{width:'100%' , justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={styles.textoDescricao}>R${this.state.valor}</Text>
                            <Text style={styles.textoDesconto}>{this.state.desconto}%</Text>
                            
                            <Text style={styles.textoValor}>Valor a pagar R${(this.state.valor) - (((this.state.desconto)*(this.state.valor))/100) }</Text>
                        </View>

                        <View style={{width:'100%' , justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={styles.textoDescricao}>{this.state.descricao}</Text>
                        </View>


                        <View style={{width:'100%' , justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.texto}>VALIDO ATÉ {this.state.vencimento}</Text>
                        </View>   
            


                    
                    </View>
            
                
                
                </ImageBackground>
            );
        }else{
            return(
                <ImageBackground source={require('../resources/1.jpg')} style={{width: '100%', height: '100%'}}>
                    <View>
                            <TouchableOpacity  style={styles.btVoltar} onPress={()=>this.voltar()}>
                                        <Icon name="arrow-back" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    <View style={styles.container}>
                        <View style={{width:'100%' , justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.textoDescricao}>{this.state.status == "-1"?"Não encontrado":"Cupom vencido"}</Text>
                        </View>
                    </View>
                </ImageBackground>
            );
        }
    }
}


const styles = StyleSheet.create({
    
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        
    },
    btVoltar:{
        marginTop:15,
        marginLeft:10
    },
  
    texto:{
        color:'#000',
    },
    textoDesconto:{
        color:'#000',
        fontSize:140
    },
    textoDescricao:{
        color:'#000',
        fontSize:30,
        textAlign:'center'

    },
    textoValor:{
        color:'#000',
        fontSize:30 
    }
    
   
});


const mapStateToProps = state => ({
    codigoQR: state.ReducerPrincipal.codigoQR,
    success:state.ReducerPrincipal.success,
});

export default connect(mapStateToProps, {mod_codigo ,mod_sucess })(Resultado);

